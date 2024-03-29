import { useState } from "react";

import DropdownFilterList from "./DropdownFilterList";
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

import prod from "../assets/products.json";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { filterPrice, order } from "../store/reducers/productsReducer";

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

const allColours = [
  ...new Set(
    prod.products
      .map((item) => item.colour)
      .flat()
      .sort()
  ),
];

const allCollections = [
  ...new Set(
    prod.products
      .map((item) => item.collection)
      .flat()
      .sort()
  ),
];

const allSizes = [
  ...new Set(
    prod.products.flatMap((item) =>
      item["size-range"].map((el) => el.toString())
    )
  ),
];

function Filters() {
  const dispatch = useAppDispatch();
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const { isFiltered } = useAppSelector((state) => state.products);

  return (
    <div
      className="flex flex-row items-center gap-4 mb-10 px-4 py-2 border border-slate-200 rounded"
      style={{ justifyContent: "space-between" }}
    >
      <div className="flex gap-2">
        {/* Collections */}
        <DropdownFilterList list={allCollections} name={"Collections"} />
        {/* Couleurs */}
        <DropdownFilterList list={allColours} name="Couleurs" />
        {/* Pointures */}
        <DropdownFilterList list={allSizes} name="Pointure" />

        {/* Prix */}
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              variant={
                maxPrice >= ordered_prices[0] && isFiltered
                  ? "solid"
                  : "bordered"
              }
              className="capitalize border rounded"
              color="default"
            >
              Prix
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="my-3">
              <Slider
                aria-label="slider-price"
                minValue={ordered_prices[0]}
                maxValue={Math.round(ordered_prices[ordered_prices.length - 1])}
                // defaultValue={maxPrice}
                color="foreground"
                formatOptions={{ style: "currency", currency: "EUR" }}
                className="w-36"
                classNames={{
                  track: "h-1",
                  filler: "bg-slate-900",
                  thumb: "bg-slate-900 w-3 h-3 after:h-0",
                }}
                onChange={(price: any) => {
                  setMaxPrice(price);
                }}
                onChangeEnd={(price: any) =>
                  dispatch(filterPrice(Math.round(price)))
                }
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <p>{ordered_prices[0]}€</p>
                <p>{maxPrice}€</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Trier */}
      <div>
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
            aria-label="Ordonner"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys: any) => {
              setSelectedKeys(keys);
              dispatch(order(keys.currentKey));
            }}
          >
            <DropdownItem key="priceUp">Prix croissant</DropdownItem>
            <DropdownItem key="priceDown">Prix décroissant</DropdownItem>
            <DropdownItem key="popularity">Populaires</DropdownItem>
            <DropdownItem key="newest">Nouveautés</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Filters;
