"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Check, MapPinIcon, PackageSearch } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function OrderModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="z-50 mx-5 mt-24 bg-black/35"
        backdrop="blur"
        classNames={{ closeButton: "invisible" }}
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1 items-center justify-center relative z-50 ">
                <div className="-mt-40 w-40 p-3 h-40 bg-primary justify-center items-center flex z-[500] fixed rounded-3xl shadow-2xl drop-shadow-2xl">
                  <Image
                    src={"/assets/nikelogoblack.png"}
                    alt={""}
                    width={160}
                    height={160}
                    className="object-fill"
                  ></Image>
                </div>
                <span className="mt-20 font-bold text-xl">فروشگاه نایک </span>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className="font-bold mb-9 text-lg mt-5">
                    تو سه سوت سفارشت نهایی میشه !
                  </div>

                  <div className="flex flex-col">
                    <MapPinIcon
                      className="text-primary text-center self-center mb-3"
                      size={30}
                    ></MapPinIcon>
                    اول اطلاعات و آدرس نیازه
                  </div>
                  <div className="w-72 h-[0.1px] bg-default-500"></div>

                  <div className="flex flex-col">
                    <Check
                      className="text-primary text-center self-center mb-3"
                      size={30}
                    ></Check>
                    بعد از بررسی تاییدش میکنی
                  </div>
                  <div className="w-72 h-[0.1px] bg-default-500"></div>
                  <div className="flex flex-col">
                    <PackageSearch
                      className="text-primary text-center self-center mb-3"
                      size={30}
                    ></PackageSearch>
                    و در آخر کد پیگیری رو یادداشت میکنی مبارکه :)
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="mt-10 w-full flex flex-col justify-center items-center gap-3">
                  <Button color="primary" className="w-full" onPress={onClose}>
                    <span className="font-bold">برو بریم !</span>
                  </Button>
                  <span>
                    قدرت گرفته از{" "}
                    <span className="text-primary font-bold">پرومال</span>
                  </span>
                </div>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
