import { useEffect, useState } from "react";

interface BannerProps {
  messages: string[];
}
function Banner({ messages }: BannerProps) {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState(messages[index]);

  const changeMessage = () => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
    }, 2000);

    document.addEventListener("mouseleave", () => clearInterval(interval));
  };

  document.addEventListener("mouseenter", () => changeMessage());

  window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      document.querySelector("#banner").style.position = "absolute";
      document.querySelector("#banner").style.top = "-50px";
    } else {
      document.querySelector("#banner").style.position = "relative";
      document.querySelector("#banner").style.top = "0";
    }
  });

  useEffect(() => {
    setMessage(messages[index]);
  }, [index]);

  return (
    <div
      id="banner"
      className="bg-black text-[#eee] text-sm p-1 w-full"
    >
      {message}
    </div>
  );
}

export default Banner;
