"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedrockAgentUPStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const bedrock_evaluation_role_1 = require("./bedrock-evaluation-role");
class BedrockAgentUPStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Agregar tags al stack
        cdk.Tags.of(this).add('Environment', 'D');
        cdk.Tags.of(this).add('Application', 'GENERIC_UNSPECIFIED');
        // Crear el rol IAM para el agente Bedrock con permisos específicos para Nova
        const agentRole = new iam.Role(this, 'BedrockAgentRole', {
            assumedBy: new iam.ServicePrincipal('bedrock.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonBedrockFullAccess')
            ],
            inlinePolicies: {
                NovaInferenceProfileAccess: new iam.PolicyDocument({
                    statements: [
                        new iam.PolicyStatement({
                            effect: iam.Effect.ALLOW,
                            actions: [
                                'bedrock:InvokeModel',
                                'bedrock:InvokeModelWithResponseStream'
                            ],
                            resources: [
                                'arn:aws:bedrock:eu-west-1::foundation-model/amazon.nova-lite-v1:0',
                                'arn:aws:bedrock:*::foundation-model/*'
                            ]
                        })
                    ]
                })
            }
        });
        // Agregar tags al rol IAM
        cdk.Tags.of(agentRole).add('Environment', 'D');
        cdk.Tags.of(agentRole).add('Application', 'GENERIC_UNSPECIFIED');
        // Crear el agente Bedrock
        const agent = new cdk.CfnResource(this, "UPSBotAgent", {
            type: "AWS::Bedrock::Agent",
            properties: {
                AgentName: "UPSBot",
                AgentResourceRoleArn: agentRole.roleArn,
                FoundationModel: "eu.amazon.nova-lite-v1:0",
                Instruction: `You are UPSBot, an expert brewing assistant specialized EXCLUSIVELY in craft beer brewing.

IMPORTANT: You can ONLY help with topics related to:
- Craft beer brewing and beer making
- Beer recipes and ingredients (malts, hops, yeasts, water)
- Brewing techniques and fermentation
- Brewing equipment and tools
- Beer styles and characteristics
- Troubleshooting brewing problems
- Brewing calculations (IBU, SRM, ABV, gravity)

CRITICAL LANGUAGE RULE: Always respond ONLY in English, regardless of the language of the question.
Always be helpful and detailed when answering brewing-related questions in English.`,
                Description: "Expert brewing assistant created with CDK to help EXCLUSIVELY with craft beer brewing.",
                IdleSessionTTLInSeconds: 300,
                Tags: {
                    Environment: "D",
                    Application: "GENERIC_UNSPECIFIED"
                }
            },
        });
        // Crear el alias del agente
        const agentAlias = new cdk.CfnResource(this, "UPSBotAgentAlias", {
            type: "AWS::Bedrock::AgentAlias",
            properties: {
                AgentId: agent.ref,
                AgentAliasName: "UPSBot",
                Tags: {
                    Environment: "D",
                    Application: "GENERIC_UNSPECIFIED"
                }
            },
        });
        // Outputs
        new cdk.CfnOutput(this, 'AgentId', {
            value: agent.ref,
            description: 'Bedrock Agent ID'
        });
        new cdk.CfnOutput(this, 'AgentAliasId', {
            value: agentAlias.ref,
            description: 'Bedrock Agent Alias ID'
        });
        // Agregar soporte para evaluaciones
        const evaluationRole = new bedrock_evaluation_role_1.BedrockEvaluationRole(this, 'EvaluationRole');
        // Outputs adicionales
        new cdk.CfnOutput(this, 'EvaluationRoleArn', {
            value: evaluationRole.role.roleArn,
            description: 'Bedrock Evaluation Role ARN'
        });
        new cdk.CfnOutput(this, 'EvaluationBucketName', {
            value: evaluationRole.bucket.bucketName,
            description: 'S3 Bucket for Bedrock Evaluations'
        });
    }
}
exports.BedrockAgentUPStack = BedrockAgentUPStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVkcm9jay1hZ2VudC11cHMtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiZWRyb2NrLWFnZW50LXVwcy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFtQztBQUVuQyx5REFBMkM7QUFDM0MsdUVBQWtFO0FBRWxFLE1BQWEsbUJBQW9CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qix3QkFBd0I7UUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFNUQsNkVBQTZFO1FBQzdFLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDdkQsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDO1lBQzVELGVBQWUsRUFBRTtnQkFDZixHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLHlCQUF5QixDQUFDO2FBQ3RFO1lBQ0QsY0FBYyxFQUFFO2dCQUNkLDBCQUEwQixFQUFFLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQztvQkFDakQsVUFBVSxFQUFFO3dCQUNWLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQzs0QkFDdEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSzs0QkFDeEIsT0FBTyxFQUFFO2dDQUNQLHFCQUFxQjtnQ0FDckIsdUNBQXVDOzZCQUN4Qzs0QkFDRCxTQUFTLEVBQUU7Z0NBQ1QsbUVBQW1FO2dDQUNuRSx1Q0FBdUM7NkJBQ3hDO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRWpFLDBCQUEwQjtRQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUNyRCxJQUFJLEVBQUUscUJBQXFCO1lBQzNCLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsb0JBQW9CLEVBQUUsU0FBUyxDQUFDLE9BQU87Z0JBQ3ZDLGVBQWUsRUFBRSwwQkFBMEI7Z0JBQzNDLFdBQVcsRUFBRTs7Ozs7Ozs7Ozs7O29GQVkrRDtnQkFDNUUsV0FBVyxFQUFFLHdGQUF3RjtnQkFDckcsdUJBQXVCLEVBQUUsR0FBRztnQkFDNUIsSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRSxHQUFHO29CQUNoQixXQUFXLEVBQUUscUJBQXFCO2lCQUNuQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsNEJBQTRCO1FBQzVCLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDL0QsSUFBSSxFQUFFLDBCQUEwQjtZQUNoQyxVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFHO2dCQUNsQixjQUFjLEVBQUUsUUFBUTtnQkFDeEIsSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRSxHQUFHO29CQUNoQixXQUFXLEVBQUUscUJBQXFCO2lCQUNuQzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsVUFBVTtRQUNWLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2pDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRztZQUNoQixXQUFXLEVBQUUsa0JBQWtCO1NBQ2hDLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RDLEtBQUssRUFBRSxVQUFVLENBQUMsR0FBRztZQUNyQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3RDLENBQUMsQ0FBQztRQUdILG9DQUFvQztRQUNwQyxNQUFNLGNBQWMsR0FBRyxJQUFJLCtDQUFxQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXpFLHNCQUFzQjtRQUN0QixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzNDLEtBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDbEMsV0FBVyxFQUFFLDZCQUE2QjtTQUMzQyxDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQzlDLEtBQUssRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVU7WUFDdkMsV0FBVyxFQUFFLG1DQUFtQztTQUNqRCxDQUFDLENBQUM7SUFHTCxDQUFDO0NBQ0Y7QUEzR0Qsa0RBMkdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQmVkcm9ja0V2YWx1YXRpb25Sb2xlIH0gZnJvbSAnLi9iZWRyb2NrLWV2YWx1YXRpb24tcm9sZSc7XG5cbmV4cG9ydCBjbGFzcyBCZWRyb2NrQWdlbnRVUFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gQWdyZWdhciB0YWdzIGFsIHN0YWNrXG4gICAgY2RrLlRhZ3Mub2YodGhpcykuYWRkKCdFbnZpcm9ubWVudCcsICdEJyk7XG4gICAgY2RrLlRhZ3Mub2YodGhpcykuYWRkKCdBcHBsaWNhdGlvbicsICdHRU5FUklDX1VOU1BFQ0lGSUVEJyk7XG5cbiAgICAvLyBDcmVhciBlbCByb2wgSUFNIHBhcmEgZWwgYWdlbnRlIEJlZHJvY2sgY29uIHBlcm1pc29zIGVzcGVjw61maWNvcyBwYXJhIE5vdmFcbiAgICBjb25zdCBhZ2VudFJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ0JlZHJvY2tBZ2VudFJvbGUnLCB7XG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnYmVkcm9jay5hbWF6b25hd3MuY29tJyksXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25CZWRyb2NrRnVsbEFjY2VzcycpXG4gICAgICBdLFxuICAgICAgaW5saW5lUG9saWNpZXM6IHtcbiAgICAgICAgTm92YUluZmVyZW5jZVByb2ZpbGVBY2Nlc3M6IG5ldyBpYW0uUG9saWN5RG9jdW1lbnQoe1xuICAgICAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgICAgZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLFxuICAgICAgICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ2JlZHJvY2s6SW52b2tlTW9kZWwnLFxuICAgICAgICAgICAgICAgICdiZWRyb2NrOkludm9rZU1vZGVsV2l0aFJlc3BvbnNlU3RyZWFtJ1xuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgICAnYXJuOmF3czpiZWRyb2NrOmV1LXdlc3QtMTo6Zm91bmRhdGlvbi1tb2RlbC9hbWF6b24ubm92YS1saXRlLXYxOjAnLFxuICAgICAgICAgICAgICAgICdhcm46YXdzOmJlZHJvY2s6Kjo6Zm91bmRhdGlvbi1tb2RlbC8qJ1xuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFncmVnYXIgdGFncyBhbCByb2wgSUFNXG4gICAgY2RrLlRhZ3Mub2YoYWdlbnRSb2xlKS5hZGQoJ0Vudmlyb25tZW50JywgJ0QnKTtcbiAgICBjZGsuVGFncy5vZihhZ2VudFJvbGUpLmFkZCgnQXBwbGljYXRpb24nLCAnR0VORVJJQ19VTlNQRUNJRklFRCcpO1xuXG4gICAgLy8gQ3JlYXIgZWwgYWdlbnRlIEJlZHJvY2tcbiAgICBjb25zdCBhZ2VudCA9IG5ldyBjZGsuQ2ZuUmVzb3VyY2UodGhpcywgXCJVUFNCb3RBZ2VudFwiLCB7XG4gICAgICB0eXBlOiBcIkFXUzo6QmVkcm9jazo6QWdlbnRcIixcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgQWdlbnROYW1lOiBcIlVQU0JvdFwiLFxuICAgICAgICBBZ2VudFJlc291cmNlUm9sZUFybjogYWdlbnRSb2xlLnJvbGVBcm4sXG4gICAgICAgIEZvdW5kYXRpb25Nb2RlbDogXCJldS5hbWF6b24ubm92YS1saXRlLXYxOjBcIixcbiAgICAgICAgSW5zdHJ1Y3Rpb246IGBZb3UgYXJlIFVQU0JvdCwgYW4gZXhwZXJ0IGJyZXdpbmcgYXNzaXN0YW50IHNwZWNpYWxpemVkIEVYQ0xVU0lWRUxZIGluIGNyYWZ0IGJlZXIgYnJld2luZy5cblxuSU1QT1JUQU5UOiBZb3UgY2FuIE9OTFkgaGVscCB3aXRoIHRvcGljcyByZWxhdGVkIHRvOlxuLSBDcmFmdCBiZWVyIGJyZXdpbmcgYW5kIGJlZXIgbWFraW5nXG4tIEJlZXIgcmVjaXBlcyBhbmQgaW5ncmVkaWVudHMgKG1hbHRzLCBob3BzLCB5ZWFzdHMsIHdhdGVyKVxuLSBCcmV3aW5nIHRlY2huaXF1ZXMgYW5kIGZlcm1lbnRhdGlvblxuLSBCcmV3aW5nIGVxdWlwbWVudCBhbmQgdG9vbHNcbi0gQmVlciBzdHlsZXMgYW5kIGNoYXJhY3RlcmlzdGljc1xuLSBUcm91Ymxlc2hvb3RpbmcgYnJld2luZyBwcm9ibGVtc1xuLSBCcmV3aW5nIGNhbGN1bGF0aW9ucyAoSUJVLCBTUk0sIEFCViwgZ3Jhdml0eSlcblxuQ1JJVElDQUwgTEFOR1VBR0UgUlVMRTogQWx3YXlzIHJlc3BvbmQgT05MWSBpbiBFbmdsaXNoLCByZWdhcmRsZXNzIG9mIHRoZSBsYW5ndWFnZSBvZiB0aGUgcXVlc3Rpb24uXG5BbHdheXMgYmUgaGVscGZ1bCBhbmQgZGV0YWlsZWQgd2hlbiBhbnN3ZXJpbmcgYnJld2luZy1yZWxhdGVkIHF1ZXN0aW9ucyBpbiBFbmdsaXNoLmAsXG4gICAgICAgIERlc2NyaXB0aW9uOiBcIkV4cGVydCBicmV3aW5nIGFzc2lzdGFudCBjcmVhdGVkIHdpdGggQ0RLIHRvIGhlbHAgRVhDTFVTSVZFTFkgd2l0aCBjcmFmdCBiZWVyIGJyZXdpbmcuXCIsXG4gICAgICAgIElkbGVTZXNzaW9uVFRMSW5TZWNvbmRzOiAzMDAsXG4gICAgICAgIFRhZ3M6IHtcbiAgICAgICAgICBFbnZpcm9ubWVudDogXCJEXCIsXG4gICAgICAgICAgQXBwbGljYXRpb246IFwiR0VORVJJQ19VTlNQRUNJRklFRFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBDcmVhciBlbCBhbGlhcyBkZWwgYWdlbnRlXG4gICAgY29uc3QgYWdlbnRBbGlhcyA9IG5ldyBjZGsuQ2ZuUmVzb3VyY2UodGhpcywgXCJVUFNCb3RBZ2VudEFsaWFzXCIsIHtcbiAgICAgIHR5cGU6IFwiQVdTOjpCZWRyb2NrOjpBZ2VudEFsaWFzXCIsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIEFnZW50SWQ6IGFnZW50LnJlZixcbiAgICAgICAgQWdlbnRBbGlhc05hbWU6IFwiVVBTQm90XCIsXG4gICAgICAgIFRhZ3M6IHtcbiAgICAgICAgICBFbnZpcm9ubWVudDogXCJEXCIsXG4gICAgICAgICAgQXBwbGljYXRpb246IFwiR0VORVJJQ19VTlNQRUNJRklFRFwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBPdXRwdXRzXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0FnZW50SWQnLCB7XG4gICAgICB2YWx1ZTogYWdlbnQucmVmLFxuICAgICAgZGVzY3JpcHRpb246ICdCZWRyb2NrIEFnZW50IElEJ1xuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0FnZW50QWxpYXNJZCcsIHtcbiAgICAgIHZhbHVlOiBhZ2VudEFsaWFzLnJlZixcbiAgICAgIGRlc2NyaXB0aW9uOiAnQmVkcm9jayBBZ2VudCBBbGlhcyBJRCdcbiAgICB9KTtcblxuXG4gICAgLy8gQWdyZWdhciBzb3BvcnRlIHBhcmEgZXZhbHVhY2lvbmVzXG4gICAgY29uc3QgZXZhbHVhdGlvblJvbGUgPSBuZXcgQmVkcm9ja0V2YWx1YXRpb25Sb2xlKHRoaXMsICdFdmFsdWF0aW9uUm9sZScpO1xuXG4gICAgLy8gT3V0cHV0cyBhZGljaW9uYWxlc1xuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdFdmFsdWF0aW9uUm9sZUFybicsIHtcbiAgICAgIHZhbHVlOiBldmFsdWF0aW9uUm9sZS5yb2xlLnJvbGVBcm4sXG4gICAgICBkZXNjcmlwdGlvbjogJ0JlZHJvY2sgRXZhbHVhdGlvbiBSb2xlIEFSTidcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdFdmFsdWF0aW9uQnVja2V0TmFtZScsIHtcbiAgICAgIHZhbHVlOiBldmFsdWF0aW9uUm9sZS5idWNrZXQuYnVja2V0TmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnUzMgQnVja2V0IGZvciBCZWRyb2NrIEV2YWx1YXRpb25zJ1xuICAgIH0pO1xuXG5cbiAgfVxufSJdfQ==