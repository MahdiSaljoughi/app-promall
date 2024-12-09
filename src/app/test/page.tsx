"use client";

import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Page() {
  const { isPending: isPendingPosts, data: dataPosts } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return res.json();
    },
  });

  if (isPendingPosts) {
    return (
      <>
        <div className="h-screen flex items-center justify-center">
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
      <div className="min-h-screen">
        <ul className="text-center py-8 space-y-4">
          {dataPosts.map((x: any) => (
            <li key={x.id}>{x.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
