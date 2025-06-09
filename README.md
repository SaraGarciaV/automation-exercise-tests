# Automation Exercise Tests

Proyecto de automatización de pruebas E2E para automationexercise.com usando Playwright con TypeScript.

## Casos de Prueba Implementados

### Test Case 2: Login User with correct email and password
- TC002-001: Login exitoso con credenciales válidas
- TC002-002: Login fallido con credenciales inválidas  
- TC002-003: Login fallido con campos vacíos

### Test Case 9: Search Product
- TC009-001: Búsqueda exitosa de producto existente
- TC009-002: Búsqueda sin resultados
- TC009-003: Búsqueda con campo vacío
- TC009-004: Búsqueda con fallo intencional

## Estructura del Proyecto
tests/
├── pages/                  # Page Object Model
│   ├── base.page.ts
│   ├── login.page.ts
│   └── products.page.ts
└── suites/                 # Test suites organizadas
├── authentication/
│   └── login.spec.ts
└── products/
└── search.spec.ts
## Configuración

**Navegadores configurados:**
- Chromium
- WebKit

**Reportes:**
- Screenshots automáticos en caso de falla
- Reporte HTML

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Instalar navegadores
npx playwright install

# Ejecutar todas las pruebas
npx playwright test

# Ejecutar en navegador específico
npx playwright test --project=chromium
npx playwright test --project=webkit

# Ver reporte
npx playwright show-report
