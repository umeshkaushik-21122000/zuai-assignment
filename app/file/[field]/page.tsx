"use client";
import React, { useEffect, useState } from "react";
import FloatingBar from "@/components/CompositeComonent/Bar";
import NavBar from "@/components/CompositeComonent/NavBar";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faDownLeftAndUpRightToCenter,
  faExpand,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faTrash,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { Label } from "@/components/ui/label";
import useFileStore from "@/app/store/store";
import ProgressBar from "@/components/CompositeComonent/ProgressBar";
import Criteria  from "@/components/CompositeComonent/Criteria";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Card } from "@/app/types/type";

type State = {
  isOpen: boolean;
  totalPages: number;
  currentPage: number;
  criteriaA: boolean;
  criteriaB: boolean;
  criteriaC: boolean;
  checkEvaluation: boolean;
  cards: Card[];
};

function Page({ params }: { params: { fileId: string } }) {
  const [state, setState] = useState<State>({
    isOpen: true,
    totalPages: 0,
    currentPage: 1,
    criteriaA: false,
    criteriaB: false,
    criteriaC: false,
    checkEvaluation: false,
    cards: [],
  });

  const router = useRouter();

  const { files, deleteFile, addCard } = useFileStore();

  const fileData = files.find((file) => file.id === params.fileId);

  const handleDeleteFile = async () => {
    if (fileData?.id) {
      deleteFile(fileData.id);
      router.push("/");
      addCard({
        msg: "file deleted succesfully",
        type: "success",
        id: new Date().getTime(),
      });
    } else {
      addCard({
        msg: "error in deleting file, please try again",
        type: "error",
        id: new Date().getTime(),
      });
    }
  };

  useEffect(() => {
    if (fileData?.images) {
      setState((prev) => ({ ...prev, totalPages: fileData.images.length }));
    }
  }, [fileData]);

  return (
    <div className="bg-[#E5ECF3] w-screen h-screen flex flex-col md:flex-row transition-all duration-300 ease-in">
      <div className="w-full h-[60px] md:w-[68px] md:h-full flex items-center justify-center">
        <NavBar />
      </div>
      <div className="flex-1 h-full flex flex-col overflow-hidden overflow-y-scroll scrollbar-hide">
        <div className="w-full flex flex-col-reverse md:flex-col lg:flex-row justify-center gap-3">
          <div
            className={`w-auto lg:w-[482px] ${
              state.checkEvaluation ? "xl:w-[454px]" : "xl:w-[638px]"
            } ${state.checkEvaluation ? "2xl:w-[500px]" : "2xl:w-[858px]"} ${
              state.checkEvaluation ? "hidden xl:flex" : "flex"
            } justify-center transition-all duration-300 ease-in`}
          >
            <div
              className={`w-[336px] md:w-[608px] lg:w-[482px] ${
                state.checkEvaluation ? "xl:w-[454px]" : "xl:w-[638px]"
              } ${
                state.checkEvaluation ? "2xl:w-[500px]" : "2xl:w-[858px]"
              } flex flex-col rounded-3xl overflow-hidden mt-2 md:mt-10`}
            >
              <div className="w-full min-h-[50px] p-3 justify-between items-center bg-[#FFFFFF7A] flex-wrap xl:flex">
                <Badge className="h-[26px] rounded-xl py-1 px-3 bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#3D404B] font-bold text-sm">
                  {fileData?.fileName}
                </Badge>
                <div className="flex h-6 gap-3 items-center w-auto lg:w-fit mt-3 xl:mt-0">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassPlus}
                    className="text-[#5B6170] w-4 h-4"
                  />
                  <Label className="text-[#5B6170] font-bold text-sm">
                    60%
                  </Label>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassMinus}
                    className="text-[#5B6170] w-4 h-4"
                  />
                  <Badge className="w-6 h-6 ml-auto rounded-full flex items-center justify-center bg-[#FFFFFF] hover:bg-[#FFFFFF] relative">
                    <FontAwesomeIcon
                      icon={faExpand}
                      className="text-[#5B6170] absolute w-1/2"
                    />
                  </Badge>

                  <Badge
                    className="bg-white hover:bg-white py-1 pr-3 pl-2 gap-2 cursor-pointer"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        checkEvaluation: !state.checkEvaluation,
                      }))
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        state.checkEvaluation
                          ? faUpRightAndDownLeftFromCenter
                          : faDownLeftAndUpRightToCenter
                      }
                      className="text-[#5B6170] w-3 h-3"
                    />
                    <Label className="text-[#5B6170] font-bold text-xs cursor-pointer">
                      {state.checkEvaluation ? "Expand" : "Collapse"}
                    </Label>
                  </Badge>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Badge className="w-6 h-6 rounded-full flex items-center justify-center bg-[#FFFFFF] hover:bg-[#FFFFFF] relative cursor-pointer">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 absolute w-1/2"
                        />
                      </Badge>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {`This action cannot be undone. This will permanently delete your
              file (${fileData?.fileName}) from our servers.`}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteFile}
                          className="bg-red-600 hover:bg-red-500"
                        >
                          Detele
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="h-[603px] md:h-[530px] lg:h-[406px] xl:h-[537px] 2xl:h-[648px] w-full flex flex-col items-center justify-around bg-[#FFFFFF]">
                <div className="w-[90%] md:w-3/5 h-4/5 shadow-allSide overflow-hidden rounded-xl">
                  <iframe
                    src={fileData?.images?.[state.currentPage - 1]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-[8%] flex items-center justify-end px-6 gap-6">
                  {state.currentPage > 1 && (
                    <Badge
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          currentPage: state.currentPage - 1,
                        }))
                      }
                      className="w-8 h-8 cursor-pointer rounded-full shadow-allSide bg-white hover:bg-white flex items-center justify-center text-[#5B6170]"
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="w-4 h-4"
                      />
                    </Badge>
                  )}
                  {state.currentPage > 1 && (
                    <Label className="font-semibold text-base text-[#5B6170]">
                      {state.currentPage - 1}
                    </Label>
                  )}
                  <Label className="font-bold text-xl text-black">
                    {state.currentPage}
                  </Label>
                  {state.currentPage < state.totalPages && (
                    <Label className="font-semibold text-base text-[#5B6170]">
                      {state.currentPage + 1}
                    </Label>
                  )}
                  {state.currentPage < state.totalPages && (
                    <Badge
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          currentPage: state.currentPage + 1,
                        }))
                      }
                      className="w-8 h-8 cursor-pointer rounded-full shadow-allSide bg-white hover:bg-white flex items-center justify-center text-[#5B6170]"
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-4 h-4"
                      />
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-auto ${
              state.checkEvaluation ? "lg:w-[560px]" : "lg:w-[316px]"
            } ${state.checkEvaluation ? "xl:w-[520px]" : "xl:w-[336px]"} ${
              state.checkEvaluation ? "2xl:w-[560px]" : "2xl:w-[356px]"
            } flex flex-col items-center transition-all duration-300 ease-in`}
          >
            <div
              className={`w-[336px] md:w-[608px] ${
                state.checkEvaluation ? "lg:w-[560px]" : "lg:w-[316px]"
              } ${state.checkEvaluation ? "xl:w-[520px]" : "xl:w-[336px]"} ${
                state.checkEvaluation ? "2xl:w-[560px]" : "2xl:w-[356px]"
              } gap-2 flex flex-col mt-10 transition-all duration-300 ease-in`}
            >
              {state.checkEvaluation && (
                <div className="w-full h-[50px] rounded-3xl bg-white p-3 justify-between hidden md:flex items-center">
                  <Badge className="h-[26px] rounded-xl px-3 py-1 bg-[#98A1BB1F] font-bold text-sm text-[#5B6170]">
                    {fileData?.fileName}
                  </Badge>
                  <div
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        checkEvaluation: false,
                        criteriaA: false,
                        criteriaB: false,
                        criteriaC: false,
                      }))
                    }
                    className={`flex cursor-pointer gap-2 items-center text-base text-[#6947BF]`}
                  >
                    <Label className="font-extrabold cursor-pointer">
                      Expand & view your file
                    </Label>
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </div>
                </div>
              )}
              <div className="w-full rounded-[20px] bg-white p-3 pl-6 flex gap-5 items-center mb-1">
                <div className="w-[220px] gap-[2px] flex flex-col">
                  <Label className="text-sm font-semibold text-[#3D404B]">
                    Overall Score
                  </Label>
                  <Label className="text-2xl font-extrabold text-[#3D404B]">
                    Remark :{" "}
                    <Label className="text-2xl font-extrabold text-[#3CC28A]">
                      Good
                    </Label>{" "}
                  </Label>
                  <Label className="text-xs font-semibold text-[#98A1BB]">
                    Evaluated on {fileData?.evaluatedOn}
                  </Label>
                </div>
                <div className="flex items-center justify-center w-20 h-20 md:ml-auto">
                  <ProgressBar
                    progress={65}
                    size={80}
                    strokeWidth={8}
                    color="#3CC28A"
                    trailColor="#EAF0F2"
                    placeholder="13/20"
                    fontSx="text-lg font-bold"
                  />
                </div>
              </div>
              <div
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    checkEvaluation: false,
                    criteriaA: false,
                    criteriaB: false,
                    criteriaC: false,
                  }))
                }
                className={`${
                  state.checkEvaluation ? "flex" : "hidden"
                } w-[276px] md:hidden h-10 mb-2 rounded-3xl bg-white mt-1 gap-[10px] items-center justify-between text-[#6947BF] px-4`}
              >
                <Label className="text-base font-extrabold cursor-pointer">
                  Expand & view your file
                </Label>
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </div>
              <Criteria 
                checkEvaluation={state.checkEvaluation}
                open={state.criteriaA}
                toggleOpen={() =>
                  setState((prev) => ({ ...prev, criteriaA: !state.criteriaA }))
                }
                color="#3CC28A"
                indicatorData="7/10"
                criteria="Criteria A:"
                progress={70}
              />
              <Criteria 
                checkEvaluation={state.checkEvaluation}
                open={state.criteriaB}
                toggleOpen={() =>
                  setState((prev) => ({ ...prev, criteriaB: !state.criteriaB }))
                }
                color="#F9C94E"
                indicatorData="5/10"
                criteria="Criteria B:"
                progress={50}
              />
              <Criteria 
                checkEvaluation={state.checkEvaluation}
                open={state.criteriaC}
                toggleOpen={() =>
                  setState((prev) => ({ ...prev, criteriaC: !state.criteriaC }))
                }
                color="#EB751F"
                indicatorData="3/10"
                criteria="Criteria C:"
                progress={30}
              />
              {!state.checkEvaluation && (
                <div
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      checkEvaluation: true,
                      criteriaA: true,
                      criteriaB: true,
                      criteriaC: true,
                    }))
                  }
                  className="w-[276px] h-10 cursor-pointer rounded-3xl bg-white mt-1 gap-[10px] flex items-center justify-between text-[#6947BF] px-4"
                >
                  <Label className="text-base font-extrabold cursor-pointer">
                    Check detailed Evaluation
                  </Label>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Spacer */}
        <div className="min-h-20" />
      </div>
      {/* Floating bar */}
      <div className="w-[86px] h-full hidden md:flex items-start justify-center">
        <FloatingBar />
      </div>
    </div>
  );
}

export default Page;