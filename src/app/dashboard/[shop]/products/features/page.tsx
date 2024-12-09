import Features from "@/components/Dashboard/Products/Features/Features";

export default async function Page({ params }) {
  const { shop } = await params;

  return (
    <>
      <Features shopId={shop} />
    </>
  );
}
