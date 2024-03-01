import React from "react";
import { findInArray } from "../hooks/findInArray";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

interface DropdownFilterListProps {
  list: string[];
  name: string;
}

function DropdownFilterList({ list, name }: DropdownFilterListProps) {

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["all"]));

  //   const selectedValue = React.useMemo(
  //     () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
  //     [selectedKeys]
  //   );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys]
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
          {/* {selectedValue.find((e) => e === "all") && selectedValue.length === 1
            ? `${name}`
            : selectedValue.filter((e) => e !== "all").join(", ")} */}
          {name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="all">Tout</DropdownItem>
        {list.map((e: string) => {
          return <DropdownItem key={e}>{e}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropdownFilterList;
