import React from "react";
import { ListFavoriteCars } from "./components/ListFavoriteCars";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const favoritos = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/");

  return (
    <div>
      <h1 className="text-2xl">Carros favoritos</h1>
      <ListFavoriteCars />
    </div>
  );
};

export default favoritos;
