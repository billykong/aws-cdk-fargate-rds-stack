#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkFargateRdsStackStack } from '../lib/aws-cdk-fargate-rds-stack-stack';

const app = new cdk.App();
new AwsCdkFargateRdsStackStack(app, 'AwsCdkFargateRdsStackStack');
