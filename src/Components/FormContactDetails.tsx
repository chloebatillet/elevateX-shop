import { Button, Input } from "@nextui-org/react";
import { ContactDetails } from "../@types";

function FormContactDetails({
  setContactDetails,
}: {
  setContactDetails: React.Dispatch<
    React.SetStateAction<ContactDetails | undefined>
  >;
}) {
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fd = Object.fromEntries(formData.entries());
    console.log(fd);

    
    setContactDetails(fd);
  };

  return (
    <form
      id="contactDetails"
      className="grid grid-cols-2 gap-2"
      onSubmit={(e) => submitForm(e)}
    >
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
        name="clientAddress"
        label="Adresse"
        className="grid-cols-subgrid col-span-2 mt-4"
      ></Input>
      <Input
        type="number"
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
        /*required isRequired*/ label="Ville"
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
        /*required isRequired*/
        label="Email"
      ></Input>
      <Input
        type="number"
        name="clientTelephone"
        size="sm"
        label="Téléphone"
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

export default FormContactDetails;
