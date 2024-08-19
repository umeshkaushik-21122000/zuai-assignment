import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBook,
  faBorderAll,
  faFile,
  faFileCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";

function NavBar() {
  return (
    <div className="w-full h-full md:h-[97%] md:w-[52px] bg-[#F8FAFC] md:rounded-2xl p-2 flex md:flex-col gap-4 items-center">
      <Image
        src="/images/zuai.png"
        alt="ZuAi"
        width={150}
        height={150}
        className="w-[40px] md:w-[70] h-[40px] md:h-[70]"
      />
      <div className="hidden md:flex flex-col gap-4 items-center h-full">
        <NavItem icon={faBorderAll} sx={"bg-[#6947BF] text-white"} />
        <NavItem icon={faBook} sx={"text-gray-600"} />
        <NavItem icon={faFile} sx={"text-gray-600"} />
        <NavItem icon={faFileCircleQuestion} sx={"text-gray-600"} />
        <div className="w-9 h-9 flex items-center justify-center shadow-allSide rounded-full mt-auto cursor-pointer">
          <Image
            src="/images/user.png"
            alt="ZuAi-User"
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className="w-9 h-9 flex items-center justify-center cursor-pointer ml-auto md:hidden">
        <FontAwesomeIcon icon={faBars} className="w-7 h-7" />
      </div>
    </div>
  );
}

export default NavBar;