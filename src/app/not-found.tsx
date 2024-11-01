import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="min-h-[900px] flex flex-col gap-y-4 items-center justify-center">
        <div>
          <span>404</span>
          <span>چنین صفحه ای پیدا نشد!</span>
        </div>
        <Link href="/" className="block text-blue-500">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </>
  );
}
