import Banner from "./Banner";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="flex flex-col fixed top-0 left-0 right-0 z-50">
      <Banner
        messages={[
          "Livraison gratuite en France métropolitaine pour les commandes de plus de 150€",
          "Avantages exclusifs en rejoignant le club !",
        ]}
      />
        <NavBar />
    </header>
  );
}

export default Header;
