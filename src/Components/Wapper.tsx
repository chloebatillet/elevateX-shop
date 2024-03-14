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
        // minHeight: "100vh"
      }}
    >
      {children}
    </div>
  );
}

export default Wapper;
