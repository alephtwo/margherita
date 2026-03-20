import * as React from "react";
import { Calculator } from "./components/calculator/Calculator";

export function Margherita() {
  return (
    <div className="h-screen flex bg-no-repeat bg-cover bg-[url(/pizza.webp)]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="container mx-auto my-4 z-10">
        <div className="flex flex-col items-center gap-5">
          <span className="text-7xl font-lobster text-white text-shadow-lg/80">
            margherita
          </span>
          <Calculator />
        </div>
      </div>
    </div>
  );
}
