import { Tab, Tabs } from "@nextui-org/react";
import { MapPinIcon, PackageSearch } from "lucide-react";

export default function OrderStepper() {
  return (
    <>
      <div className="flex w-full flex-row" dir="ltr">
        <div className="flex w-full flex-col mt-10 mb-3">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-32 w-full relative rounded-none p-0 border-b border-divider flex justify-center items-center",
              cursor: "w-full bg-[#22d3ee]",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#06b6d4]",
            }}
          >
            <Tab
              key="photos"
              title={
                <div className="flex items-center space-x-2 text-base">
                  <span>کد رهگیری</span>
                  <PackageSearch />
                </div>
              }
            />
            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2 font-bold text-base">
                  <span>اطلاعات</span>
                  <MapPinIcon />
                </div>
              }
            />
          </Tabs>
        </div>
      </div>
    </>
  );
}
