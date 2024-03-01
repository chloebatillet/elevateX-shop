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

import logo from "../../public/favicon.ico";
import UserIcon from "./Icons/UserIcon";
import CartIcon from "./Icons/CartIcon";

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

  return (
    <>
      <Navbar isBordered>
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
              <NavbarItem /*isActive*/>
                <Link
                  key={el.name}
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
              color="secondary"
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
                <Button
                  // as={Link}
                  color="secondary"
                  // href="/cart"
                  variant="light"
                  isIconOnly
                >
                  <Badge
                    color="danger"
                    content={2}
                    shape="circle"
                    showOutline={false}
                    size="sm"
                  >
                    <CartIcon />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Popover Content</div>
                  <div className="text-tiny">This is the popover content</div>
                  <Button
                    as={Link}
                    color="secondary"
                    href="/cart"
                    variant="flat"
                  >
                    Commander
                  </Button>
                </div>
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
