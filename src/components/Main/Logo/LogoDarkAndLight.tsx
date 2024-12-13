import Image from "next/image";

export default function LogoDarkAndLight() {
  return (
    <>
      <Image
        src={"/assets/logo/logo-b.png"}
        alt="لوگو پرومال"
        className="w-12 block dark:hidden"
        width={1000}
        height={1000}
      />
      <Image
        src={"/assets/logo/logo.png"}
        alt="لوگو پرومال"
        className="w-12 hidden dark:block"
        width={1000}
        height={1000}
      />
    </>
  );
}
