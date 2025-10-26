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
const cdk = __importStar(require("aws-cdk-lib"));
const assertions_1 = require("aws-cdk-lib/assertions");
const BedrockAgentCdk = __importStar(require("../../lib/bedrock-agent-ups-stack"));
describe('BedrockAgentUPStack', () => {
    test('Bedrock Agent Created', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new BedrockAgentCdk.BedrockAgentUPStack(app, 'UPSTestStack');
        // THEN
        const template = assertions_1.Template.fromStack(stack);
        // Test que el agente Bedrock se crea correctamente
        template.hasResourceProperties('AWS::Bedrock::Agent', {
            AgentName: 'UPSBot',
            FoundationModel: 'eu.amazon.nova-lite-v1:0'
        });
    });
    test('IAM Role Created with Correct Permissions', () => {
        const app = new cdk.App();
        const stack = new BedrockAgentCdk.BedrockAgentUPStack(app, 'UPSTestStack');
        const template = assertions_1.Template.fromStack(stack);
        // Test que el rol IAM se crea con los permisos correctos
        template.hasResourceProperties('AWS::IAM::Role', {
            AssumeRolePolicyDocument: {
                Statement: [{
                        Effect: 'Allow',
                        Principal: {
                            Service: 'bedrock.amazonaws.com'
                        },
                        Action: 'sts:AssumeRole'
                    }]
            }
        });
    });
    test('Agent Alias Created', () => {
        const app = new cdk.App();
        const stack = new BedrockAgentCdk.BedrockAgentUPStack(app, 'UPSTestStack');
        const template = assertions_1.Template.fromStack(stack);
        // Test que el alias del agente se crea
        template.hasResourceProperties('AWS::Bedrock::AgentAlias', {
            AgentAliasName: 'brewBot'
        });
    });
    test('Stack has correct tags', () => {
        const app = new cdk.App();
        const stack = new BedrockAgentCdk.BedrockAgentUPStack(app, 'UPSTestStack');
        const template = assertions_1.Template.fromStack(stack);
        // Verificar que los recursos tienen los tags correctos
        template.hasResourceProperties('AWS::Bedrock::Agent', {
            Tags: {
                Environment: 'D',
                Application: 'GENERIC_UNSPECIFIED'
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVkcm9jay1hZ2VudC11cHMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJlZHJvY2stYWdlbnQtdXBzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFtQztBQUNuQyx1REFBa0Q7QUFDbEQsbUZBQXFFO0FBRXJFLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFDbkMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsRUFBRTtRQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixPQUFPO1FBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxlQUFlLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzNFLE9BQU87UUFDUCxNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxtREFBbUQ7UUFDbkQsUUFBUSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixFQUFFO1lBQ3BELFNBQVMsRUFBRSxRQUFRO1lBQ25CLGVBQWUsRUFBRSwwQkFBMEI7U0FDNUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsMkNBQTJDLEVBQUUsR0FBRyxFQUFFO1FBQ3JELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksZUFBZSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMzRSxNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyx5REFBeUQ7UUFDekQsUUFBUSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixFQUFFO1lBQy9DLHdCQUF3QixFQUFFO2dCQUN4QixTQUFTLEVBQUUsQ0FBQzt3QkFDVixNQUFNLEVBQUUsT0FBTzt3QkFDZixTQUFTLEVBQUU7NEJBQ1QsT0FBTyxFQUFFLHVCQUF1Qjt5QkFDakM7d0JBQ0QsTUFBTSxFQUFFLGdCQUFnQjtxQkFDekIsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO1FBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksZUFBZSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMzRSxNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyx1Q0FBdUM7UUFDdkMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLDBCQUEwQixFQUFFO1lBQ3pELGNBQWMsRUFBRSxTQUFTO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0UsTUFBTSxRQUFRLEdBQUcscUJBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsdURBQXVEO1FBQ3ZELFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsRUFBRTtZQUNwRCxJQUFJLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLFdBQVcsRUFBRSxxQkFBcUI7YUFDbkM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnYXdzLWNkay1saWIvYXNzZXJ0aW9ucyc7XG5pbXBvcnQgKiBhcyBCZWRyb2NrQWdlbnRDZGsgZnJvbSAnLi4vLi4vbGliL2JlZHJvY2stYWdlbnQtdXBzLXN0YWNrJztcblxuZGVzY3JpYmUoJ0JlZHJvY2tBZ2VudFVQU3RhY2snLCAoKSA9PiB7XG4gIHRlc3QoJ0JlZHJvY2sgQWdlbnQgQ3JlYXRlZCcsICgpID0+IHtcbiAgICBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuICAgIC8vIFdIRU5cbiAgICBjb25zdCBzdGFjayA9IG5ldyBCZWRyb2NrQWdlbnRDZGsuQmVkcm9ja0FnZW50VVBTdGFjayhhcHAsICdVUFNUZXN0U3RhY2snKTtcbiAgICAvLyBUSEVOXG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuXG4gICAgLy8gVGVzdCBxdWUgZWwgYWdlbnRlIEJlZHJvY2sgc2UgY3JlYSBjb3JyZWN0YW1lbnRlXG4gICAgdGVtcGxhdGUuaGFzUmVzb3VyY2VQcm9wZXJ0aWVzKCdBV1M6OkJlZHJvY2s6OkFnZW50Jywge1xuICAgICAgQWdlbnROYW1lOiAnVVBTQm90JyxcbiAgICAgIEZvdW5kYXRpb25Nb2RlbDogJ2V1LmFtYXpvbi5ub3ZhLWxpdGUtdjE6MCdcbiAgICB9KTtcbiAgfSk7XG5cbiAgdGVzdCgnSUFNIFJvbGUgQ3JlYXRlZCB3aXRoIENvcnJlY3QgUGVybWlzc2lvbnMnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbiAgICBjb25zdCBzdGFjayA9IG5ldyBCZWRyb2NrQWdlbnRDZGsuQmVkcm9ja0FnZW50VVBTdGFjayhhcHAsICdVUFNUZXN0U3RhY2snKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFRlbXBsYXRlLmZyb21TdGFjayhzdGFjayk7XG5cbiAgICAvLyBUZXN0IHF1ZSBlbCByb2wgSUFNIHNlIGNyZWEgY29uIGxvcyBwZXJtaXNvcyBjb3JyZWN0b3NcbiAgICB0ZW1wbGF0ZS5oYXNSZXNvdXJjZVByb3BlcnRpZXMoJ0FXUzo6SUFNOjpSb2xlJywge1xuICAgICAgQXNzdW1lUm9sZVBvbGljeURvY3VtZW50OiB7XG4gICAgICAgIFN0YXRlbWVudDogW3tcbiAgICAgICAgICBFZmZlY3Q6ICdBbGxvdycsXG4gICAgICAgICAgUHJpbmNpcGFsOiB7XG4gICAgICAgICAgICBTZXJ2aWNlOiAnYmVkcm9jay5hbWF6b25hd3MuY29tJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgQWN0aW9uOiAnc3RzOkFzc3VtZVJvbGUnXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHRlc3QoJ0FnZW50IEFsaWFzIENyZWF0ZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbiAgICBjb25zdCBzdGFjayA9IG5ldyBCZWRyb2NrQWdlbnRDZGsuQmVkcm9ja0FnZW50VVBTdGFjayhhcHAsICdVUFNUZXN0U3RhY2snKTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFRlbXBsYXRlLmZyb21TdGFjayhzdGFjayk7XG5cbiAgICAvLyBUZXN0IHF1ZSBlbCBhbGlhcyBkZWwgYWdlbnRlIHNlIGNyZWFcbiAgICB0ZW1wbGF0ZS5oYXNSZXNvdXJjZVByb3BlcnRpZXMoJ0FXUzo6QmVkcm9jazo6QWdlbnRBbGlhcycsIHtcbiAgICAgIEFnZW50QWxpYXNOYW1lOiAnYnJld0JvdCdcbiAgICB9KTtcbiAgfSk7XG5cbiAgdGVzdCgnU3RhY2sgaGFzIGNvcnJlY3QgdGFncycsICgpID0+IHtcbiAgICBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuICAgIGNvbnN0IHN0YWNrID0gbmV3IEJlZHJvY2tBZ2VudENkay5CZWRyb2NrQWdlbnRVUFN0YWNrKGFwcCwgJ1VQU1Rlc3RTdGFjaycpO1xuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGUuZnJvbVN0YWNrKHN0YWNrKTtcblxuICAgIC8vIFZlcmlmaWNhciBxdWUgbG9zIHJlY3Vyc29zIHRpZW5lbiBsb3MgdGFncyBjb3JyZWN0b3NcbiAgICB0ZW1wbGF0ZS5oYXNSZXNvdXJjZVByb3BlcnRpZXMoJ0FXUzo6QmVkcm9jazo6QWdlbnQnLCB7XG4gICAgICBUYWdzOiB7XG4gICAgICAgIEVudmlyb25tZW50OiAnRCcsXG4gICAgICAgIEFwcGxpY2F0aW9uOiAnR0VORVJJQ19VTlNQRUNJRklFRCdcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59KTsiXX0=