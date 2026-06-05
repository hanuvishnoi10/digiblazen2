export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  priceInr?: number;
  category: string;
  thumbnail: string;
  features: string[];
  salesCount: number;
  rating: number;
  fileSize?: string;
  format?: string;
  demoUrl?: string;
  websiteUrl?: string;
  validity?: string;
  warranty?: string;
  outOfStock?: boolean;
  reviews?: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'pending' | 'resolved';
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: {
    productId: string;
    productTitle: string;
    price: number;
  }[];
  totalPrice: number;
  date: string;
  paymentMethod: string;
  status: 'completed' | 'pending';
}

export interface AnalyticsStats {
  totalRevenue: number;
  totalOrders: number;
  visitorCount: number;
  conversionRate: string;
}
