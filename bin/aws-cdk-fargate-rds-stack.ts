#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkFargateRdsStackStack } from '../lib/aws-cdk-fargate-rds-stack-stack';

const envOregon = { account: '978397510092', region: 'us-west-2' };

const app = new cdk.App();
new AwsCdkFargateRdsStackStack(app, 'AwsCdkFargateRdsStackStack', { env: envOregon });
