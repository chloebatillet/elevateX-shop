import { Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import MapStores from "./MapStores";

function FormDeliveryDetailsShop() {
  const magasins = [
    {
      name: "Paris Nation",
      city: "Paris",
      address: "21-25 Cr de Vincennes",
      postCode: "75020",
      country: "France",
      geocode: [48.84839656183176, 2.40141121688303],
    },
    {
      name: "Paris Les Halles",
      city: "Paris",
      address: "230 Rue Rambuteau",
      postCode: "75001",
      country: "France",
      geocode: [48.8620388832777, 2.3475837782348554],
    },
    {
      name: "Paris Opéra",
      city: "Paris",
      address: "10 Pl. de l'Opéra",
      postCode: "75009",
      country: "France",
      geocode: [48.87093889083004, 2.332252220904064],
    },
  ];
  const [city, setCity] = useState<
    | {
        city: string;
        name: string;
        address: string;
        postCode: string;
        country: string;
        geocode: number[]
      }
    | undefined
  >(undefined);

  return (
    <div className="grid grid-cols-1 gap-2">
      <Select
        size="sm"
        items={magasins}
        label="Choisissez un magasin"
        placeholder="Ville"
        className="max-w-xs justify-self-start"
        onChange={(e) => {
          setCity(magasins.find((el) => el.name === e.target.value));
        }}
      >
        {magasins.map((e) => {
          return (
            <SelectItem key={e.name} value={e.name}>
              {e.name}
            </SelectItem>
          );
        })}
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {city && (
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              size="sm"
              required
              label="Adresse"
              value={city?.address}
              isReadOnly
            ></Input>
            <Input
              type="text"
              size="sm"
              required
              label="Code postal"
              value={city?.postCode}
              isReadOnly
            ></Input>
            <Input
              type="text"
              size="sm"
              required
              label="Ville"
              value={city?.city}
              isReadOnly
            ></Input>
            <Input
              type="text"
              size="sm"
              required
              label="Pays"
              value={city?.country}
              isReadOnly
            ></Input>
          </div>
        )}

        {city && <MapStores geocode={city?.geocode} />}
      </div>
    </div>
  );
}

export default FormDeliveryDetailsShop;
