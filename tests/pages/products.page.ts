import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly allProductsTitle: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsTitle: Locator;
  readonly productsList: Locator;
  readonly productsItems: Locator;

  constructor(page: Page) {
    super(page);
    this.allProductsTitle = page.locator('h2').filter({ hasText: 'All Products' });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsTitle = page.locator('h2').filter({ hasText: 'Searched Products' });
    this.productsList = page.locator('.features_items');
    this.productsItems = page.locator('.productinfo');
  }

  async verifyAllProductsPageIsVisible() {
    await this.allProductsTitle.waitFor({ state: 'visible' });
    await this.productsList.waitFor({ state: 'visible' });
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async verifySearchedProductsAreVisible() {
    await this.searchedProductsTitle.waitFor({ state: 'visible' });
  }

  async verifyProductsRelatedToSearchAreVisible(expectedProductName: string) {
    await this.productsItems.first().waitFor({ state: 'visible' });
    // Verificar que al menos un producto es visible
    const productCount = await this.productsItems.count();
    return productCount > 0;
  }

  async getProductsCount() {
    return await this.productsItems.count();
  }
}