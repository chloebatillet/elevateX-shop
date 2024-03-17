import { ReactElement } from "react";

interface WrapperProps {
  children: ReactElement[];
  marginTop?: string;
  marginBottom?: string;
}

function Wapper({ children, marginTop, marginBottom }: WrapperProps) {
  return (
    <div
      className="wrapper w-full"
      style={{
        margin: "auto",
        maxWidth: "1000px",
        marginTop: `${marginTop}`,
        marginBottom: `${marginBottom}`,
        minHeight: `calc(100vh - ${marginTop} - 48px)`,
      }}
    >
      {children}
    </div>
  );
}

export default Wapper;
