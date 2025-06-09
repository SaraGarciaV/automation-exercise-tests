import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test.describe('Authentication Suite - Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    // Navegar a la página de inicio antes de cada prueba
    await loginPage.navigateToHomePage();
    await loginPage.verifyHomePageIsVisible();
  });

  test('TC002-001: Login exitoso con credenciales válidas', async () => {
    // Test Case 2: Login User with correct email and password
    
    // Paso 4: Click en 'Signup / Login' button
    await loginPage.clickSignupLogin();
    
    // Paso 5: Verificar que 'Login to your account' es visible
    await loginPage.verifyLoginPageIsVisible();
    
    // Paso 6: Ingresar email y password correctos
    await loginPage.loginWithCredentials('pruebassprint2@gmail.com', 'password123');
    
    // Paso 7: Click en 'login' button y Paso 8: Verificar que 'Logged in as username' es visible
    await loginPage.verifySuccessfulLogin();
    

  });

  test('TC002-002: Login fallido con credenciales inválidas', async () => {
    // Test Case 3: Login User with incorrect email and password
    
    // Paso 4: Click en 'Signup / Login' button
    await loginPage.clickSignupLogin();
    
    // Paso 5: Verificar que 'Login to your account' es visible
    await loginPage.verifyLoginPageIsVisible();
    
    // Paso 6: Ingresar email y password incorrectos
    await loginPage.loginWithCredentials('invalid@email.com', 'wrongpassword');
    
    // Paso 7: Click en 'login' button y Paso 8: Verificar error 'Your email or password is incorrect!'
    await loginPage.verifyLoginError();
  });

  test('TC002-003: Login fallido con campos vacíos', async () => {
    // Caso adicional: Probar validación de campos vacíos
    
    await loginPage.clickSignupLogin();
    await loginPage.verifyLoginPageIsVisible();
    
    // Intentar login sin llenar campos
    await loginPage.loginWithCredentials('', '');
    
    // El formulario debería permanecer en la página de login
    await loginPage.verifyLoginPageIsVisible();
  });
});