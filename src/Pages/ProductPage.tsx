import { useParams } from "react-router-dom";
import Wrapper from "../Components/Wapper";
import { Accordion, AccordionItem, Button, Divider, Image } from "@nextui-org/react";

import prod from "../assets/products.json";
import { findItem } from "../hooks/findItem";
import { useEffect, useState } from "react";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import ProductCard from "../Components/ProductCard";

function ProductPage() {
  const { slug } = useParams();
  const [indexImg, setIndexImg] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(null);
  const [suggestions, setSuggestions] = useState([{}]);

  const item = findItem(prod.products, "slug", slug);

  useEffect(() => {
    //scrollTo({top:0})

    const list = prod.products.filter((e) => {
      return e.slug !== slug;
    });

    const randomIndexArr: [] = [];

    for (let i = 0; i < 4; i++) {
      let id: never | number = Math.floor(Math.random() * (list.length + 1));
      randomIndexArr.push(id);
    }

    const newList = list.filter((_, index: number) => {
      return randomIndexArr.includes(index);
    });
    console.log(newList);

    setSuggestions(newList);
  }, []);

  return (
    <Wrapper marginTop="150px" marginBottom="50px">
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Gallerie */}
        <div>
          <Image
            radius="none"
            src={`../../public/productImg/${item.slug}/${item.images[indexImg]}`}
          />
          <div className="grid grid-cols-4 mt-2 gap-1">
            {item.images.map((e: string, index: number) => {
              return (
                <Image
                  key={e}
                  radius="none"
                  src={`../../public/productImg/${item.slug}/${e}`}
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
          <h2 className="font-bold text-4xl">{item.title}</h2>
          <h3 className="text-2xl">{item.collection}</h3>
          <p className="mb-6">{item.price}€</p>
          <p>{item.description}</p>

          {/* Pointures */}
          <div className="grid grid-cols-5 product-card-sizes bg-slate-50/[.7] w-full text-start transition-all z-10 mt-12">
            {item["size-range"].map((e, index) => {
              let found = item["size-available"].includes(e);

              return (
                <div
                  key={e + index}
                  className={
                    sizeSelected === e
                      ? "bg-slate-500 text-center text-white cursor-pointer"
                      : found
                      ? "text-center hover:bg-slate-100 cursor-pointer"
                      : "text-center text-slate-400 line-through decoration-1 cursor-default"
                  }
                  onClick={() => setSizeSelected(e)}
                >
                  {e}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="w-full border grid grid-cols-1 sm:grid-cols-2 my-12 sticky top-0 bottom-0 z-20">
            <Button
              radius="none"
              variant="light"
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
              furniture but woefully miscalibrate and bellyflop onto the floor;
              what's your problem? i meant to do that now i shall wash myself
              intently, yet eat a plant, kill a hand. All of a sudden cat goes
              crazy take a big fluffing crap ðŸ’©. Burrow under covers get poop
              stuck in paws jumping out of litter box and run around the house
              scream meowing and smearing hot cat mud all over or woops poop
              hanging from butt must get rid run run around house drag poop on
              floor maybe it comes off woops left brown marks on floor human
              slave clean lick butt now yet hiss and stare at nothing then run
              suddenly away.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Divider className="mt-12 mb-6" />
      <div className="text-start">
        <h4 className="text-xl font-bold mb-3 ml-2">Vous aimerez aussi...</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {suggestions.length > 1 &&
            suggestions.map((p, index) => {
              //return <p>{p.title}</p>
              return <ProductCard key={index} {...p} />;
            })}
        </div>
      </div>
    </Wrapper>
  );
}

export default ProductPage;
