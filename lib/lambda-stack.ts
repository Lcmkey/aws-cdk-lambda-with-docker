import { App, Stack, StackProps, CfnOutput } from "@aws-cdk/core";
import { DockerImageFunction, DockerImageCode, Function } from "@aws-cdk/aws-lambda";
import * as path from "path";
import * as fs from 'fs'
import * as camelcase from 'camelcase';

interface LambdaStackStackProps extends StackProps {
  readonly prefix: string;
  readonly stage: string;
}

export class LambdaStack extends Stack {
  public functionList: { [key: string]: Function } = {}

  constructor(scope: App, id: string, props: LambdaStackStackProps) {
    super(scope, id, props);

    /**
     * Get var from props
     */
    const { prefix, stage } = props;

    /**
     * Configure path to Dockerfile
     */
    // const dockerfile = path.join(__dirname, "./../src/lambda");

    /**
     * Signle Lambda
     * Create AWS Lambda function and push image to ECR
     */
    // new DockerImageFunction(this, `${prefix}-${stage}-Handler`, {
    //   functionName: `${prefix}-${stage}-Handler`,
    //   memorySize: 256,
    //   code: DockerImageCode.fromImageAsset(dockerfile),
    // });

    /**
     * Define Lmabda handler sroure code path
     */
    const handlersPath = path.join(__dirname, "./../src/lambda");
    const nodes = fs.readdirSync(handlersPath);

    /**
     * Create Mutiple Lambda
     */
    nodes.filter((node) => fs.statSync(`${handlersPath}/${node}`).isDirectory()).map((name) => {
      const id = camelcase(name, { pascalCase: true });

      this.functionList[id] = new DockerImageFunction(this, `${prefix}-${stage}-Handler-${id}`, {
        functionName: `${prefix}-${stage}-Handler-${id}`,
        memorySize: 256,
        code: DockerImageCode.fromImageAsset(`${handlersPath}/${name}`),
      });

      new CfnOutput(this, `$${prefix}-${stage}-Handler-${id}-Arn`, {
        value: this.functionList[id].functionArn
      })
    });
  }
}
