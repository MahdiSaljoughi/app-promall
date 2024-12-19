import Api from "@/lib/api";
import { IShop } from "@/types/interfaces";

const BASE_URL = `/shop`;

export class ShopApi {
  static async getAll(): Promise<{ data: IShop[]; statusCode: string }> {
    const res = await Api.get(`${BASE_URL}s`);
    const data = await res.json();
    return data;
  }

  static async addShop(data: Partial<IShop>) {
    const res = Api.post(BASE_URL, data);
    return res;
  }

  static async editShop(data: Partial<IShop>) {
    const res = Api.post(BASE_URL, data);
    return res;
  }

  static async removeShop(id: number) {
    const res = Api.post(BASE_URL, id);
    return res;
  }
}
