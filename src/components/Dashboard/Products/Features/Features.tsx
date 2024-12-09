"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import TableProductsFeatures from "./TableProductsFeatures";

export default function Features({ shopId }) {
  const { data: session } = useSession();

  const [inputsItemsList, setInputsItemsList] = useState<string[]>([]);

  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onOpenChange: onOpenChangeAddModal,
  } = useDisclosure();
  const {
    isOpen: isOpenUseProducts,
    onOpen: onOpenUseProducts,
    onOpenChange: onOpenChangeUseProducts,
  } = useDisclosure();

  const inputsItems = [
    {
      id: 1,
      title: "نام ورودی1",
      items: [
        { id: 1, title: "نام آیتم" },
        { id: 2, title: "نام آیتم" },
        { id: 3, title: "نام آیتم" },
      ],
    },
    {
      id: 2,
      title: "نام ورودی2",
      items: [{ id: 1, title: "نام آیتم" }],
    },
    {
      id: 3,
      title: "نام ورودی3",
      items: [
        { id: 1, title: "نام آیتم" },
        { id: 2, title: "نام آیتم" },
      ],
    },
  ];

  const handleAddItem = () => {
    setInputsItemsList([...inputsItemsList, ""]);
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...inputsItemsList];
    newItems[index] = value;
    setInputsItemsList(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = inputsItemsList.filter((_, i) => i !== index);
    setInputsItemsList(newItems);
  };

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Button
          onPress={onOpenAddModal}
          isIconOnly
          color="primary"
          className="font-bold text-lg text-zinc-700"
        >
          +
        </Button>
      </div>
      {true ? (
        <div className="flex flex-col gap-y-4">
          <>
            {inputsItems.map((input) => (
              <div
                key={input.id}
                className="collapse cursor-pointer shadow border border-primary"
              >
                <input type="radio" name="accordion-1" />
                <div className="collapse-title flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="break-words overflow-hidden text-xl">
                      {input.title}
                    </p>
                  </div>
                </div>
                <div className="collapse-content flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-4">
                    {input.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-x-4">
                        <Input
                          label={item.title}
                          variant="bordered"
                          color="primary"
                        />
                        <Button isIconOnly className="font-bold text-lg">
                          -
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Button isIconOnly className="text-white bg-rose-500">
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
                    </Button>
                    <Button
                      onPress={onOpenUseProducts}
                      fullWidth
                      color="success"
                      className="text-white font-semibold"
                    >
                      انتساب ویژگی به محصول
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>

          <Button
            fullWidth
            color="primary"
            className="text-zinc-700 font-semibold"
          >
            ثبت
          </Button>
        </div>
      ) : (
        <p className="text-center pt-60 pb-20">
          هیچ ورودی برای سفارشات شما ایجاد نشده است. لطفا از دکمه + ایجاد کنید و
          به محصول مربوطه وصل کنید.
        </p>
      )}

      <>
        <Modal
          scrollBehavior={"inside"}
          isOpen={isOpenAddModal}
          onOpenChange={onOpenChangeAddModal}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  افزودن ویژگی
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-y-4">
                    <div className="flex items-center gap-x-2">
                      <Input
                        label={"نام ویژگی"}
                        variant="bordered"
                        color="primary"
                      />
                      <Button
                        onPress={handleAddItem}
                        color="primary"
                        className="text-zinc-700 py-6"
                      >
                        افزودن آیتم
                      </Button>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      {inputsItemsList.map((item, index) => (
                        <div key={index} className="flex items-center gap-x-4">
                          <Input
                            label={`آیتم ${index + 1}`}
                            variant="bordered"
                            color="primary"
                            value={item}
                            onChange={(e) =>
                              handleItemChange(index, e.target.value)
                            }
                          />
                          <Button
                            onPress={() => handleRemoveItem(index)}
                            isIconOnly
                            className="font-bold text-lg"
                          >
                            -
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    بستن
                  </Button>
                  <Button
                    fullWidth
                    color="primary"
                    className="text-zinc-700"
                    onPress={onClose}
                  >
                    افزودن
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isOpenUseProducts}
          onOpenChange={onOpenChangeUseProducts}
          size="full"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  انتساب ویژگی به محصولات
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col items-center gap-y-4">
                    <div className="flex items-center gap-x-4">
                      <div className="flex flex-col gap-y-4">
                        <Input
                          label={"item.title"}
                          variant="bordered"
                          color="primary"
                        />
                        <Input
                          label={"item.title"}
                          variant="bordered"
                          color="primary"
                        />
                      </div>
                      <div className="flex flex-col gap-y-4">
                        <Input
                          label={"item.title"}
                          variant="bordered"
                          color="primary"
                        />
                        <Input
                          label={"item.title"}
                          variant="bordered"
                          color="primary"
                        />
                      </div>
                    </div>
                    <p className="text-center">
                      محصولاتی که مربوط به این ویژگی میباشند رو تیک بزنین
                    </p>
                    <div className="w-full">
                      <TableProductsFeatures />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </>
  );
}
