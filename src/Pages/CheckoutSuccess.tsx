import { Button, Link } from "@nextui-org/react";
import Wrapper from '../Components/Wapper.tsx'


function CheckoutSuccess() {
  return (
    <Wrapper marginTop="250px">
      <div className="text-xl flex flex-col items-center gap-2">
        <h1 className="font-bold">Nous avons bien reçu votre paiement</h1>
        <div>Vous allez recevoir un mail de confirmation</div>
        <Button
          as={Link}
          href="/"
          className="bg-slate-900 text-slate-50 max-w-sm"
        >
          Retourner sur le site
        </Button>
      </div>
      <></>
    </Wrapper>
  );
}

export default CheckoutSuccess;
