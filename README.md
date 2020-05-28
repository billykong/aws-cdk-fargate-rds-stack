# Demostration on using `aws-cdk` for Load-Balanced Fargate Service with RDS Database

This is a demo project for showcasing how to use `aws-cdk` to deploy a classic 3-tier web service with load-balancers, docker containers runnning application codes, and a relational database for persistant data. 

We use AWS Elastic Load-balancer, AWS ECS Fargate for running Docker containers, and RDS Aurora for relational database.

| Tier | Componenet | AWS Service |
|------|------------|-------------|
| 1 | Load-balancer | AWS ELB |
| 2 | Application Logic | AWS ECS Fargate |
| 3 | Database | AWS RDS Aurora |

This projects uses a [simple express app with database connection](https://github.com/billykong/express-database-checker) for the application logic. You may need to replace the container image `billykong/express-database-checker` with your own Docker image if you want to reuse the template.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Install AWS-CDK
```
npm install -g aws-cdk
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


## Notes
- We should install the same version of `aws-cdk` and other `@aws-cdk/*` dependencies. It seems even minor version difference may be incompatible.
- This project uses `v1.38.0` for `@aws-cdk/*` and tested with `aws-cdk@1.38.0`.
