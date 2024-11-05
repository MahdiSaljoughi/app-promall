"use client";

import React, { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

interface Products {
  id: string;
  name: string;
  images: string[];
  price: number;
  availibility: string;
}

export default function TableProducts({ shopId }) {
  const { data: session } = useSession();

  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/products/shop/${shopId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
          },
        }
      );

      if (response.ok) {
        const shopsData = await response.json();
        setProducts(shopsData.data);
      } else {
        console.log("Failed to fetch shop products data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching shop products data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.access_token) {
        await fetchProducts();
      }
    };
    fetchData();
  }, [session?.user?.access_token]);

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

  const renderCell = React.useCallback((product: any, columnKey: any) => {
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
                  width="1.2em"
                  height="1.2em"
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
              <span className="text-lg text-primary cursor-pointer active:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
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
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
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

  return (
    <>
      <div className="dark:bg-zinc-900 rounded-2xl shadow-lg border dark:border-none">
        <div className="pr-4 pt-4">
          <Button className="flex items-center gap-x-2" color="primary">
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
        </div>

        <Table shadow="none" aria-label="Product Table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={products}
            emptyContent={"محصولی ندارین"}
            isLoading={loading}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
