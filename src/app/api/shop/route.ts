import { NextResponse } from "next/server";
import type { TShop } from "@/types/types";

export async function GET() {
  try {
    const shops: TShop[] = [
      {
        id: 1,
        name: "shop 1",
        avatar: "/icon.png",
        posters: [],
        detail: "ورزشی اورجینال",
        shop_categories: [],
      },
      {
        id: 2,
        name: "shop 2",
        avatar: "/icon.png",
        posters: [],
        detail: "اورجینال",
        shop_categories: [],
      },
      {
        id: 3,
        name: "shop 3",
        avatar: "/icon.png",
        posters: [],
        detail: "ورزشی",
        shop_categories: [],
      },
    ];

    return NextResponse.json({
      massage: "Shop Api GET",
      massage_fa: "دریافت تمام فروشگاه ها",
      data: shops,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      massage: "Error Fetching Shop",
      massage_fa: "خطای سرور",
      status: 500,
    });
  }
}
