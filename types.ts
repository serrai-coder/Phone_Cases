
export interface City {
  id: number;
  name: string;
  name_ar: string;
}

export interface Wilaya {
  id: number;
  code: string;
  name: string;
  name_ar: string;
  deliveryPriceHome: number | null | string;
  deliveryPriceStopDesk: number | null | string;
  cities: City[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  features: string[];
}

export interface OrderDetails {
  firstName: string;
  lastName: string;
  phone: string;
  phoneModel: string;
  wilaya: string;
  commune: string;
  deliveryOption: 'home' | 'stopDesk';
  productName: string;
  productPrice: number;
  deliveryPrice: number;
  totalPrice: number;
}

export type Page = 'home' | 'product' | 'thankyou' | 'about' | 'contact';