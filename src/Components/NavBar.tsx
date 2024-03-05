import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Badge,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";

import ModalTemplate from "./ModalTemplate";

import logo from "/favicon.ico";
import UserIcon from "./Icons/UserIcon";
import CartIcon from "./Icons/CartIcon";
import PopoverCart from "./CartContent";
import { useAppSelector } from "../hooks/redux";

function NavBar() {
  const menuItems = [
    {
      name: "shop",
      url: "/shop",
    },
    {
      name: "prochainement",
      url: "/prochainement",
    },
    {
      name: "promotions",
      url: "/promotions",
    },
    {
      name: "club",
      url: "/club",
    },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { content } = useAppSelector((state) => state.cart);

  return (
    <>
      <Navbar isBordered position="static" shouldHideOnScroll={true}>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand as={Link} href={"/"}>
            <img src={logo} alt="logo ElevateX" />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand as={Link} href={"/"}>
            <img src={logo} alt="logo ElevateX" />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
          {menuItems.map((el) => {
            return (
              <NavbarItem key={el.name} /*isActive*/>
                <Link
                  className="capitalize"
                  href={el.url}
                  aria-current="page"
                  color={
                    el.name === ""
                      ? "secondary"
                      : el.name === "promotions"
                      ? "danger"
                      : "foreground"
                  }
                >
                  {el.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              // color="secondary"
              href="#"
              variant="light"
              isIconOnly
              onPress={onOpen}
            >
              <UserIcon />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Popover
              key="opaque"
              offset={20}
              placement="bottom"
              backdrop="transparent"
            >
              <PopoverTrigger>
                <Button variant="light" isIconOnly>
                  <Badge
                    color="danger"
                    content={content.length}
                    shape="circle"
                    showOutline={false}
                    size="sm"
                  >
                    <CartIcon />
                  </Badge>
                </Button>
              </PopoverTrigger>

              {/* Contenu du panier  */}
              <PopoverContent className="rounded w-64">
                {content.length ? (
                  <PopoverCart />
                ) : (
                  <div className="grid grid-cols-1 justify-items-center text-center p-2 m-2">
                    <p className="">Votre panier est vide</p>
                    <Link
                      href="/shop"
                      className="text-xs text-slate-500 underline"
                    >
                      Commencer vos achats
                    </Link>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  item.name === "shop"
                    ? "secondary"
                    : item.name === "promotions"
                    ? "danger"
                    : "foreground"
                }
                href={item.url}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <ModalTemplate isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default NavBar;
