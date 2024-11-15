"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Shop {
  id: string;
  name: string;
  avatar: string;
  detail: any;
  shopCategories: any;
}

export default function EditShop({ shopId }) {
  const { data: session } = useSession();

  const router = useRouter();

  const [shop, setShop] = useState<Shop | undefined>(undefined);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [shopName, setShopName] = useState(shop?.name);
  const shopInstaId = useRef<HTMLInputElement>(null);
  const [fileURLsPoster, setFileURLsPoster] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  // Modals
  const [isOpenEditName, setIsOpenEditName] = useState(false);
  const onOpenEditName = () => setIsOpenEditName(true);
  const onCloseEditName = () => setIsOpenEditName(false);
  //
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);
  const onOpenEditCategory = () => setIsOpenEditCategory(true);
  const onCloseEditCategory = () => setIsOpenEditCategory(false);

  async function fetchShop() {
    if (shopId === null) {
      return;
    }

    try {
      const response = await fetch(`${process.env.API_URL}/shop/${shopId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      });

      if (response.ok) {
        const shop = await response.json();
        setShop(shop.data);
      } else {
        console.log("Failed to fetch shop data:", response.statusText);
      }
    } catch (error) {
      console.log("Error fetching shop data:", error);
    }
  }

  useEffect(() => {
    fetchShop();
  }, [shopId]);

  if (!shop) {
    return (
      <>
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner
            size="lg"
            color="primary"
            labelColor="primary"
            label="در حال بارگذاری..."
            classNames={{ label: "mt-4" }}
          />
        </div>
      </>
    );
  }

  const handleUpdate = async () => {
    // "Content-Type": "application/json",
    // "Content-Type": "multipart",

    try {
      // const formData = new FormData();
      // if (avatarFile) {
      //   formData.append("avatar", avatarFile);
      // }
      // formData.append("name", shopName || "");
      // formData.append("instaId", shopInstaId.current?.value || "");

      const response = await fetch(`${process.env.API_URL}/shop/${shopId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        // body: formData,
        body: JSON.stringify({
          name: shopName,
          instaId: shopInstaId.current?.value,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      await fetchShop();
      alert("با موفقیت انجام شد");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleFileChangePoster = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setFiles(filesArray);
      const fileURLs = filesArray.map((file) => URL.createObjectURL(file));
      setFileURLsPoster(fileURLs);
    }
  };

  const handleConfirmShopName = () => {
    console.log("اسم فروشگاه جدید:", shopName);
    onCloseEditName();
  };

  return (
    <>
      <div className="fixed inset-x-0 z-50 flex items-center h-20 bg-gradient-to-b from-sky-500/20 dark:from-black/100 to-transparent -top-2">
        <div className="flex w-full justify-end">
          <Button
            onClick={() => router.back()}
            variant="light"
            isIconOnly
            className="ml-2"
          >
            <ChevronLeft strokeWidth={2} absoluteStrokeWidth size={30} />
          </Button>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="rounded-b-3xl drop-shadow-md h-56 w-full overflow-hidden">
          {fileURLsPoster.length > 0 ? (
            <>
              <Swiper
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={0}
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                className="mySwiper w-full"
                loop={true}
                breakpoints={{
                  200: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                }}
              >
                {fileURLsPoster.map((image: any, index: any) => (
                  <SwiperSlide key={index}>
                    <div className="relative">
                      <Image
                        src={image}
                        width={1000}
                        height={1000}
                        alt="Shop Poster"
                        className="w-full"
                      />
                      <div className="absolute top-8 right-8 bg-primary p-2 rounded-2xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2em"
                          height="2em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.2 4.2 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241Q1.999 12.737 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236s1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0"
                          />
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M17.5 11c-2.121 0-3.182 0-3.841-.659S13 8.621 13 6.5s0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11m2.53-5.47a.75.75 0 0 0-1.06-1.06L16.5 6.94l-.47-.47a.75.75 0 1 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="flex items-center justify-center w-full">
                  <button className="swiper-button-prev-custom">
                    <div className="p-1.5 lg:p-2 mb-1 rounded-xl lg:rounded-2xl text-zinc-500 hover:scale-110 transition-transform-2 mx-2 border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                        className="rotate-180"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m15 19l-7-7l7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  <button className="swiper-button-next-custom">
                    <div className="p-1.5 lg:p-2 mb-1 rounded-xl lg:rounded-2xl text-zinc-500 hover:scale-110 transition-transform-2 mx-2 border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m15 19l-7-7l7-7"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </Swiper>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded-b-3xl drop-shadow-md h-56">
                <button className="w-full flex items-center justify-center">
                  <label
                    htmlFor="file-upload-poster"
                    className="cursor-pointer flex flex-col gap-y-2 items-center"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChangePoster}
                      className="hidden"
                      id="file-upload-poster"
                      multiple
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      >
                        <path d="M18.5 1.25a.75.75 0 0 1 .75.75v2.75H22a.75.75 0 0 1 0 1.5h-2.75V9a.75.75 0 0 1-1.5 0V6.25H15a.75.75 0 0 1 0-1.5h2.75V2a.75.75 0 0 1 .75-.75" />
                        <path d="M12 1.25h-.057c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529V12a.75.75 0 0 0-1.5 0c0 2.378-.002 4.086-.176 5.386l-.022.152l-2.774-2.497a3.75 3.75 0 0 0-4.665-.28l-.298.21a1.25 1.25 0 0 1-1.602-.14l-4.29-4.29a3.05 3.05 0 0 0-4.165-.138l-.507.443c.005-1.792.03-3.153.175-4.232c.172-1.279.5-2.05 1.069-2.62c.57-.569 1.34-.896 2.619-1.068c1.3-.174 3.008-.176 5.386-.176a.75.75 0 0 0 0-1.5M2.926 17.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069a3 3 0 0 0 .604-.865a1 1 0 0 1-.112-.083l-3.223-2.9a2.25 2.25 0 0 0-2.8-.17l-.297.21a2.75 2.75 0 0 1-3.526-.305l-4.29-4.29a1.55 1.55 0 0 0-2.117-.07L2.75 12.84c.003 1.948.023 3.405.176 4.546" />
                      </g>
                    </svg>
                    <p className="text-primary mr-2">انتخاب پوستر</p>
                  </label>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-y-8 mx-10">
          <div>
            <>
              <button className="-mt-20 relative bg-black size-28 flex items-center justify-center rounded-3xl">
                <label htmlFor="file-upload">
                  <Image
                    src={
                      avatarPreview === ""
                        ? `${process.env.API_URL}/${shop?.avatar}`
                        : avatarPreview
                    }
                    alt="Shop Avatar"
                    className="w-28 rounded-3xl"
                    width={1000}
                    height={1000}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setAvatarFile(e.target.files[0]);
                        setAvatarPreview(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }
                    }}
                    className="hidden"
                    id="file-upload"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.4em"
                    height="2.4em"
                    viewBox="0 0 24 24"
                    className="absolute -right-2 -bottom-2 bg-primary text-zinc-100 dark:text-zinc-800 p-1.5 rounded-2xl"
                  >
                    <path
                      fill="currentColor"
                      d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.2 4.2 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241Q1.999 12.737 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236s1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0"
                    />
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M17.5 11c-2.121 0-3.182 0-3.841-.659S13 8.621 13 6.5s0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 8.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187c-.09.043-.188.076-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </button>
            </>
          </div>

          <div className="flex items-center gap-x-2 font-semibold">
            <p className="text-2xl font-bold">{shop?.name}</p>
            <Button onPress={onOpenEditName} isIconOnly color="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    d="M22 10.5V12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2h1.5"
                    opacity="0.5"
                  />
                  <path d="m17.3 2.806l-.648.65l-5.965 5.964c-.404.404-.606.606-.78.829q-.308.395-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9l-.374 1.123a.742.742 0 0 0 .94.939l1.122-.374l1.735-.579c.542-.18.813-.27 1.068-.392q.453-.217.848-.524c.223-.174.425-.376.83-.78l5.964-5.965l.649-.649A2.753 2.753 0 0 0 17.3 2.806Z" />
                  <path
                    d="M16.652 3.455s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298M10.1 15.588L8.413 13.9"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </Button>
          </div>

          <div className="flex items-center gap-x-2 font-semibold">
            <p>دسته بندی</p>
            <Button onPress={onOpenEditCategory} isIconOnly color="primary">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    d="M22 10.5V12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2h1.5"
                    opacity="0.5"
                  />
                  <path d="m17.3 2.806l-.648.65l-5.965 5.964c-.404.404-.606.606-.78.829q-.308.395-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9l-.374 1.123a.742.742 0 0 0 .94.939l1.122-.374l1.735-.579c.542-.18.813-.27 1.068-.392q.453-.217.848-.524c.223-.174.425-.376.83-.78l5.964-5.965l.649-.649A2.753 2.753 0 0 0 17.3 2.806Z" />
                  <path
                    d="M16.652 3.455s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298M10.1 15.588L8.413 13.9"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </Button>
          </div>

          <div>
            <Link
              href={`/dashboard/shop/products/${shopId}`}
              className="bg-sky-50 dark:bg-zinc-900 p-4 rounded-2xl text-center block mb-3 text-lg border border-sky-200 dark:border-slate-600/30"
            >
              <span>مدیریت محصولات</span>
            </Link>

            <Accordion variant="splitted" style={{ padding: "0" }}>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="اطلاعات فروشگاه"
              >
                <div className="flex flex-col gap-y-4">
                  <Input
                    dir="ltr"
                    type="text"
                    label="درباره فروشگاه"
                    variant="bordered"
                    color="primary"
                    className="w-full"
                    // ref={shopInstaId}
                    // defaultValue={shop?.detail.instaId}
                  />
                  <Input
                    dir="ltr"
                    type="text"
                    label="آدرس سایت فروشگاه"
                    variant="bordered"
                    color="primary"
                    className="w-full"
                    // ref={shopInstaId}
                    // defaultValue={shop?.detail.instaId}
                  />
                  <Input
                    dir="ltr"
                    type="text"
                    label="آدرس حضوری فروشگاه"
                    variant="bordered"
                    color="primary"
                    className="w-full"
                    // ref={shopInstaId}
                    // defaultValue={shop?.detail.instaId}
                  />
                </div>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="سوشیال مدیا فروشگاه"
              >
                <Input
                  dir="ltr"
                  type="text"
                  label="آیدی اینستاگرام*"
                  variant="bordered"
                  color="primary"
                  className="w-full"
                  ref={shopInstaId}
                  defaultValue={shop?.detail.instaId}
                />
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="تنظیمات فروشگاه"
              >
                تنظیمات فروشگاه
              </AccordionItem>
            </Accordion>
          </div>

          <Button
            onPress={handleUpdate}
            fullWidth
            color="primary"
            className="mb-10 font-semibold"
          >
            ذخیره تغیرات
          </Button>
        </div>
      </div>

      {/* Modals */}
      {/*  */}
      <Modal isOpen={isOpenEditName} onClose={onCloseEditName}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>ویرایش اسم فروشگاه</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="اسم فروشگاه*"
                  variant="bordered"
                  color="primary"
                  className="w-full"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button
                  color="primary"
                  fullWidth
                  onPress={handleConfirmShopName}
                >
                  تایید
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/*  */}
      <Modal isOpen={isOpenEditCategory} onClose={onCloseEditCategory}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>ویرایش دسته بندی</ModalHeader>
              <ModalBody>
                <Select
                  label="دسته بندی*"
                  selectionMode="multiple"
                  className="w-full"
                  variant="bordered"
                  color="primary"
                  name="categoryIds"
                  // value={categoryIds}
                  // onChange={(e) => setCategoryIds(e.target.value)}
                >
                  <SelectItem key={"test"}>test</SelectItem>
                  <SelectItem key={"test1"}>test1</SelectItem>
                  <SelectItem key={"test2"}>test2</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button color="primary" fullWidth onPress={onClose}>
                  تایید
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
