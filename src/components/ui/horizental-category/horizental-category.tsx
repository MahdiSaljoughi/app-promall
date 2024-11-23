"use client";

import { CheckboxGroup } from "@nextui-org/react";
import React from "react";
import { CustomCheckbox } from "./custom-checkbox/custom-checkbox";

const HorizontalCategory: React.FC = () => {
  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);

  return (
    <div className="w-full overflow-x-auto no-scrollbar" dir="ltr">
      <div className="flex gap-5 whitespace-nowrap px-5 mt-3 justify-center">
        <CheckboxGroup
          orientation="horizontal"
          className="flex-none "
          value={groupSelected}
          onChange={setGroupSelected}
        >
          <CustomCheckbox value="wifi">مردونه</CustomCheckbox>
          <CustomCheckbox value="tv">زنونه</CustomCheckbox>
          <CustomCheckbox value="kitchen">کفش</CustomCheckbox>
          <CustomCheckbox value="parking">ساعت</CustomCheckbox>
          <CustomCheckbox value="pool">عطر</CustomCheckbox>
        </CheckboxGroup>
      </div>
    </div>
  );
};

export default HorizontalCategory;
