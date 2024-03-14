import { Input } from "@nextui-org/react";

function FormContactDetails() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Input
        type="text"
        size="sm"
        name="clientLastname"
        /*required isRequired*/ label="Nom"
      ></Input>
      <Input
        type="text"
        size="sm"
        name="clientFirstname"
        /*required isRequired*/ label="Prénom"
      ></Input>
      <Input
        type="text"
        size="sm"
        // required
        // isRequired
        label="Adresse"
        className="grid-cols-subgrid col-span-2 mt-4"
      ></Input>
      <Input
        type="text"
        size="sm"
        name="clientPostcode"
        // required
        // isRequired
        label="Code postal"
      ></Input>
      <Input
        type="text"
        size="sm"
        name="clientCity"
        // required
        // isRequired
        label="Ville"
      ></Input>
      <Input
        type="text"
        size="sm"
        name="clientCountry"
        // required
        // isRequired
        label="Pays"
        className="grid-cols-subgrid col-span-2 mb-4"
      ></Input>
      <Input
        type="email"
        size="sm"
        name="clientEmail"
        // required
        // isRequired
        label="Email"
      ></Input>
      <Input
        type="telephone"
        size="sm"
        name="clientTelephone"
        label="Téléphone"
      ></Input>
    </div>
  );
}

export default FormContactDetails;
