"use client";

import ImagesProduct from "@/components/Product/ImagesProduct";
import ShopHeaderProduct from "@/services/shop/components/ShopPage/Header/ShopHeaderProduct";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  availibility: string;
}

interface Params {
  productId: string;
  shopId: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  const { shopId, productId } = use(params);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.API_URL}/shops/${shopId}/products/${productId}`
        );

        if (response.ok) {
          const shopsData = await response.json();
          setProduct(shopsData.data);
        } else {
          console.log("Failed to fetch shop products data:", response.status);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching shop products data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) {
    return;
  }

  return (
    <>
      <ShopHeaderProduct />

      <div className="min-h-screen mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-20 pt-20">
        <div className="lg:flex justify-between lg:gap-x-8">
          <div className="w-full rounded-2xl">
            <div className="flex flex-col gap-y-4 md:gap-8">
              <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                <ImagesProduct product={product} />
                <div className="flex flex-col gap-y-6 md:gap-y-4 w-full">
                  <h1 className="md:text-lg font-semibold line-clamp-2 leading-7">
                    {product?.name}
                  </h1>
                  <div className="flex flex-col md:flex-row md:items-center gap-y-4 gap-x-2">
                    <span className="md:text-nowrap text-left md:text-right block text-xs text-zinc-400">
                      {product?.name}
                    </span>
                    <span className="w-full h-0.5 bg-zinc-200 dark:bg-zinc-700" />
                  </div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-300">{`دسته بندی : ${product?.id}`}</span>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex justify-center items-center mt-8 gap-3">
                      <button className="flex flex-col items-center">
                        <div className="bg-gray-900 w-9 h-9 rounded-lg" />
                        <p className="text-center text-sm mt-2">میدنایت</p>
                      </button>
                      <button className="flex flex-col items-center">
                        <div className="bg-[#DDD7D3] w-9 h-9 rounded-lg" />
                        <p className="text-center text-sm mt-2">استخانی</p>
                      </button>
                    </div>
                    <div className="inline-flex justify-center items-center ml-2">
                      <span className="mt-1">۴.۹</span>
                      &nbsp;&nbsp;
                      <FaStar size={20} color="gold" strokeWidth={0.1} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between w-full gap-x-10">
                <div className="lg:sticky top-24 flex items-center gap-x-2 mb-4 bg-gradient-to-r from-transparent to-green-500/40 py-2 pr-4 rounded-lg h-10 lg:w-72">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 24 24"
                    className="text-green-300"
                  >
                    <path
                      fill="currentColor"
                      d="M2 9c0-3.771 0-5.657 1.172-6.828S6.229 1 10 1h4c3.771 0 5.657 0 6.828 1.172S22 5.229 22 9v4c0 3.771 0 5.657-1.172 6.828S17.771 21 14 21h-4c-3.771 0-5.657 0-6.828-1.172S2 16.771 2 13z"
                      opacity="0.5"
                    />
                    <path
                      fill="currentColor"
                      d="M6 12.91V7.497c0-.823.665-1.495 1.487-1.435c.513.037 1.069.101 1.513.21c.824.201 1.851.7 2.465 1.022l.035.018v8.415l-.007-.004c-.61-.321-1.656-.832-2.493-1.037c-.438-.107-.984-.17-1.49-.208c-.83-.062-1.51-.733-1.51-1.566m6.5 2.814l.007-.004c.61-.321 1.656-.832 2.493-1.037c.438-.107.984-.17 1.49-.208c.83-.062 1.51-.733 1.51-1.566V7.45c0-.806-.638-1.469-1.443-1.43c-.616.031-1.317.1-1.857.25c-.731.203-1.625.68-2.178 1l-.022.012z"
                    />
                  </svg>
                  <span className="text-sm md:text-md font-semibold">
                    توضیحات
                  </span>
                </div>
                <div className="w-full pb-20">
                  <p className="w-full leading-8 text-sm text-default-500">
                    {product?.availibility}
                    کفش نایک دیور خاص لیمیتد، ترکیبی است از طراحی مدرن و ظرافت
                    بی‌نظیر. این کفش نه تنها یک کالای ورزشی است، بلکه به عنوان
                    یک اکسسوری لوکس نیز شناخته می‌شود.
                  </p>
                  {/* ... */}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full lg:w-72 xl:w-96 bg-zinc-100 dark:bg-black lg:rounded-2xl py-4 px-2 md:p-4 fixed bottom-0 inset-x-0 lg:sticky lg:top-0">
              {product?.availibility > "0" ? (
                <>
                  <div className="flex flex-row-reverse md:flex-col gap-4 items-center justify-between">
                    <div className="hidden w-full text-sm lg:flex flex-col gap-y-6">
                      <div className="flex items-center gap-x-2 font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4em"
                          height="2.4em"
                          viewBox="0 0 24 24"
                          className="text-sky-600"
                        >
                          <path
                            fill="currentColor"
                            d="M16.528 2H7.472c-1.203 0-1.804 0-2.288.299c-.483.298-.752.836-1.29 1.912L2.491 7.76c-.325.82-.608 1.786-.062 2.479A2 2 0 0 0 6 9a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 3.571 1.238c.546-.693.262-1.659-.062-2.479l-1.404-3.548c-.538-1.076-.806-1.614-1.29-1.912C18.332 2 17.73 2 16.528 2M9.5 21.25V18.5c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C10.598 16 11.065 16 12 16s1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549c.201.348.201.815.201 1.75v2.75z"
                          />
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M4 11a2 2 0 0 0 2-2a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 2 2v10.25h-5.5V18.5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549C13.402 16 12.935 16 12 16s-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549c-.201.348-.201.815-.201 1.75v2.75H4z"
                            clipRule="evenodd"
                            opacity="0.5"
                          />
                          <path
                            fill="currentColor"
                            d="M14.5 21.25H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5z"
                          />
                        </svg>
                        <span>موجود در انبار</span>
                      </div>
                      <div className="flex items-center gap-x-2 font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4em"
                          height="2.4em"
                          viewBox="0 0 24 24"
                          className="text-emerald-400"
                        >
                          <path
                            fill="currentColor"
                            d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082"
                            opacity="0.5"
                          />
                          <path
                            fill="currentColor"
                            d="M15.06 10.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z"
                          />
                        </svg>
                        <span>گارانتی اصالت کالا و سلامت فیزیکی</span>
                      </div>
                    </div>
                    <div className="flex items-center lg:w-full justify-end">
                      <span className="text-lg md:text-xl">
                        {product?.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                      <svg className="size-4">
                        <path
                          fillRule="evenodd"
                          d="M3.057 1.742L3.821 1l.78.75-.776.741-.768-.749zm3.23 2.48c0 .622-.16 1.111-.478 1.467-.201.221-.462.39-.783.505a3.251 3.251 0 01-1.083.163h-.555c-.421 0-.801-.074-1.139-.223a2.045 2.045 0 01-.9-.738A2.238 2.238 0 011 4.148c0-.059.001-.117.004-.176.03-.55.204-1.158.525-1.827l1.095.484c-.257.532-.397 1-.419 1.403-.002.04-.004.08-.004.12 0 .252.055.458.166.618a.887.887 0 00.5.354c.085.028.178.048.278.06.079.01.16.014.243.014h.555c.458 0 .769-.081.933-.244.14-.139.21-.383.21-.731V2.02h1.2v2.202zm5.433 3.184l-.72-.7.709-.706.735.707-.724.7zm-2.856.308c.542 0 .973.19 1.293.569.297.346.445.777.445 1.293v.364h.18v-.004h.41c.221 0 .377-.028.467-.084.093-.055.14-.14.14-.258v-.069c.004-.243.017-1.044 0-1.115L13 8.05v1.574a1.4 1.4 0 01-.287.863c-.306.405-.804.607-1.495.607h-.627c-.061.733-.434 1.257-1.117 1.573-.267.122-.58.21-.937.265a5.845 5.845 0 01-.914.067v-1.159c.612 0 1.072-.082 1.38-.247.25-.132.376-.298.376-.499h-.515c-.436 0-.807-.113-1.113-.339-.367-.273-.55-.667-.55-1.18 0-.488.122-.901.367-1.24.296-.415.728-.622 1.296-.622zm.533 2.226v-.364c0-.217-.048-.389-.143-.516a.464.464 0 00-.39-.187.478.478 0 00-.396.187.705.705 0 00-.136.449.65.65 0 00.003.067c.008.125.066.22.177.283.093.054.21.08.352.08h.533zM9.5 6.707l.72.7.724-.7L10.209 6l-.709.707zm-6.694 4.888h.03c.433-.01.745-.106.937-.29.024.012.065.035.12.068l.074.039.081.042c.135.073.261.133.379.18.345.146.67.22.977.22a1.216 1.216 0 00.87-.34c.3-.285.449-.714.449-1.286a2.19 2.19 0 00-.335-1.145c-.299-.457-.732-.685-1.3-.685-.502 0-.916.192-1.242.575-.113.132-.21.284-.294.456-.032.062-.06.125-.084.191a.504.504 0 00-.03.078 1.67 1.67 0 00-.022.06c-.103.309-.171.485-.205.53-.072.09-.214.14-.427.147-.123-.005-.209-.03-.256-.076-.057-.054-.085-.153-.085-.297V7l-1.201-.5v3.562c0 .261.048.496.143.703.071.158.168.296.29.413.123.118.266.211.43.28.198.084.42.13.665.136v.001h.036zm2.752-1.014a.778.778 0 00.044-.353.868.868 0 00-.165-.47c-.1-.134-.217-.201-.35-.201-.18 0-.33.103-.447.31-.042.071-.08.158-.114.262a2.434 2.434 0 00-.04.12l-.015.053-.015.046c.142.118.323.216.544.293.18.062.325.092.433.092.044 0 .086-.05.125-.152z"
                          clipRule="evenodd"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <Button
                      fullWidth
                      variant="solid"
                      color="primary"
                      className="text-lg"
                    >
                      میخوامش
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="text-red-500 text-sm bg-red-400/20 py-2 px-8 rounded-xl">
                    ناموجود
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
