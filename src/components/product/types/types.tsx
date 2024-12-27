export interface FileProps extends File {
  preview?: string;
  is_main?: boolean; // To indicate the main image
  alt_text?: string; // To add alternative text for the image
  url?: any;
}

export interface ImageDataI {
  url: string; // URL of the image
  is_main?: boolean; // Whether this image is the main image
  alt_text?: string; // Alternative text for the image
}

export interface FormDataI {
  title_tm: string;
  title_ru: string;
  title_en: string;
  desc_tm?: string;
  desc_ru?: string;
  desc_en?: string;
  price: number;
  old_price?: number;
  discount_percentage?: number;
  discounted_price?: number;
  stock: number;
  sku?: string;
  is_active?: boolean;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  size?: string;
  color?: string;
  tags?: string[];
  video_url?: string;
  views?: number;
  rating?: number;
  brand_id?: number;
  categories?: number[];
  images?: ImageDataI[]; // Array of image objects
}
