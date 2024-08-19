"use client";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBraille } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import DropDown from "./DropDown";
import {
  countWordsInPDF,
  extractFirstPageTextFromPDF,
  getAllPagesAsImages,
  getFormattedDate,
  truncateString,
} from "@/app/utils/utils";

import useFileStore from "@/app/store/store";

type State = {
  file: File | null;
  coursework: string;
  subject: string;
  title: string;
};

function FileUpload() {
  const [state, setState] = useState<State>({
    file: null,
    coursework: "",
    subject: "",
    title: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { files, addFile, addCard } = useFileStore();

  const handleInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEvaluate = async () => {
    if (state.file) {
      if (state.coursework) {
        if (state.subject) {
          if (state.title) {
            const wordCount = await countWordsInPDF(state.file);
            const read = wordCount / 100;
            const id = Math.floor(10000000 + Math.random() * 90000000);
            const content = await truncateString(
              await extractFirstPageTextFromPDF(state.file),
              85
            );
            const images = await getAllPagesAsImages(state.file);
            const data = {
              fileName: state.file.name,
              title: state.title,
              file: state.file,
              subject: state.subject,
              coursework: state.coursework,
              read: read.toString(),
              words: wordCount.toString(),
              id: id.toString(),
              content: content,
              images: images,
              evaluatedOn: getFormattedDate(),
            };
            addFile(data);
            addCard({
              msg: "file added",
              type: "success",
              id: new Date().getTime(),
            });
            setState((prev) => ({
              ...prev,
              file: null,
              coursework: "",
              subject: "",
              title: "",
            }));
          } else {
            addCard({
              msg: "please enter a title",
              type: "error",
              id: new Date().getTime(),
            });
          }
        } else {
          addCard({
            msg: "please select a subject",
            type: "error",
            id: new Date().getTime(),
          });
        }
      } else {
        addCard({
          msg: "please select a coursewoork type",
          type: "error",
          id: new Date().getTime(),
        });
      }
    } else {
      addCard({
        msg: "please select a file",
        type: "error",
        id: new Date().getTime(),
      });
    }
  };

  return (
    <div className="w-auto flex items-center justify-center">
      <div className="w-[336px] md:w-[500px] lg:w-[806px] xl:w-[906px] 2xl:w-[1100px] h-[636px] md:h-[564px] 2xl:h-[626px] flex items-center md:mt-10 gap-4">
        <div className="flex flex-col w-full h-full lg:w-[500px] xl:w-[600px] 2xl:w-[740px]">
          <Label className="font-extrabold text-2xl xl:text-[28px] 2xl:text-[32px]">
            Hey IB Folks ! Unsure about the quality of your answers?
            <Label className="text-[#6947BF] font-extrabold text-2xl xl:text-[28px] 2xl:text-[32px]">
              {" "}
              We get you.
            </Label>
          </Label>
          <div className="w-full lg:w-[500px] xl:w-[600px] 2xl:w-[740px] h-[492px] md:h-[476px] 2xl:h-[516px] rounded-3xl border-[#D6DFE4] border p-3 lg:p-5 gap-6 lg:gap-8 flex flex-col bg-[#FCFBFDB8] mt-6 2xl:mt-auto">
            <DropDown
              inputRef={fileInputRef}
              inputClick={handleInputClick}
              file={state.file}
              setFile={(e) => setState((prev) => ({ ...prev, file: e }))}
            />
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-[#7A8196]">
                Select your course & subjects*
              </Label>
              <div className="flex gap-2">
                <Select
                  onValueChange={(e) =>
                    setState((prev) => ({ ...prev, coursework: e }))
                  }
                  value={state.coursework}
                >
                  <SelectTrigger className="w-[187px] h-9 border rounded-3xl gap-3 py-2 pl-4 pr-3">
                    <SelectValue placeholder="Coursework type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="IA Example">IA Example</SelectItem>
                      <SelectItem value="EE Example">EE Example</SelectItem>
                      <SelectItem value="IO Example">IO Example</SelectItem>
                      <SelectItem value="Tok Example">Tok Example</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(e) =>
                    setState((prev) => ({ ...prev, subject: e }))
                  }
                  value={state.subject}
                >
                  <SelectTrigger className="w-[115x] h-9 border rounded-3xl gap-3 py-2 pl-4 pr-3">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-[#7A8196]">
                Enter your essay title*(Required)
              </Label>
              <Input
                value={state.title}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, title: e.target.value }))
                }
                type="text"
                placeholder="how nation works...."
                className="w-[280px] h-10 rounded-3xl border p-2 bg-white border-[#FF4800]"
              />
            </div>
            <div className="flex justify-center lg:justify-start w-full">
              <Button
                role="button"
                onClick={handleEvaluate}
                className="w-full md:w-[245px] h-10 rounded-3xl p-2 pr-6 gap-2 bg-[#ADB8C9] hover:bg-[#ADB8C9]"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-[#EAF0F2] rounded-full cursor-pointer">
                  <FontAwesomeIcon
                    icon={faBraille}
                    color="#ADB8C9"
                    className="w-4"
                  />
                </div>
                <Label className="font-bold text-lg text-white cursor-pointer">
                  Evaluate your Score
                </Label>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[290px] 2xl:w-[344px] h-[528px] 2xl:h-[626px] hidden lg:flex mt-auto">
          <Image
            src={"/images/poster.png"}
            alt=""
            width={100}
            height={100}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default FileUpload;