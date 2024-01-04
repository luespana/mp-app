import { Coffee } from "@phosphor-icons/react";
import axios from "axios";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { URL } from "./api/checkout";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Home() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const handleInvitation = async () => {
      try {
        const response = await axios.post(URL + "/api/checkout", {
          amount: 100,
        });
        setUrl(response.data.url);
      } catch (error) {
        console.error("Error", error);
      }
    };
    handleInvitation();
  }, []);
  return (
    <main className={poppins.className}>
      <div className="flex items-center flex-col p-20 gap-4">
        <div className="text-2xl">Invitame un Cafecito</div>
        <Coffee size={50} weight="fill" />
        <a className="rounded-2xl bg-slate-300 p-2 text-xl" href={url}>
          {url === "" ? "Cargando" : "Invitar $100"}
        </a>
      </div>
    </main>
  );
}
