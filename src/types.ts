/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  engName: string;
  price: number;
  category: 'classic' | 'premium' | 'limited' | 'drink' | 'gift';
  description: string;
  rating: number;
  reviewsCount: number;
  image: string;
  isBest: boolean;
  stock: number;
  toppingsAllowed?: boolean;
}

export interface CustomCookie {
  id: string; // Unique ID for this custom creation in cart
  baseId: string;
  baseName: string;
  toppings: string[];
  packaging: string;
  giftMessage: string;
  price: number;
}

export interface CartItem {
  id: string; // Cart line-item identifier
  product?: Product;
  customCookie?: CustomCookie;
  quantity: number;
  isGift: boolean;
  recipientName?: string;
  giftMessage?: string;
}

export interface Order {
  id: string;
  depositorName: string;
  bankName: string;
  amount: number;
  items: CartItem[];
  status: '입금대기' | '입금확인' | '배송준비' | '배송중' | '배송완료';
  createdAt: string;
  isGift: boolean;
  recipientName?: string;
  giftMessage?: string;
}

export interface Review {
  id: string;
  author: string;
  authorImage?: string;
  rating: number;
  text: string;
  image?: string;
  likes: number;
  isLikedByMe?: boolean;
  date: string;
  productName: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'notice' | 'event';
  image?: string;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  discountType: 'percent' | 'amount';
  discountValue: number;
  minOrderAmount: number;
  description: string;
  isUsed: boolean;
}

export interface UserProfile {
  email: string;
  nickname: string;
  profileImage: string;
  points: number;
  coupons: Coupon[];
  favorites: string[]; // Product IDs
}

export type ActiveTab = 'HOME' | 'COOKIE' | 'GIFT SET' | 'DRINK' | 'STORY' | 'REVIEW' | 'CONTACT' | 'LOGIN' | 'CART' | 'ADMIN';

export type SeasonalTheme = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
