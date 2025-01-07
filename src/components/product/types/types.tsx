// src/types/product.ts
// Define Types for data
export interface Image {
  url: string;
  is_main?: boolean;
  alt_text?: string;
}

export interface Product {
  id: number;
  title_tm: string;
  title_ru: string;
  title_en: string;
  desc_tm: string;
  desc_ru: string;
  desc_en: string;
  price: number;
  old_price?: number;
  discount_percentage?: number;
  discounted_price?: number;
  stock: number;
  is_active: boolean;
  weight: number;
  width: number | null;
  height: number | null;
  depth: number | null;
  images: Image[];
  size?: string;
  color?: string;
  tags?: string;
  views?: number;
  rating?: number;
  brand_id: number;
}

export interface ProductResponse {
  data: Product[];
}
