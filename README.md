# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Questions
- [ ] How to use aurora serverless?
- [ ] How to set environement variable in fargate? (for database access)
- [ ] How to set auto-scaling for ecs?
- [ ] How to set public subnet for load balancer, and put the fargate and database into separate private subnets?
- [ ] If we rotate the database secret with secret manager, will the new containers have updated secrets in their environment?


## Notes
- We should install the same version of `aws-cdk` and other `@aws-cdk/*` dependencies. It seems even minor version difference may be incompatible.
- We may need to create database cluster default parameter group yourself
- configure aws region to deploy to in the bin `.ts` file, or the default aws-cli region will be used.
- DBClusterParameterGroup not found: default.aurora5.6
- What is best security practice in passing database connection credentials to containers?

## References
- https://dev.to/cjjenkinson/how-to-create-an-aurora-serverless-rds-instance-on-aws-with-cdk-5bb0
- https://github.com/bind-almir/cdk-aurora-serverless/blob/master/lib/cdk-aurora-serverless-stack.ts
