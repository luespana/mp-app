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
  const [price, setPrice] = useState(50);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleInvitation = async () => {
      try {
        setLoading(true);
        const response = await axios.post(URL + "/api/checkout", {
          amount: price,
        });
        setUrl(response.data.url);
        console.log(response.data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    handleInvitation();
  }, [price]);
  return (
    <main className={poppins.className}>
      <div className="flex items-center flex-col justify-center h-screen md:gap-4 p-4">
        <div className="text-3xl md:text-5xl">Invitame un Cafecito</div>
        <Coffee size={50} weight="fill" />
        <div className="flex gap-4">
          <button
            className={`rounded-2xl p-2 text-sm md:text-xl ${
              price === 50 ? "bg-green-100" : "bg-orange-100"
            }`}
            onClick={() => {
              setPrice(50);
            }}
          >
            Invitar $50
          </button>
          <button
            className={`rounded-2xl p-2 text-sm md:text-xl ${
              price === 100 ? "bg-green-100" : "bg-orange-100"
            }`}
            onClick={() => {
              setPrice(100);
            }}
          >
            Invitar $100
          </button>
          <button
            className={`rounded-2xl p-2 text-sm md:text-xl ${
              price === 200 ? "bg-green-100" : "bg-orange-100"
            }`}
            onClick={() => {
              setPrice(200);
            }}
          >
            Invitar $200
          </button>
        </div>
        <a
          href={url}
          target="_blank"
          className="rounded-xl bg-blue-400 py-2 w-1/4 text-center mt-4 text-white"
        >
          {loading ? "Cargando" : "Pagar"}
        </a>
      </div>
    </main>
  );
}
