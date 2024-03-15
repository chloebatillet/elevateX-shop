import { Button, Link } from "@nextui-org/react";
import Wrapper from "../Components/Wapper.tsx";
import { useLocation } from "react-router-dom";

function CheckoutFailed() {
  let location = useLocation();
  const { message } = location.state;

  return (
    <Wrapper marginTop="250px">
      <div className="text-xl flex flex-col items-center gap-2">
        <h1 className="font-bold">Echec lors de la transaction</h1>
        <div>{message}</div>
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

export default CheckoutFailed;
