import DashboardPage from "@/components/Dashboard/DashboardPage";

export default async function Page({ params }) {
  const { shop } = await params;

  return (
    <>
      <DashboardPage />
    </>
  );
}
