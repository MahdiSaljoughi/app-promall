"use client";

import { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Spinner,
} from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { IProduct } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";

export default function TableProducts({ shopId, session }) {
  const [productId, setProductId] = useState("");
  // Add Product
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [produtcAvailibility, setProdutcAvailibility] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileURLs, setFileURLs] = useState<string[]>([]);

  const {
    isPending: isPendingProducts,
    data: dataProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.API_URL}/products/shop/${shopId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      const productsData = await res.json();
      return productsData.data;
    },
  });

  // Modals
  // DeleteModal
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const onOpenDeleteModal = (id: string) => {
    setIsOpenDeleteModal(true);
    setProductId(id);
  };
  const onCloseDeleteModal = () => setIsOpenDeleteModal(false);
  const onDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
          body: id,
        }
      );

      if (response.ok) {
        await refetchProducts();
        onCloseDeleteModal();
      } else {
        console.log("Failed to fetch delete products data:", response.status);
      }
    } catch (error) {
      console.log("Error fetching delete products data:", error);
    }
  };
  // AddModal
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const onOpenAddModal = () => setIsOpenAddModal(true);
  const onCloseAddModal = () => setIsOpenAddModal(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setFiles(filesArray);
      const fileURLs = filesArray.map((file) => URL.createObjectURL(file));
      setFileURLs(fileURLs);
    }
  };
  const onAdd = async () => {
    if (
      !productName ||
      !productPrice ||
      !produtcAvailibility ||
      files.length === 0
    ) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("availibility", produtcAvailibility);
    formData.append("shopId", shopId);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${process.env.API_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setProductName("");
        setProductPrice("");
        setProdutcAvailibility("");
        setFiles([]);
        setFileURLs([]);
        onCloseAddModal();
        await refetchProducts();
      } else {
        console.log("Failed to create products data:", response.status);
      }
    } catch (error) {
      console.log("Error fetching create products data:", error);
    }
  };
  // EditModal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const onOpenEditModal = (id: string) => {
    setIsOpenEditModal(true);
    setProductId(id);
  };
  const onCloseEditModal = () => setIsOpenEditModal(false);
  const handleFileChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setFiles(filesArray);
      const fileURLs = filesArray.map((file) => URL.createObjectURL(file));
      setFileURLs(fileURLs);
    }
  };
  const onEdit = async () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("availibility", produtcAvailibility);
    formData.append("shopId", shopId);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(
        `${process.env.API_URL}/products/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setProductName("");
        setProductPrice("");
        setProdutcAvailibility("");
        setFiles([]);
        setFileURLs([]);
        onCloseEditModal();
        await refetchProducts();
      } else {
        console.log("Failed to create products data:", response.status);
      }
    } catch (error) {
      console.log("Error fetching create products data:", error);
    }
  };

  const columns = [
    {
      key: "product",
      name: "محصول",
    },
    {
      key: "status",
      name: "وضعیت",
    },
    {
      key: "actions",
      name: "عملیات",
    },
  ];

  const renderCell = useCallback((product: any, columnKey: any) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <div className="flex items-center gap-x-2">
            <Avatar src={`${process.env.API_URL}${product.images[0]}`} />
            <span className="hidden md:block">{product.name}</span>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={product.availibility > 0 ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {product.availibility > 0 ? "موجود" : "ناموجود"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-x-4">
            <Tooltip color="primary" content="مشاهده محصول">
              <span className="text-lg text-primary cursor-pointer active:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <path
                      d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"
                      opacity="0.5"
                    />
                    <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                  </g>
                </svg>
              </span>
            </Tooltip>
            <Tooltip color="primary" content="ویرایش محصول">
              <span
                aria-label="ویرایش محصول"
                onClick={() => onOpenEditModal(product.id)}
                className="text-lg text-primary cursor-pointer active:opacity-50"
              >
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
              </span>
            </Tooltip>
            <Tooltip color="danger" content="حذف محصول">
              <span
                aria-label="حذف محصول"
                onClick={() => onOpenDeleteModal(product.id)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2.75a2.25 2.25 0 0 0-2.122 1.5a.75.75 0 0 1-1.414-.5a3.751 3.751 0 0 1 7.073 0a.75.75 0 0 1-1.415.5A2.25 2.25 0 0 0 12 2.75M2.75 6a.75.75 0 0 1 .75-.75h17a.75.75 0 0 1 0 1.5h-17A.75.75 0 0 1 2.75 6m3.165 2.45a.75.75 0 1 0-1.497.1l.464 6.952c.085 1.282.154 2.318.316 3.132c.169.845.455 1.551 1.047 2.104s1.315.793 2.17.904c.822.108 1.86.108 3.146.108h.879c1.285 0 2.324 0 3.146-.108c.854-.111 1.578-.35 2.17-.904c.591-.553.877-1.26 1.046-2.104c.162-.814.23-1.85.316-3.132l.464-6.952a.75.75 0 0 0-1.497-.1l-.46 6.9c-.09 1.347-.154 2.285-.294 2.99c-.137.685-.327 1.047-.6 1.303c-.274.256-.648.422-1.34.512c-.713.093-1.653.095-3.004.095h-.774c-1.35 0-2.29-.002-3.004-.095c-.692-.09-1.066-.256-1.34-.512c-.273-.256-.463-.618-.6-1.303c-.14-.705-.204-1.643-.294-2.99z"
                  />
                  <path
                    fill="currentColor"
                    d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 0 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821m5.821.821a.75.75 0 0 0-1.492-.15l-.5 5a.75.75 0 0 0 1.492.15z"
                  />
                </svg>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isPendingProducts) {
    return (
      <>
        <div className="flex items-center justify-center h-full fixed lg:static inset-0">
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

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border dark:border-none">
        <div className="flex items-center justify-between px-4 pt-4">
          <Button
            onPress={onOpenAddModal}
            className="flex items-center gap-x-2"
            color="primary"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" opacity="0.5" />
                  <path strokeLinecap="round" d="M15 12h-3m0 0H9m3 0V9m0 3v3" />
                </g>
              </svg>
            </span>
            <span>افزودن محصول</span>
          </Button>
          <p>کل : {dataProducts?.length}</p>
        </div>

        <Table shadow="none" aria-label="Product Table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={dataProducts}
            emptyContent={"محصولی ندارین"}
            isLoading={isPendingProducts}
          >
            {(item: IProduct) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Modals */}
        <>
          {/* Delete */}
          <Modal isOpen={isOpenDeleteModal} onClose={onCloseDeleteModal}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    مطمعنی که حذف بشه؟
                  </ModalHeader>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      خیر
                    </Button>
                    <Button
                      fullWidth
                      color="primary"
                      onPress={() => onDelete(productId)}
                    >
                      اره
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {/* Add */}
          <Modal
            size="full"
            scrollBehavior="inside"
            isOpen={isOpenAddModal}
            onClose={onCloseAddModal}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    افزودن محصول جدید
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-y-4">
                      {fileURLs.length > 0 ? (
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
                            {fileURLs.map((image: any, index: any) => (
                              <SwiperSlide key={index}>
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-3xl relative h-60">
                                  <Image
                                    src={image}
                                    width={200}
                                    height={200}
                                    alt="imageProdutc"
                                    className="w-fit h-full mx-auto"
                                  />
                                  <div className="text-pri mary absolute top-8 right-8 bg-primary p-2 rounded-2xl">
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
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-3xl">
                            <button className="w-full flex items-center justify-center">
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col gap-y-2 items-center"
                              >
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="hidden"
                                  id="file-upload"
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
                                <p className="text-primary mr-2">انتخاب عکس</p>
                              </label>
                            </button>
                          </div>
                        </>
                      )}
                      <Input
                        type="text"
                        label="نام محصول*"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                        name="productName"
                        value={productName}
                        onChange={(e: any) => setProductName(e.target.value)}
                      />
                      <Input
                        type="number"
                        label="قیمت محصول*"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                        name="productPrice"
                        value={productPrice}
                        onChange={(e: any) => setProductPrice(e.target.value)}
                      />
                      <Input
                        type="number"
                        label="مقدار مجودی*"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                        name="produtcAvailibility"
                        value={produtcAvailibility}
                        onChange={(e: any) =>
                          setProdutcAvailibility(e.target.value)
                        }
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      بستن
                    </Button>
                    <Button fullWidth color="primary" onPress={onAdd}>
                      ایجاد
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {/* Edit */}
          <Modal
            size="full"
            scrollBehavior="inside"
            isOpen={isOpenEditModal}
            onClose={onCloseEditModal}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    ویرایش محصول
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-y-4">
                      {fileURLs.length > 0 ? (
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
                            {fileURLs.map((image: any, index: any) => (
                              <SwiperSlide key={index}>
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-3xl relative">
                                  <Image
                                    src={image}
                                    width={200}
                                    height={200}
                                    alt="imageProdutc"
                                    className="w-full"
                                  />
                                  <div className="text-pri mary absolute top-8 right-8 bg-primary p-2 rounded-2xl">
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
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-3xl">
                            <button className="w-full flex items-center justify-center">
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col gap-y-2 items-center"
                              >
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChangeEdit}
                                  className="hidden"
                                  id="file-upload"
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
                                <p className="text-primary mr-2">انتخاب عکس</p>
                              </label>
                            </button>
                          </div>
                        </>
                      )}
                      <Input
                        type="text"
                        label="نام محصول*"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                        name="productName"
                        value={productName}
                        onChange={(e: any) => setProductName(e.target.value)}
                      />
                      <Input
                        type="number"
                        label="قیمت محصول*"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                        name="productPrice"
                        value={productPrice}
                        onChange={(e: any) => setProductPrice(e.target.value)}
                      />
                      <Input
                        type="number"
                        label="مقدار مجودی*"
                        variant="bordered"
                        color="primary"
                        className="w-full"
                        name="produtcAvailibility"
                        value={produtcAvailibility}
                        onChange={(e: any) =>
                          setProdutcAvailibility(e.target.value)
                        }
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      بستن
                    </Button>
                    <Button fullWidth color="primary" onPress={onEdit}>
                      ثبت ویرایش
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
    </>
  );
}
