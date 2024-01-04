import React from "react";

export default function success() {
  const url = "https://coffee-mp-app.vercel.app";
  return (
    <div className="flex items-center flex-col justify-center h-screen md:gap-4 p-4">
      <div className="text-3xl md:text-5xl">Gracias por tu cafecito!</div>
      <a
        href={url}
        className="rounded-xl bg-blue-400 py-2 w-1/4 text-center mt-4 text-white"
      >
        Volver a invitar
      </a>
    </div>
  );
}
