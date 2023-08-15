import { Controller, Get } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('profile')
  async getProfile() {
    return this.shopService.getProfile();
  }

  @Get('products')
  async getProducts() {
    return this.shopService.getProducts();
  }

  @Get('promotions')
  async getPromotions() {
    return this.shopService.getPromotions();
  }

  // ... autres méthodes du contrôleur
}
