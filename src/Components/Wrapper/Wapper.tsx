import { ReactElement } from "react";
import "./styles.css";

interface WrapperProps {
  children: ReactElement[];
}

function Wapper({ children }: WrapperProps) {
  return <div className="wrapper">{children}</div>;
}

export default Wapper;
