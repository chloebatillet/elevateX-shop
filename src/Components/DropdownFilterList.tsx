/* eslint-disable */

import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { findInArray } from "../hooks/findInArray";
import { useState, useMemo } from "react";

interface DropdownFilterListProps {
  list: string[];
  name: string;
}

function DropdownFilterList({ list, name }: DropdownFilterListProps) {
  const [selectedKeysArr, setSelectedKeysArr] = useState(new Set([]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeysArr),
    [selectedKeysArr]
  );

  const found = findInArray(selectedValue, list);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant={found ? "solid" : "bordered"}
          className="capitalize border rounded"
          color="default"
        >
          {name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeysArr}
        // onSelectionChange={setSelectedKeysArr}
        onSelectionChange={(keys: any) => {
          setSelectedKeysArr(keys);
        }}
      >
        {list.map((e: string) => (
          <DropdownItem
            key={e}
            startContent={
              name === "Couleurs" && (
                <div className="flex items-center">
                  <div
                    className="w-6 h-6 border"
                    style={{ background: `${e}` }}
                  ></div>
                </div>
              )
            }
          >
            {e}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownFilterList;
