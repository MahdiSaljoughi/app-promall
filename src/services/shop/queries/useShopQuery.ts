import { useQuery } from "@tanstack/react-query";
import { ShopApi } from "../api";

export default function useShopQuery() {
  const { isPending, error, data } = useQuery({
    queryKey: ["Shop"],
    queryFn: async () => {
      const shops = await ShopApi.getAll();
      return shops.data;
    },
  });

  return { isPending, error, data };
}
