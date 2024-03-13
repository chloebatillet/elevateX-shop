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

interface CartState {
  content: (CartItem | null)[];
}

interface CartItem {
  model: string;
  size: number;
  price: number;
}

interface ContactDetails {
  clientFirstname: string;
  clientLastname: string;
  clientAddress: string;
  clientPostcode: number;
  clientCity: string;
  clientCountry: string;
  clientTelephone?: number;
  clientEmail: string;
}

interface DeliveryDetails {
  deliveryName?: string;
  deliveryAddress: string;
  deliveryPostalCode: number;
  deliveryCity: string;
  deliveryCountry: string;
}