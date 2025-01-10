import Api from "@/lib/api";
import type { TShop } from "@/types/types";

const BASE_URL = `/shop`;

export class ShopApi {
  static async getAll(): Promise<{ data: TShop[]; statusCode: string }> {
    const res = await Api.get(BASE_URL);
    const data = await res.json();
    return data;
  }

  static async addShop(data: Partial<TShop>) {
    const res = Api.post(BASE_URL, data);
    return res;
  }

  static async editShop(data: Partial<TShop>) {
    const res = Api.post(BASE_URL, data);
    return res;
  }

  static async removeShop(id: number) {
    const res = Api.post(BASE_URL, id);
    return res;
  }
}
