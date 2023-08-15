import { Injectable } from '@nestjs/common';

const profile = {
  firstName: 'Rahma',
  lastName: 'Farhat',
  limit: 850.0,
};

const products = [
  { id: 1, title: 'iPad 4 Mini', price: 500.01, inventory: 2, shipping: 15.0, image: '@/assets/image.jpg' },
  // ... autres produits
];

const promotions = [
  { id: 1, title: '10 % DE RÉDUCTION' },
  { id: 2, title: 'Rabais de 500,00 NOK' },
  // ... autres promotions
];

@Injectable()
export class ShopService {
  getProfile(): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(profile), 500));
  }

  getProducts(): Promise<any[]> {
    return new Promise((resolve) => setTimeout(() => resolve(products), 500));
  }

  getPromotions(): Promise<any[]> {
    return new Promise((resolve) => setTimeout(() => resolve(promotions), 500));
  }

  buyProducts(productsToBuy: any[]): Promise<any[]> {
    return new Promise((resolve) => setTimeout(() => resolve(productsToBuy), 500));
  }
}
