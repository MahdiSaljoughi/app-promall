import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Page() {
  return (
    <>
      <div className="dark:bg-main-bg min-h-screen flex flex-col gap-y-6 items-center justify-center fixed inset-0">
        <p className="text-3xl font-semibold">404</p>
        <p className="text-xl">چنین صفحه ای پیدا نشد!</p>
        <Link href="/">
          <Button color="primary">بازگشت به صفحه اصلی</Button>
        </Link>
      </div>
    </>
  );
}
