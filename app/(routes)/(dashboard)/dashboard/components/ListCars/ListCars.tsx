"use client";

import React from "react";
import { ListCarsProps } from "./ListCar.types";
import { Car } from "@/lib/generated/prisma/client";
import Image from "next/image";
import { Fuel, Gauge, Gem, Heart, Users2, Wrench } from "lucide-react";
import { ModalReservation } from "@/components/Shared/ModalAddReservation";
import { favoriteCars } from "@/hooks/favoritos-carros";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { addFavoriteItem, favoriteItems, removeFavoriteItem } = favoriteCars();

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {cars.map((car: Car) => {
        const {
          priceDay,
          photo,
          cv,
          engine,
          name,
          id,
          people,
          transmission,
          type,
        } = car;

        const likedCar = favoriteItems.some((item) => item.id === car.id);

        return (
          <div key={id} className="p-1 shadow-md hover:shadow-lg">
            <Image
              src={photo}
              alt={name}
              width={400}
              height={600}
              className="rounded-lg "
            />
            <div className="p-3">
              <div className="flex flex-col mb-3 gap-x-4">
                <p className="tex-xl min-h-16 lg:min-h-fit">{name}</p>
                <p>R$ {priceDay} /diaria</p>
              </div>
              <p className="flex items-center">
                <Gem className="w-4 h-4 mr-2" strokeWidth={1} />
                {type}
              </p>
              <p className="flex items-center">
                <Wrench className="w-4 h-4 mr-2" strokeWidth={1} />
                {transmission}
              </p>
              <p className="flex items-center">
                <Users2 className="w-4 h-4 mr-2" strokeWidth={1} />
                {people}
              </p>
              <p className="flex items-center">
                <Fuel className="w-4 h-4 mr-2" strokeWidth={1} />
                {engine}
              </p>
              <p className="flex items-center">
                <Gauge className="w-4 h-4 mr-2" strokeWidth={1} />
                {cv} CV
              </p>

              <div className="flex items-center justify-center gap-x-3 ">
                <ModalReservation car={car} />
                <Heart
                  className={`mt-2 cursor-pointer ${likedCar && "fill-black"}`}
                  onClick={
                    likedCar
                      ? () => removeFavoriteItem(car.id)
                      : () => addFavoriteItem(car)
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
