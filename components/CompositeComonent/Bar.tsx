import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { faCalendarAlt, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

function Bar() {
  return (
    <div className="h-full flex-col w-fit flex gap-2 justify-start items-start pt-4">
      <Badge className="bg-white hover:bg-white p-1 pr-2 gap-1">
        <Image src={"/images/zu.png"} alt="ZuAi-zu" width={20} height={20} />
        <Label className="text-[#5B6170] text-sm font-extrabold">120</Label>
      </Badge>
      <Badge className="bg-white hover:bg-white p-1 pr-2 gap-1">
        <Image src={"/images/flame.png"} alt="ZuAi-zu" width={20} height={20} />
        <Label className="text-[#5B6170] text-sm font-extrabold">24</Label>
      </Badge>
      <Badge className="w-11 h-11 rounded-full bg-[#FFFFFFA3] hover:bg-[#FFFFFFA3] p-0 flex items-center justify-center">
        <Badge className="w-9 h-9 rounded-full bg-white hover:bg-white border-[#EAF0F2] border flex items-center justify-center">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            color="#3D404B"
            className="w-4 h-4"
          />
        </Badge>
      </Badge>
      <Badge className="w-11 h-11 rounded-full bg-[#FFFFFFA3] hover:bg-[#FFFFFFA3] p-0 flex items-center justify-center">
        <Badge className="w-9 h-9 rounded-full bg-white hover:bg-white border-[#EAF0F2] border flex items-center justify-center">
          <FontAwesomeIcon
            icon={faNoteSticky}
            color="#3D404B"
            className="w-4 h-4"
          />
        </Badge>
      </Badge>
    </div>
  );
}

export default Bar;