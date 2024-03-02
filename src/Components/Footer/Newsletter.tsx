import { Input } from "@nextui-org/react";
import { useState } from "react";

function NewsletterForm() {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Vous recevrez désormais notre newsletter !");
      }}
      className="flex flex-col items-start justify-start text-start mb-4"
    >
      <p className="text-sm mb-2">
        Envie de suivre notre actualités ? Abonnez-vous à notre newsletter :
      </p>
      <Input
        type="email"
        placeholder="Enter your email"
        value={value}
        onValueChange={setValue}
        className="max-w-[220px]"
        size={undefined}
        isClearable
        isRequired
      />
    </form>
  );
}

export default NewsletterForm;
