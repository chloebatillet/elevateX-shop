import { ReactElement } from "react";

interface WrapperProps {
  children: ReactElement[];
}

function Wapper({ children }: WrapperProps) {
  return <div className="wrapper w-full" style={{margin: "auto", maxWidth: "1000px"}}>{children}</div>;
}

export default Wapper;
