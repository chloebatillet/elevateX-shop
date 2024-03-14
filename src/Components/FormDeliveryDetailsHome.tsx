import { Input } from "@nextui-org/react";

function FormDeliveryDetailsHome() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Input
        type="text"
        size="sm"
        name="deliveryAddress"
        // required
        // isRequired
        label="Adresse"
        className="grid-cols-subgrid col-span-2"
      ></Input>
      <Input
        type="text"
        size="sm"
        name="deliveryComplement"
        label="Complement"
        className="grid-cols-subgrid col-span-2"
      ></Input>
      <Input
        type="text"
        size="sm"
        name="deliveryPostcode"
        // required
        // isRequired
        label="Code postal"
      ></Input>
      <Input
        type="text"
        size="sm"
        name="deliveryCity"
        // required
        // isRequired
        label="Ville"
      ></Input>
      <Input
        type="text"
        size="sm"
        name="deliveryCountry"
        // required
        // isRequired
        label="Pays"
        className="grid-cols-subgrid col-span-2 mb-4"
      ></Input>
    </div>
  );
}

export default FormDeliveryDetailsHome;
