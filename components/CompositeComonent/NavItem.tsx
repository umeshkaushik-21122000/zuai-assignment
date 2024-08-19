import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  icon: IconProp;
  sx?: string;
};

function NavItem({ icon, sx }: Props) {
  return (
    <div
      className={`w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-150 ease-in hover:text-white rounded-full hover:bg-[#6947BF] ${sx}`}
    >
      <FontAwesomeIcon icon={icon} className="w-5 h-5" />
    </div>
  );
}

export default NavItem;