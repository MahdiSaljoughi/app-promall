"use client";

import { Avatar } from "@nextui-org/react";

interface IStatus {
  id: number;
  color: string;
  src: string;
  name: string;
}

export default function StoryBar() {
  const statuses: IStatus[] = [
    {
      id: 0,
      color: "danger",
      src: "https://i.pravatar.cc/150?u=a04258114e29026708c",
      name: "",
    },
    {
      id: 1,
      color: "danger",
      src: "/assets/nike-logo.png",
      name: "",
    },
    {
      id: 2,
      color: "danger",
      src: "/assets/jordanlogo.png",
      name: "",
    },
    {
      id: 3,
      color: "danger",
      src: "/assets/diorlogo.png",
      name: "",
    },
    {
      id: 4,
      color: "danger",
      src: "/assets/lvlogo.png",
      name: "",
    },
    {
      id: 5,
      color: "default",
      src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      name: "",
    },
    {
      id: 6,
      color: "default",
      src: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      name: "",
    },
    {
      id: 7,
      color: "primary",
      src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      name: "",
    },
    {
      id: 8,
      color: "primary",
      src: "https://i.pravatar.cc/150?u=a04258114e29026302d",
      name: "",
    },
    {
      id: 9,
      color: "danger",
      src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      name: "",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {statuses.map((status: IStatus) => (
            <Avatar
              key={status.id}
              // @ts-expect-error
              color={status.color}
              src={status.src}
              // radius="lg"
              size="lg"
              name={status.name}
              isBordered
            />
          ))}
        </div>
      </div>
    </>
  );
}
