import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
export declare class BedrockEvaluationRole extends Construct {
    readonly role: iam.Role;
    readonly bucket: s3.Bucket;
    constructor(scope: Construct, id: string);
}
