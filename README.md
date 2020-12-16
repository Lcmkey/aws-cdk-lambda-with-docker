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


# How to Deploy

1. entry to `src/lambda/`

2. build to js file

```properties
$ npm run build
```

3. List the Stacks

```properties
$ cdk list
```

4. Deploy

```properties
$ cdk deploy Lamda-With-Docker-Dev-LambdaStack
```

5. Destroy

```properties
$ cdk destroy Lamda-With-Docker-Dev-LambdaStack
```