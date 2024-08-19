import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
  import React from "react";
  import CircularProgressBar from "./ProgressBar";
  import { Label } from "@/components/ui/label";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faChevronDown,
    faCircleCheck,
  } from "@fortawesome/free-solid-svg-icons";
  
  type Props = {
    open: boolean;
    toggleOpen: () => void;
    color: string;
    indicatorData: string;
    criteria: string;
    progress: number;
    checkEvaluation: boolean;
  };
  
  function Criteria({
    open,
    toggleOpen,
    color,
    indicatorData,
    criteria,
    progress,
    checkEvaluation,
  }: Props) {
    return (
      <Collapsible
        open={open}
        onOpenChange={toggleOpen}
        className={`w-full ${
          checkEvaluation
            ? "flex"
            : "hidden md:flex transition-all duration-300 ease-in"
        }`}
      >
        <div className="w-full flex flex-col rounded-[20px] bg-white transition-all duration-300 ease-in">
          <div className="w-full min-h-[82px] gap-4 px-4 py-3 flex items-center">
            <div className="w-10 h-10 flex items-center justify-center">
              <CircularProgressBar
                progress={progress}
                size={40}
                strokeWidth={4}
                color={color}
                trailColor="#EAF0F2"
                placeholder={indicatorData}
                fontSx="font-bold text-xs"
              />
            </div>
            <div className="w-[232px] h-[58px] flex flex-col">
              <Label className="font-bold text-xs text-[#98A1BB]">
                {criteria}
              </Label>
              <Label className="font-bold text-base text-[#3D404B]">
                Understanding Knowledge Questions
              </Label>
            </div>
            <CollapsibleTrigger asChild>
              <div className="w-5 h-5 flex items-center justify-center cursor-pointer md:ml-auto">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-[#3D404B]"
                />
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="w-full flex flex-col items-center gap-4 px-4 transition-all duration-300 ease-in">
            <div className="w-full h-[1px] bg-[#D6DFE4]" />
            <Label className="font-semibold text-sm text-[#5B6170]">
              The essay identifies and focuses on the knowledge question regarding
              the resolvability of disputes over knowledge claims within
              disciplines.
            </Label>
            <div className="w-full gap-2 flex flex-col">
              <Label className="font-extrabold text-xl text-black">
                Strengths
              </Label>
              <div className="w-full rounded-2xl border p-4 gap-2 bg-[#3CC28A05] border-[#3CC28AB8]">
                <div className="w-full flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="w-4 h-4 text-[#3CC28A] mt-1"
                  />
                  <Label className="font-bold text-sm text-[#3D404B]">
                    Demonstrates a good understanding of the prescribed title and
                    the associated knowledge questions.
                  </Label>
                </div>
                <div className="w-full flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="w-4 h-4 text-[#3CC28A] mt-1"
                  />
                  <Label className="font-bold text-sm text-[#3D404B]">
                    Addresses the nature of disputes in both the Natural Sciences
                    and Human Sciences effectively.
                  </Label>
                </div>
              </div>
            </div>
            <div className="w-full gap-2 flex flex-col mb-3">
              <Label className="font-extrabold text-xl text-black">
                Scope of Improvement
              </Label>
              <div className="w-full rounded-2xl border p-4 gap-2 bg-[#F9C94E05] border-[#F9C94E80]">
                <div className="w-full flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="w-4 h-4 text-[#F9C94E] mt-1"
                  />
                  <Label className="font-bold text-sm text-[#3D404B]">
                    Demonstrates a good understanding of the prescribed title and
                    the associated knowledge questions.
                  </Label>
                </div>
                <div className="w-full flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="w-4 h-4 text-[#F9C94E] mt-1"
                  />
                  <Label className="font-bold text-sm text-[#3D404B]">
                    Addresses the nature of disputes in both the Natural Sciences
                    and Human Sciences effectively.
                  </Label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  }
  
  export default Criteria;