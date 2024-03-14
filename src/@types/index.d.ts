export interface Product {
  id: number;
  title: string;
  price: number;
  slug: string;
  description: string;
  composition: string;
  entretien: string;
  colour: string[];
  collection: string[];
  likes: number;
  images: string[];
  releaseDate: string;
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

export interface CartState {
  content: (CartItem | null)[];
}

export interface CartItem {
  model: string;
  size: number;
  price: number;
}

export interface ContactDetails {
  firstname: string;
  name: string;
  address: string;
  postalCode: number;
  city: string;
  country: string;
  telephone?: number;
  email: string;
}

export interface DeliveryDetails {
  name?: string;
  address: string;
  postalCode: number;
  city: string;
  country: string;
  telephone?: number;
  email: string;
}