type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [string];
  tags: [string];
  price: number;
  cost: number;
  sizes: [string];
  colors: [string];
  quantity:number;
  datasheet:string;
  createdAt: string;
  updatedAt: string;
   // Optional fields for enhanced product card features
  comparePrice?: number;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  createdAt: string;
  updatedAt: string;
};

type OrderType = {
  _id: string;
  customerClerkId: string;
  email: string;
  name: string;
  products: OrderItemType[];
  billingDetails?: {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    townCity?: string;
    phoneNumber?: string;
    orderNotes?: string;
  };
  shippingDetails?: {
    shippingMethod?: string;
    shippingCost?: number;
  };
  paymentDetails?: {
    mpesaName?: string;
    mobileNumber?: string;
    transactionCode?: string;
  };
  totalAmount: number;
  createdAt: Date;
}

type OrderItemType = {
  product: {
    _id: string;
    title: string;
    price: number;
  };
  color?: string;
  size?: string;
  quantity: number;
}
export interface TherapyType {
  _id: string;
  title: string;
  description: string;
  image: string[];
  createdAt?: string;
  updatedAt?: string;
}

// You can also add other utility types
export interface TherapyFormData {
  title: string;
  description: string;
  image?: string[];
}

export interface TherapyApiResponse {
  success: boolean;
  data?: TherapyType | TherapyType[];
  error?: string;
}