<<<<<<< HEAD
"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

export default function FileBox({ File }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${process.env.API_URL}${File}`}
        alt="file"
        className="size-40"
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          closeButton: "text-2xl m-2",
        }}
      >
        <ModalContent className="p-4 pt-14">
          <ModalBody>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.API_URL}${File}`}
              alt="file"
              className="w-full"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
=======
"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

export default function FileBox({ File }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${process.env.API_URL}${File}`}
        alt="file"
        className="w-40"
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="bg-dashboard-gradient"
        classNames={{
          closeButton: "text-2xl pl-4 py-4",
        }}
      >
        <ModalContent className="p-4 pt-14">
          <ModalBody>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.API_URL}${File}`}
              alt="file"
              className="w-full"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
>>>>>>> 920b57d7d733d4949c99092b458390ed4130fa69
