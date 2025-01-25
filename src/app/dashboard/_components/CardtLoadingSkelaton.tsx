import React from "react";
import SkelatonCard from "./SkelatonCard";

export default function CardLoadingSkelaton() {
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {new Array(9).fill(0).map((_, i) => (
          <SkelatonCard key={i} />
        ))}
      </div>
    </main>
  );
}
