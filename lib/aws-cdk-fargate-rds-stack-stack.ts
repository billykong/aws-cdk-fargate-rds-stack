import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');
import ecs_patterns = require('@aws-cdk/aws-ecs-patterns');
import rds = require('@aws-cdk/aws-rds');
import secretsManager = require('@aws-cdk/aws-secretsmanager');
import ssm = require('@aws-cdk/aws-ssm');
import * as cdk from '@aws-cdk/core';

export class AwsCdkFargateRdsStackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const serviceName = 'movies-tmp';
    const databaseName = 'my_database'
    const stage = 'dev';
    const databaseUsername = 'billy'

    // NOTE: Limit AZs to avoid reaching resource quotas
    const vpc = new ec2.Vpc(this, 'TmpVpc', { maxAzs: 2 });

    const databaseCredentialsSecret = new secretsManager.Secret(this, 'DBCredentialsSecret', {
      secretName: `${serviceName}-${stage}-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: databaseUsername,
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password'
      }
    });

    new ssm.StringParameter(this, 'DBCredentialsArn', {
      parameterName: `${serviceName}-${stage}-credentials-arn`,
      stringValue: databaseCredentialsSecret.secretArn,
    });

    const isDev = false;
    const dbConfig = {
      dbClusterIdentifier: `main-${serviceName}-${stage}-cluster`,
      engineMode: 'serverless',
      engine: 'aurora-postgresql',
      engineVersion: '10.7',
      enableHttpEndpoint: true,
      databaseName: databaseName,
      masterUsername: databaseCredentialsSecret.secretValueFromJson('username').toString(),
      masterUserPassword: databaseCredentialsSecret.secretValueFromJson('password').toString(),
      backupRetentionPeriod: isDev ? 1 : 30,
      finalSnapshotIdentifier: `main-${serviceName}-${stage}-snapshot`,
      scalingConfiguration: {
        autoPause: true,
        maxCapacity: isDev ? 4 : 384,
        minCapacity: 2,
        secondsUntilAutoPause: isDev ? 3600 : 10800,
      }
    };

    const rdsCluster = new rds.CfnDBCluster(this, 'DBCluster', dbConfig);

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "FargateService", {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
        environment: {
          DATABASE_HOST: rdsCluster.attrEndpointAddress,
          DATABASE_NAME: databaseName,
          DATABASE_USERNAME: databaseCredentialsSecret.secretValueFromJson('username').toString(),
          DATABASE_PASSWORD: databaseCredentialsSecret.secretValueFromJson('password').toString(),
        } 
      },
    });
  }
}
