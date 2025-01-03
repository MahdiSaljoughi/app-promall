import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center fixed inset-0">
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
