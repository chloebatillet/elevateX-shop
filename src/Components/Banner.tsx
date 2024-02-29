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

  useEffect(() => {
    setMessage(messages[index]);
  }, [index]);

  return <div className="bg-black text-[#eee] text-sm p-1">{message}</div>;
}

export default Banner;
