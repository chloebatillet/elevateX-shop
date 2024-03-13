import { Button, Input } from "@nextui-org/react";
import { DeliveryDetails } from "../@types";

function FormDeliveryDetailsHome({
  setDeliveryDetails,
}: {
  setDeliveryDetails: React.Dispatch<
    React.SetStateAction<DeliveryDetails | undefined>
  >;
}) {
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fd = Object.fromEntries(formData.entries());
    console.log(fd);

    setDeliveryDetails(fd);
  };

  return (
    <form
      id="deliveryDetails"
      className="grid grid-cols-2 gap-2"
      onSubmit={(e) => submitForm(e)}
    >
      <Input
        type="text"
        size="sm"
        name="deliveryAddress"
        required
        isRequired
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
        required
        isRequired
        label="Code postal"
      ></Input>
      <Input type="text" size="sm" required isRequired label="Ville"></Input>
      <Input
        type="text"
        size="sm"
        name="deliveryCountry"
        required
        isRequired
        label="Pays"
        className="grid-cols-subgrid col-span-2 mb-4"
      ></Input>

      <Button
        type="submit"
        value="Enregistrer"
        className="rounded bg-slate-900 text-slate-50"
      >
        Enregistrer
      </Button>
    </form>
  );
}

export default FormDeliveryDetailsHome;
