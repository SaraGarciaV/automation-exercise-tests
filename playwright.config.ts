import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directorio donde están las pruebas
  testDir: './tests',
  
  // Configuración global de timeouts
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  
  // Configuración para reportes
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  
  // Configuración para screenshots en fallas
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: 'https://automationexercise.com'
  },

  // Configuración de proyectos (navegadores)
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 }
      },
    },
    // Opcional: Firefox (puedes agregarlo si quieres 3 navegadores)
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     viewport: { width: 1280, height: 720 }
    //   },
    // },
  ],

  // Configuración para desarrollo local
  webServer: undefined,
});