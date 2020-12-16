import { App, Stack, StackProps } from "@aws-cdk/core";
import { DockerImageFunction, DockerImageCode } from "@aws-cdk/aws-lambda";
import * as path from "path";

interface LambdaStackStackProps extends StackProps {
  readonly prefix: string;
  readonly stage: string;
}

export class LambdaStack extends Stack {
  constructor(scope: App, id: string, props: LambdaStackStackProps) {
    super(scope, id, props);

    /**
     * Get var from props
     */
    const { prefix, stage } = props;

    /**
     * Configure path to Dockerfile
     */
    const dockerfile = path.join(__dirname, "./../src");

    /**
     * Create AWS Lambda function and push image to ECR
     */
    new DockerImageFunction(this, `${prefix}-${stage}-Handler`, {
      functionName: `${prefix}-${stage}-Handler`,
      memorySize: 256,
      code: DockerImageCode.fromImageAsset(dockerfile),
    });
  }
}
