To get started, set your OPENAI_API_KEY environment variable, or other required keys for the providers you selected.

Next, edit promptfooconfig.yaml.

Then run:
```
promptfoo eval
```

Afterwards, you can view the results by running `promptfoo view`


promptfoo2/
├── promptfooconfig.yaml          # Configuración principal
├── .env                          # Variables de entorno
├── context.js                    # Context dinámico/API calls
├── prompts/                      # Separar prompts por categoría
│   ├── customer-service.txt
│   ├── order-management.txt
│   └── returns.txt
├── datasets/                     # Casos de prueba organizados
│   ├── customer-inquiries.yaml
│   ├── edge-cases.yaml
│   └── performance-tests.yaml
└── custom-assertions.js          # Assertions personalizadas