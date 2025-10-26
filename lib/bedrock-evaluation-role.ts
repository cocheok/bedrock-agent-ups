// lib/bedrock-evaluation-role.ts
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class BedrockEvaluationRole extends Construct {
  public readonly role: iam.Role;
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Crear bucket para datasets y resultados
    this.bucket = new s3.Bucket(this, 'BedrockEvaluationBucket', {
      bucketName: `bedrock-eval-ups-${cdk.Aws.ACCOUNT_ID}-${cdk.Aws.REGION}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Crear rol para Bedrock Evaluations
    this.role = new iam.Role(this, 'BedrockEvaluationRole', {
      assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com'),
      inlinePolicies: {
        BedrockEvaluationPolicy: new iam.PolicyDocument({
          statements: [
            // Permisos para el bucket S3
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                's3:GetObject',
                's3:PutObject',
                's3:DeleteObject',
                's3:ListBucket'
              ],
              resources: [
                this.bucket.bucketArn,
                `${this.bucket.bucketArn}/*`
              ]
            }),
            // Permisos para Bedrock
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'bedrock:InvokeModel',
                'bedrock:InvokeAgent',
                'bedrock:GetFoundationModel',
                'bedrock:ListFoundationModels'
              ],
              resources: ['*']
            }),
            // Permisos para logs
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents'
              ],
              resources: ['*']
            })
          ]
        })
      }
    });

    // Tags
    cdk.Tags.of(this.role).add('Environment', 'D');
    cdk.Tags.of(this.role).add('Application', 'GENERIC_UNSPECIFIED');
    cdk.Tags.of(this.bucket).add('Environment', 'D');
    cdk.Tags.of(this.bucket).add('Application', 'GENERIC_UNSPECIFIED');
  }
}