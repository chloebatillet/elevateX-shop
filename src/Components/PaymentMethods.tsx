import { Divider, Image } from "@nextui-org/react";

function PayementMethods() {
  const paymentAccepted = [
    "american-express",
    "carte-bancaire",
    "mastercard",
    "paypal",
    "visa",
  ];

  return (
    <div className="mx-2">
      <Divider className="my-2" />
      <h2 className="text-lg">Méthodes de paiement acceptées</h2>

      <div className="flex flex-wrap gap-2 mt-2">
        {paymentAccepted.map((e) => {
          return (
            <Image
              key={e}
              radius="none"
              src={`/paymentSvg/icon-${e}.svg`}
              title={e}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PayementMethods;
