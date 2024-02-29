import { ArrowPathIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { TruckIcon } from "@heroicons/react/24/outline";

function TrustBanner() {
  return (
    <div className="bg-black text-[#eee] grid sm:grid-cols-3 grid-cols-1 gap-6 sm:gap-0 place-content-center h-auto text-lg py-6">
      <div className="h-full w-full">
        <TruckIcon className="w-full h-12" />
        Expédition sous 48h
      </div>
      <div className="h-full w-full">
        <ArrowPathIcon className="w-full h-12" />
        Satisfait ou remboursé
      </div>
      <div className="h-full w-full">
        <CreditCardIcon className="w-full h-12" />
        Paiement 3D secure
      </div>
    </div>
  );
}

export default TrustBanner;
