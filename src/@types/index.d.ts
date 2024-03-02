export interface Product {
  id: number;
  title: string;
  price: number;
  slug: string;
  description: string;
  composition: string;
  entretien: string;
  colour: string[];
  collection: string;
  likes: number;
  images: string[];
  "size-range": number[];
  "size-available": number[];
}

export interface ProductList {
    products: Product[]
}

export interface ProductCardProps {
  title: string;
  price: number;
  slug: string;
  likes: number;
  images: string[];
  "size-range": number[];
  "size-available": number[];
}