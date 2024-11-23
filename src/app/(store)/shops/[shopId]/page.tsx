import Image from "next/image";
import Link from "next/link";
import ShopBanner from "@/components/Shop/ShopPage/ShopBanner/ShopBanner";
import HorizontalCategory from "@/components/ui/horizental-category/horizental-category";
import { FaStar } from "react-icons/fa";
import { IProduct, IShop } from "@/types/interfaces";
import { Plus } from "lucide-react";
import Search from "@/components/Home/Search";

interface Params {
  shopId: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const shopId = (await params).shopId;
  let shop: IShop | null = null;
  let products: IProduct[] | null = null;

  try {
    const response = await fetch(`${process.env.API_URL}/shops/${shopId}`);

    if (response.ok) {
      const shopData = await response.json();
      shop = shopData.data;
    } else {
      console.log("Failed to fetch shop data:", response.status);
    }
  } catch (error) {
    console.log("Error fetching shop data:", error);
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/shops/${shopId}/products`
    );

    if (response.ok) {
      const productsData = await response.json();
      products = productsData.data;
    } else {
      console.log("Failed to fetch shop products data:", response.status);
    }
  } catch (error) {
    console.log("Error fetching shop products data:", error);
  }

  return (
    <>
      <div className="min-h-screen pb-10">
        <ShopBanner imageUrl={"/assets/nike-white.png"} />
        <div className="flex flex-col gap-y-8 md:mx-10">
          <div className="-mt-20 bg-black/80 size-28 flex items-center justify-center rounded-3xl mx-4 md:mx-0">
            <Image
              src={`${process.env.API_URL}/${shop?.avatar}`}
              alt="Shop Banner"
              quality={100}
              width={1000}
              height={1000}
              className="w-28 rounded-3xl"
            />
          </div>

          <div className="flex items-center justify-between text-2xl mx-4 md:mx-0">
            <span className="font-bold">{shop?.name}</span>
            <div className="flex items-center justify-center gap-x-2">
              <span className="text-base mt-2">۴.۹</span>
              <FaStar size={24} strokeWidth={0.1} />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <Search />

            <HorizontalCategory />
          </div>

          {products?.length === 0 ? (
            <>
              <p className="flex items-center justify-center py-8 text-lg text-center px-4">
                این فروشگاه هنوز محصولی اضافه نکرده است
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-evenly gap-4 px-4 md:px-0">
                {products?.map((product, index) => (
                  <>
                    <Link
                      key={index}
                      href={`/shops/${shopId}/products/${product.id}`}
                      className="flex flex-col items-center justify-center hover:scale-105 bg-gradient-to-br bg-sky-100/50 dark:from-[#202426] dark:to-[#000000] rounded-[32px] transition-transform duration-500 ease-out dark:hover:shadow-xl"
                    >
                      <div className="p-3">
                        <Image
                          alt={product.name}
                          className="size-36 object-cover rounded-3xl shadow-xl dark:shadow-black"
                          src={`${process.env.API_URL}${product.images[0]}`}
                          width={1000}
                          height={1000}
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <p className="text-medium">{product.name}</p>
                        <p className="text-sm text-default-500">
                          {product.availibility}
                        </p>
                      </div>
                      <div className="flex items-center justify-between w-full p-4">
                        <button
                          className="relative rounded-[12px]  align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] text-xs bg-primary text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                          type="button"
                          data-twe-ripple-init
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <Plus
                              size={20}
                              strokeWidth={1.75}
                              className="text-primary-foreground"
                            />
                          </span>
                        </button>
                        <div className="flex items-center">
                          <p className="text-md font-semibold">
                            {product.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </p>
                          <svg className="size-4">
                            <path
                              fillRule="evenodd"
                              d="M3.057 1.742L3.821 1l.78.75-.776.741-.768-.749zm3.23 2.48c0 .622-.16 1.111-.478 1.467-.201.221-.462.39-.783.505a3.251 3.251 0 01-1.083.163h-.555c-.421 0-.801-.074-1.139-.223a2.045 2.045 0 01-.9-.738A2.238 2.238 0 011 4.148c0-.059.001-.117.004-.176.03-.55.204-1.158.525-1.827l1.095.484c-.257.532-.397 1-.419 1.403-.002.04-.004.08-.004.12 0 .252.055.458.166.618a.887.887 0 00.5.354c.085.028.178.048.278.06.079.01.16.014.243.014h.555c.458 0 .769-.081.933-.244.14-.139.21-.383.21-.731V2.02h1.2v2.202zm5.433 3.184l-.72-.7.709-.706.735.707-.724.7zm-2.856.308c.542 0 .973.19 1.293.569.297.346.445.777.445 1.293v.364h.18v-.004h.41c.221 0 .377-.028.467-.084.093-.055.14-.14.14-.258v-.069c.004-.243.017-1.044 0-1.115L13 8.05v1.574a1.4 1.4 0 01-.287.863c-.306.405-.804.607-1.495.607h-.627c-.061.733-.434 1.257-1.117 1.573-.267.122-.58.21-.937.265a5.845 5.845 0 01-.914.067v-1.159c.612 0 1.072-.082 1.38-.247.25-.132.376-.298.376-.499h-.515c-.436 0-.807-.113-1.113-.339-.367-.273-.55-.667-.55-1.18 0-.488.122-.901.367-1.24.296-.415.728-.622 1.296-.622zm.533 2.226v-.364c0-.217-.048-.389-.143-.516a.464.464 0 00-.39-.187.478.478 0 00-.396.187.705.705 0 00-.136.449.65.65 0 00.003.067c.008.125.066.22.177.283.093.054.21.08.352.08h.533zM9.5 6.707l.72.7.724-.7L10.209 6l-.709.707zm-6.694 4.888h.03c.433-.01.745-.106.937-.29.024.012.065.035.12.068l.074.039.081.042c.135.073.261.133.379.18.345.146.67.22.977.22a1.216 1.216 0 00.87-.34c.3-.285.449-.714.449-1.286a2.19 2.19 0 00-.335-1.145c-.299-.457-.732-.685-1.3-.685-.502 0-.916.192-1.242.575-.113.132-.21.284-.294.456-.032.062-.06.125-.084.191a.504.504 0 00-.03.078 1.67 1.67 0 00-.022.06c-.103.309-.171.485-.205.53-.072.09-.214.14-.427.147-.123-.005-.209-.03-.256-.076-.057-.054-.085-.153-.085-.297V7l-1.201-.5v3.562c0 .261.048.496.143.703.071.158.168.296.29.413.123.118.266.211.43.28.198.084.42.13.665.136v.001h.036zm2.752-1.014a.778.778 0 00.044-.353.868.868 0 00-.165-.47c-.1-.134-.217-.201-.35-.201-.18 0-.33.103-.447.31-.042.071-.08.158-.114.262a2.434 2.434 0 00-.04.12l-.015.053-.015.046c.142.118.323.216.544.293.18.062.325.092.433.092.044 0 .086-.05.125-.152z"
                              clipRule="evenodd"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
