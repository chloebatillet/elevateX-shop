import DropdownFilterList from "./DropdownFilterList";

import prod from "../assets/products.json";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Slider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  slug: string;
  description: string;
  composition: string;
  entretien: string;
  colour: string[];
  collection: string;
  images: string[];
}

interface FilterProps {
  productsList: Product[];
  setProductsList: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        title: string;
        price: number;
        slug: string;
        description: string;
        composition: string;
        entretien: string;
        images: string[];
      }[]
    >
  >;
}

/* FILTERS DATA ---------------------- */
const ordered_prices = [
  ...new Set(
    prod.products
      .map((item) => item.price)
      .sort(function (a, b) {
        return a - b;
      })
  ),
];

const ordered_likes = [
  ...new Set(
    prod.products
      .map((item) => item.likes)
      .sort(function (a, b) {
        return b - a;
      })
  ),
];

const allColours = [
  ...new Set(
    prod.products
      .map((item) => item.colour)
      .flat()
      .sort()
  ),
];

const allCollections = [
  ...new Set(prod.products.map((item) => item.collection).sort()),
];

const allSizes = [
  ...new Set(
    prod.products.flatMap((item) =>
      item["size-range"].map((el) => el.toString())
    )
  ),
];

function Filters() {
  const [maxPrice, setMaxPrice] = useState(0);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div
      className="flex flex-row items-center gap-4 mb-10 px-4 py-2 border border-slate-200 rounded"
      style={{ justifyContent: "space-between" }}
    >
      <div className="flex gap-2">
        <DropdownFilterList list={allCollections} name={"Collections"} />
        <DropdownFilterList list={allColours} name="Couleurs" />
        <DropdownFilterList list={allSizes} name="Pointure" />

        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              variant={maxPrice > 0 ? "solid" : "bordered"}
              className="capitalize border rounded"
              color="default"
            >
              Prix
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="my-3">
              <Slider
                step={50}
                minValue={0}
                maxValue={1000}
                defaultValue={maxPrice}
                color="foreground"
                formatOptions={{ style: "currency", currency: "EUR" }}
                className="w-36"
                classNames={{
                  track: "h-1",
                  filler: "bg-slate-900",
                  thumb: "bg-slate-900 w-3 h-3 after:h-0",
                }}
                onChangeEnd={setMaxPrice}
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <p>{0}€</p>
                <p>{maxPrice}€</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="capitalize border rounded"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              }
            >
              Trier
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="text">Prix croissant</DropdownItem>
            <DropdownItem key="number">Prix décroissant</DropdownItem>
            <DropdownItem key="date">Populaires</DropdownItem>
            <DropdownItem key="single_date">Nouveauté</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Filters;
