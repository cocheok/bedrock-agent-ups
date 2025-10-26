const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function setupTestEnvironment() {
  try {
    console.log('Getting CDK outputs...');
    
    // Cambiar al directorio raíz del proyecto (3 niveles arriba desde test/e2e/promptfoo/)
    const projectRoot = path.resolve(__dirname, '../../../');
    process.chdir(projectRoot);
    
    // Ahora ejecutar cdk list desde la raíz
    const stacksRaw = execSync('cdk list', { encoding: 'utf8' });
    const stacks = stacksRaw.trim().split('\n');
    
    if (stacks.length === 0) {
      throw new Error('No CDK stacks found');
    }
    
    const stackName = stacks[0]; // Usar el primer stack
    console.log(`Found stack: ${stackName}`);
    
    // Resto del código igual...
    const outputsRaw = execSync(
      `aws cloudformation describe-stacks --stack-name ${stackName} --query 'Stacks[0].Outputs' --output json`, 
      { encoding: 'utf8' }
    );
    
    const outputs = JSON.parse(outputsRaw);
    
    // Extraer valores necesarios
    let agentId, agentAliasId;
    
    outputs.forEach(output => {
      if (output.OutputKey === 'AgentId') {
        agentId = output.OutputValue;
      } else if (output.OutputKey === 'AgentAliasId') {
        agentAliasId = output.OutputValue.split('|')[1]; // Cambiar [0] por [1] para obtener el alias real
      }
    });
    
    if (!agentId || !agentAliasId) {
      throw new Error('Could not find AgentId or AgentAliasId in stack outputs');
    }
    
    console.log(`✅ Test environment setup complete!`);
    console.log(`AgentId: ${agentId}`);
    console.log(`AgentAliasId: ${agentAliasId}`);
    
    // Crear archivo .env en el directorio de promptfoo
    const envContent = `AWS_REGION=eu-west-1\nAGENT_ID=${agentId}\nAGENT_ALIAS_ID=${agentAliasId}\n`;
    const envPath = path.join(__dirname, '.env');
    fs.writeFileSync(envPath, envContent);
    
    console.log(`Environment file created at: ${envPath}`);
    
  } catch (error) {
    console.error('❌ Error setting up test environment:', error.message);
    process.exit(1);
  }
}

setupTestEnvironment();