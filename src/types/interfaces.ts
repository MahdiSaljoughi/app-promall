export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  address: string;
  is_verified: boolean;
  mobile: string;
  avatar: string;
  otp_code: string;
}

export interface IShop {
  id: string;
  name: string;
  avatar: string;
  detail: [];
  shopCategories: any;
}

export interface IProduct {
  id: string;
  name: string;
  images: string[];
  price: number;
  availibility: string;
}

export interface ICategory {
  image: string;
  title: string;
}
