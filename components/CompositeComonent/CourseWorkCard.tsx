import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import { FileData } from "@/app/types/type";
import { truncateString } from "@/app/utils/utils";
import Link from "next/link";

type Props = {
  file: FileData;
};

function CourseworkCard({ file }: Props) {
  return (
    <Link href={`/file/${file.id}`}>
      <div className="w-[336px] md:w-[292px] lg:w-[394px] xl:w-[440px] h-[156px] lg:h-[172px] rounded-xl border p-3 lg:p-[6px] gap-2 bg-[#FFFFFFA3] bg-custom-gradient border-[#F4EAD8] flex cursor-pointer hover:shadow-allSide">
        <div className="hidden lg:flex w-[120px] h-[160px] rounded-lg border bg-white border-[#EAF0F2]">
          {file.images && (
            <Image
              src={file.images[0]}
              alt={file.fileName}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div className="w-[312px] lg:w-[254px] xl:w-[300px] h-[132px] xl:h-auto overflow-hidden flex flex-col gap-2 lg:gap-[6px]">
          <Label className="font-extrabold text-base text-[#3D404B] max-h-11 xl:max-h-12 overflow-hidden cursor-pointer">
            {truncateString(file.title, 52)}
          </Label>
          <Label className="font-semibold text-[11px] text-[#7A8196] max-h-8 overflow-hidden cursor-pointer">
            {file.content}
          </Label>
          <div className="w-[312px] h-11 xl:h-auto flex flex-col gap-1 cursor-pointer">
            <div className="w-full gap-2 lg:gap-1 flex lg:mt-2">
              <Badge className="bg-white hover:bg-white p-1 pr-2 gap-1 h-5 xl:h-6">
                <Image
                  src={"/images/subject.png"}
                  alt="ZuAi-zu"
                  width={15}
                  height={15}
                />
                <Label className="text-[#5B6170] text-[11px] lg:text-[8px] xl:text-[11px] font-bold cursor-pointer">
                  {file.subject}
                </Label>
              </Badge>
              <Badge className="bg-white hover:bg-white p-1 pr-2 gap-1 h-5 xl:h-6">
                <Image
                  src={"/images/time.png"}
                  alt="ZuAi-zu"
                  width={15}
                  height={15}
                />
                <Label className="text-[#5B6170] text-[11px] lg:text-[8px] xl:text-[11px] font-bold cursor-pointer">
                  {file.read} min read
                </Label>
              </Badge>
              <Badge className="bg-white hover:bg-white p-1 pr-2 gap-1 h-5 xl:h-6">
                <Image
                  src={"/images/word.png"}
                  alt="ZuAi-zu"
                  width={15}
                  height={15}
                />
                <Label className="text-[#5B6170] text-[11px] lg:text-[8px] xl:text-[11px] font-bold cursor-pointer">
                  {file.words} words
                </Label>
              </Badge>
            </div>
            <div className="w-full gap-2 flex">
              <Badge className="bg-white hover:bg-white p-1 pr-2 gap-1 h-5 xl:h-6">
                <Image
                  src={"/images/star.png"}
                  alt="ZuAi-zu"
                  width={15}
                  height={15}
                />
                <Label className="text-[#5B6170] text-[11px] lg:text-[8px] xl:text-[11px] font-bold cursor-pointer">
                  7/7
                </Label>
              </Badge>
              <Badge className="bg-white hover:bg-white p-1 pr-2 gap-1 h-5 xl:h-6">
                <Image
                  src={"/images/hand.png"}
                  alt="ZuAi-zu"
                  width={15}
                  height={15}
                />
                <Label className="text-[#5B6170] text-[11px] lg:text-[8px] xl:text-[11px] font-bold cursor-pointer">
                  English
                </Label>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CourseworkCard;