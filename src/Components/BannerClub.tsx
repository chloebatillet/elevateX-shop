import { Button } from "@nextui-org/react";

function BannerClub() {
  return (
    <>
      <div
        className="flex flex-row bg-slate-900 text-[#eee] my-12 relative"
      >
        <div
          className="bg-slate-800 font-bold text-violet-500 uppercase rotate-1 absolute -top-3 overflow-hidden"
          style={{ width: "-webkit-fill-available" }}
        >
          membersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonly
        </div>
        <div
          className="w-1/3"
          style={{
            background: 'url("/otherImages/join-club-banner.jpg")',
            backgroundSize: "cover",
            backgroundPositionY: "bottom",
          }}
        ></div>
        <div className="flex flex-col gap-6 items-start justify-center text-xl text-start py-10 px-10">
          <p>
            Plongez dans le futur de la mode avec nos
            <span className="font-bold"> sneakers exclusives</span>.
          </p>
          <p>Rejoins-nous maintenant.</p>
          <Button
            radius="full"
            className="uppercase bg-violet-500 font-bold text-[#eee]"
          >
            Rejoins-nous !
          </Button>
        </div>
        <div
          className="bg-slate-800 font-bold text-violet-500 uppercase rotate-1 absolute -bottom-3 overflow-hidden"
          style={{ width: "-webkit-fill-available" }}
        >
          membersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonlymembersonly
        </div>
      </div>
    </>
  );
}

export default BannerClub;
