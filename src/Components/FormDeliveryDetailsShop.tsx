import { Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

function FormDeliveryDetailsShop() {
  const magasins = [
    {
      name: "Paris Nation",
      city: "Paris",
      address: "21-25 Cr de Vincennes",
      postCode: "75020",
      country: "France",
    },
    {
      name: "Paris Les Halles",
      city: "Paris",
      address: "230 Rue Rambuteau",
      postCode: "75001",
      country: "France",
    },
    {
      name: "Paris Opéra",
      city: "Paris",
      address: "10 Pl. de l'Opéra",
      postCode: "75009",
      country: "France",
    },
  ];
  const [city, setCity] = useState<
    | {
        city: string;
        name: string;
        address: string;
        postCode: string;
        country: string;
      }
    | undefined
  >(undefined);

  return (
    <div className="grid grid-cols-2 gap-2">
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

      {city && (
        <>
          <Input
            type="text"
            size="sm"
            required
            label="Adresse"
            className="grid-cols-subgrid col-span-2"
            value={city?.address}
            isReadOnly
          ></Input>
          <Input
            type="text"
            size="sm"
            required
            isRequired
            label="Code postal"
            value={city?.postCode}
            isReadOnly
          ></Input>
          <Input
            type="text"
            size="sm"
            required
            isRequired
            label="Ville"
            value={city?.city}
            isReadOnly
          ></Input>
          <Input
            type="text"
            size="sm"
            required
            isRequired
            label="Pays"
            value={city?.country}
            isReadOnly
            className="grid-cols-subgrid col-span-2 mb-4"
          ></Input>
        </>
      )}
    </div>
  );
}

export default FormDeliveryDetailsShop;
