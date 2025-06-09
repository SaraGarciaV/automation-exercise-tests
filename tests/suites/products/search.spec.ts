import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/products.page';

test.describe('Products Suite - Search Functionality', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    // Navegar a la página de inicio antes de cada prueba
    await productsPage.navigateToHomePage();
    await productsPage.verifyHomePageIsVisible();
  });

  test('TC009-001: Búsqueda exitosa de producto existente', async () => {
    // Test Case 9: Search Product (exitoso)
    
    // Paso 4: Click en 'Products' button
    await productsPage.clickProducts();
    
    // Paso 5: Verificar que el usuario navega a la página ALL PRODUCTS exitosamente
    await productsPage.verifyAllProductsPageIsVisible();
    
    // Paso 6: Ingresar nombre de producto en el campo de búsqueda y click en botón search
    await productsPage.searchForProduct('dress');
    
    // Paso 7: Verificar que 'SEARCHED PRODUCTS' es visible
    await productsPage.verifySearchedProductsAreVisible();
    
    // Paso 8: Verificar que todos los productos relacionados a la búsqueda son visibles
    const hasProducts = await productsPage.verifyProductsRelatedToSearchAreVisible('dress');
    expect(hasProducts).toBeTruthy();
    
    // Verificación adicional: Contar productos encontrados
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
  });

  test('TC009-002: Búsqueda sin resultados', async () => {
    // Test Case 9: Search Product (sin resultados)
    
    await productsPage.clickProducts();
    await productsPage.verifyAllProductsPageIsVisible();
    
    // Buscar un producto que no existe
    await productsPage.searchForProduct('nonexistentproduct12345');
    
    // Verificar que aparece el título de búsqueda
    await productsPage.verifySearchedProductsAreVisible();
    
    // Verificar que no hay productos (o mensaje de "no productos encontrados")
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBe(0);
  });

  test('TC009-003: Búsqueda con campo vacío', async () => {
    // Caso adicional: Probar búsqueda con campo vacío
    
    await productsPage.clickProducts();
    await productsPage.verifyAllProductsPageIsVisible();
    
    // Buscar con campo vacío
    await productsPage.searchForProduct('');
    
    // Debería mostrar todos los productos o un mensaje específico
    await productsPage.verifySearchedProductsAreVisible();
  });

  test('TC009-004: Búsqueda de producto específico (fallo intencional)', async () => {
    // Este test está diseñado para fallar y demostrar el reporte de errores
    
    await productsPage.clickProducts();
    await productsPage.verifyAllProductsPageIsVisible();
    
    await productsPage.searchForProduct('top');
    await productsPage.verifySearchedProductsAreVisible();
    
    // Fallo intencional: esperamos 0 productos cuando sabemos que habrá algunos
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBe(0); 
  });
});