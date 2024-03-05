import CartContent from "../Components/CartContent";
import Wrapper from "../Components/Wapper";

function Basket() {
  return (
    <>
      <Wrapper marginTop="150px" marginBottom="50px">
        <section className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <CartContent />
          </div>

          <div>
            <div>Info livraison</div>
            <div>Info paiement</div>
          </div>
        </section>
      </Wrapper>
      <div>Bandeau confiance</div>
    </>
  );
}

export default Basket;
