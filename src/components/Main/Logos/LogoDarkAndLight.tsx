import Image from "next/image";

export default function LogoDarkAndLight({ width }: { width: number }) {
  return (
    <>
      <Image
        src={"/assets/logo/logo-b.png"}
        alt="لوگو پرومال"
        className={`w-${width} block dark:hidden`}
        width={1000}
        height={1000}
      />
      <Image
        src={"/assets/logo/logo.png"}
        alt="لوگو پرومال"
        className={`w-${width} hidden dark:block`}
        width={1000}
        height={1000}
      />
    </>
  );
}
