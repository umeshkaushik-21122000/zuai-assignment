"use client";
import { Label } from "@/components/ui/label";
import { faRocket, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useFileStore from "@/app/store/store";

function Notifications() {
  const { cards, removeCard } = useFileStore();

  const containerClasses = [
    "w-screen",
    "h-screen",
    "fixed",
    "pointer-events-none",
    "z-20",
    "pt-8",
    "flex",
    "flex-col",
    "items-center",
    "gap-3",
  ].join(" ");

  const getIconColorClass = (type:String) => {
    return type === "success" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className={containerClasses}>
      {cards.map((card) => {
        const cardContainerClasses = [
          "flex",
          "p-3",
          "rounded-xl",
          "bg-white",
          "border",
          "gap-5",
          "pointer-events-auto",
          "shadow-allSide",
          "md:min-w-[500px]",
          "transition-all",
          "duration-300",
          "ease-in-out",
        ].join(" ");

        const iconClasses = [
          "h-4",
          "w-4",
          getIconColorClass(card.type),
        ].join(" ");

        const closeIconClasses = ["h-4", "w-4"].join(" ");

        const closeButtonClasses = [
          "h-full",
          "flex",
          "items-center",
          "cursor-pointer",
          "ml-auto",
        ].join(" ");

        return (
          <div key={card.id} className={cardContainerClasses}>
            <FontAwesomeIcon icon={faRocket} className={iconClasses} />
            <div className="flex flex-col gap-2">
              <Label>{card.type === "success" ? "Heads up!" : "Error"}</Label>
              <Label>{card.msg}</Label>
            </div>
            <div
              onClick={() => removeCard(card.id)}
              className={closeButtonClasses}
            >
              <FontAwesomeIcon icon={faX} className={closeIconClasses} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Notifications;
