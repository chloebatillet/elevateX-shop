import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

import Wrapper from "../Components/Wapper";
import ProductCard from "../Components/ProductCard";
import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
  Image,
  Link as NextLink,
} from "@nextui-org/react";

import { findItem } from "../hooks/findItem";
import {
  HeartIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Product } from "../@types";
import { addToCart } from "../store/reducers/cartReducer";

function ProductPage() {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const [indexImg, setIndexImg] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(0);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const productList = useAppSelector((state) => state.products.list);
  const [alert, setAlert] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const item: Product = findItem(productList, "slug", slug);

  useEffect(() => {
    // scrollTo({ top: 0 });

    const list: Product[] = productList.filter((e: Product) => {
      return e.slug !== slug;
    });

    const randomIndexArr: number[] = [];

    for (let i = 0; i < 4; i++) {
      const id: number = Math.floor(Math.random() * (list?.length + 1));
      randomIndexArr.push(id);
    }

    const newList: Product[] = list.filter((_, index: number) => {
      return randomIndexArr.includes(index);
    });

    setSuggestions(newList);
  }, [slug]);

  const handleAddToCart = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (sizeSelected === 0) {
      setAlert("Veuillez sélectionner votre taille");
      return;
    }

    dispatch(
      addToCart({
        model: item.slug,
        size: sizeSelected,
        price: item.price,
      })
    );

    setIsPopoverOpen(true);
  };

  return (
    <>
      <Wrapper marginTop="150px" marginBottom="50px">
        <Breadcrumbs className="mb-3">
          <BreadcrumbItem>
            <Link to={"/shop"}>Shop</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{item.title}</BreadcrumbItem>
        </Breadcrumbs>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Gallerie */}
          <div>
            <Image
              radius="none"
              src={`/productImg/${item.slug}/${item.images[indexImg]}`}
            />
            <div className="grid grid-cols-4 mt-2 gap-1">
              {item.images.map((e: string, index: number) => {
                return (
                  <Image
                    key={e}
                    radius="none"
                    src={`/productImg/${item.slug}/${e}`}
                    className={
                      index === indexImg
                        ? "border brightness-50"
                        : "hover:border hover:brightness-50"
                    }
                    onClick={() => setIndexImg(index)}
                    onMouseEnter={() => setIndexImg(index)}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col text-start">
            <h2 className="font-bold text-4xl mx-2 sm:mx-0">{item.title}</h2>
            <h3 className="text-2xl mx-2 sm:mx-0">{item.collection}</h3>
            <p className="mb-6 mx-2 sm:mx-0">{item.price}€</p>
            <p className="mx-2 sm:mx-0">{item.description}</p>

            {/* Pointures */}
            <form
              id="add-to-cart"
              className="grid grid-cols-5 product-card-sizes bg-slate-50/[.7] w-full text-start transition-all z-10 mt-12"
            >
              {item["size-range"].map((e, index) => {
                let found = item["size-available"].includes(e);

                return (
                  <input
                    key={e + index}
                    type="button"
                    className={
                      sizeSelected === e
                        ? "bg-slate-500 text-center text-white cursor-pointer"
                        : found
                        ? "text-center hover:bg-slate-100 cursor-pointer"
                        : "text-center text-slate-400 line-through decoration-1 cursor-default"
                    }
                    onChange={() => setSizeSelected(e)}
                    onClick={() => setSizeSelected(e)}
                    value={e}
                    form="add-to-cart"
                  ></input>
                );
              })}
            </form>

            {/* Alerte error */}
            <p className="w-full text-red-500">{alert}</p>

            {/* CTA */}
            <div className="w-full border grid grid-cols-1 sm:grid-cols-2 my-12 sticky top-0 bottom-0 z-40">
              <Button
                radius="none"
                startContent={<HeartIcon className="h-6" />}
                className="border-0 bg-white hover:text-white hover:bg-slate-900"
              >
                Ajouter aux favoris
              </Button>

              <Button
                radius="none"
                variant="solid"
                startContent={<ShoppingCartIcon className="h-6" />}
                className="border-0 text-white bg-slate-900"
                onSubmit={(e) => handleAddToCart(e)}
                onClick={(e) => handleAddToCart(e)}
                type="submit"
                form="add-to-cart"
              >
                Ajouter au panier
              </Button>
            </div>

            {/* Accordeons */}
            <Accordion selectionMode="multiple">
              <AccordionItem key="1" aria-label="Accordion 1" title="Entretien">
                {item.entretien}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 1"
                title="Guide des tailles"
              >
                Cat ipsum dolor sit amet, howl uncontrollably for no reason for
                white cat sleeps on a black shirt ask for petting experiences
                short bursts of poo-phoria after going to the loo. Meow in empty
                rooms inspect anything brought into the house, but spread kitty
                litter all over house sweet beast, yet attempt to leap between
                furniture but woefully miscalibrate and bellyflop onto the
                floor; what's your problem? i meant to do that now i shall wash
                myself intently, yet eat a plant, kill a hand. All of a sudden
                cat goes crazy take a big fluffing crap ðŸ’©. Burrow under
                covers get poop stuck in paws jumping out of litter box and run
                around the house scream meowing and smearing hot cat mud all
                over or woops poop hanging from butt must get rid run run around
                house drag poop on floor maybe it comes off woops left brown
                marks on floor human slave clean lick butt now yet hiss and
                stare at nothing then run suddenly away.
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <Divider className="mt-12 mb-6 border" />

        {/* Recommandations */}
        <div className="text-start">
          <h4 className="text-xl font-bold mb-3 ml-2">Vous aimerez aussi...</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {suggestions.length > 1 &&
              suggestions.map((p: Product, index: number) => {
                return (
                  <ProductCard
                    key={index}
                    title={p.title}
                    price={p.price}
                    slug={p.slug}
                    likes={p.likes}
                    images={p.images}
                    size-range={p["size-range"]}
                    size-available={p["size-available"]}
                  />
                );
              })}
          </div>
        </div>
      </Wrapper>

     {isPopoverOpen && <div
        style={{ boxShadow: "0 0 18px #999" }}
        className="z-50 w-full bg-slate-900/30 fixed bottom-0 h-screen"
      >
        <aside className="h-2/3 absolute bottom-0">
          <button
            type="button"
            className="absolute -top-5 right-0 h-10 w-10 border border-slate-900 bg-slate-50 hover:bg-slate-900 hover:text-slate-50"
            onClick={() => setIsPopoverOpen(false)}
          >
            <XMarkIcon className="" />
          </button>
          <div className="bg-slate-50 grid grid-cols-1 h-full overflow-y-auto gap-6 px-2 py-6">
            <p className="text-3xl font-bold text-start">Ajouté au panier !</p>

            <div className="grid grid-cols-5 gap-6">
              <Image
                radius="none"
                src={`/productImg/${item.slug}/${item.images[0]}`}
                className="bg-slate-500 col-span-1"
              />
              <div className="text-start col-span-2 ">
                <p className="text-3xl font-semibold">{item.title}</p>
                <p className="text-xl">{sizeSelected}</p>
                <p className="text-2xl">{item.price}€</p>
              </div>
            </div>

            <div>
              <Button
                radius="none"
                className="border border-slate-900 bg-white text-xl w-full hover:text-white hover:bg-slate-900"
                onClick={() => setIsPopoverOpen(false)}
              >
                Poursuivre mes achats
              </Button>
              <Button
                as={NextLink}
                href="/cart"
                variant="flat"
                radius="none"
                className="border border-slate-900 bg-slate-900 text-xl text-slate-50 w-full"
              >
                Voir mon panier
              </Button>
            </div>

            {/* Recommandations */}
            <div className="text-start">
              <h4 className="text-xl font-bold mb-3">Vous aimerez aussi...</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {suggestions.length > 1 &&
                  suggestions.map((p: Product, index: number) => {
                    return (
                      <ProductCard
                        key={index}
                        title={p.title}
                        price={p.price}
                        slug={p.slug}
                        likes={p.likes}
                        images={p.images}
                        size-range={p["size-range"]}
                        size-available={p["size-available"]}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </aside>
      </div>}
    </>
  );
}

export default ProductPage;
