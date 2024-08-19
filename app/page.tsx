"use client";
import NavBar from "@/components/CompositeComonent/NavBar";
import FileUpload from "@/components/CompositeComonent/FileUpload";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useFileStore from "./store/store";
import CourseWorkCard from "@/components/CompositeComonent/CourseWorkCard";
import Bar from "@/components/CompositeComonent/Bar";

type State = {
  tab: string;
  viewAll: boolean;
};

export default function Home() {
  const [state, setState] = useState<State>({
    tab: "All",
    viewAll: false,
  });

  const { files } = useFileStore();

  const tabs = ["All", "IA Example", "EE Example", "IO Example", "Tok Example"];

  return (
    <div className="bg-[#E5ECF3] w-screen h-screen flex flex-col md:flex-row transition-all duration-300 ease-in">
      <div className="w-full h-[60px] md:w-[68px] md:h-full flex items-center justify-center">
        <NavBar />
      </div>
      <div className="flex-1 h-full flex flex-col overflow-hidden overflow-y-scroll scrollbar-hide">
        <div className="w-auto flex flex-col justify-center">
          {/* Upload Area */}
          <FileUpload />
          {/* My Coursework */}
          <div className="w-auto flex items-center justify-center">
            <div className="w-[336px] md:w-[600px] lg:w-[807px] xl:w-[900px] 2xl:w-[1100px] flex flex-col gap-3 mt-10">
              <Label className="font-bold text-xl text-[#5B6170]">
                My coursework
              </Label>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-auto 2xl:w-[900px] ${
                  state.viewAll ? "h-auto" : "h-[160px] lg:h-[180px]"
                } overflow-hidden p-1`}
              >
                {files.length ? (
                  files
                    .slice()
                    .reverse()
                    .map((file) => <CourseWorkCard key={file.id} file={file} />)
                ) : (
                  <div className="w-full h-[150px] bg-white rounded-3xl flex items-center justify-center text-xl font-extrabold text-[#5B6170]">
                    No file added yet!
                  </div>
                )}
              </div>
              {files.length ? (
                <Button
                  role="button"
                  onClick={() =>
                    setState((prev) => ({ ...prev, viewAll: !state.viewAll }))
                  }
                  className="w-fit"
                  variant="ghost"
                >
                  {state.viewAll ? "View Less" : "View All"}
                </Button>
              ) : null}
            </div>
          </div>
          {/* Explore Coursework */}
          <div className="w-auto flex items-center justify-center">
            <div className="w-[336px] md:w-[600px] lg:w-[807px] xl:w-[900px] 2xl:w-[1100px] flex flex-col gap-3 mt-10">
              <Label className="font-bold text-xl text-[#5B6170]">
                Explore coursework
              </Label>
              <div className="gap-2 w-auto flex flex-wrap px-1 h-auto md:h-8">
                {tabs.map((tab, index) => (
                  <Button
                    role="button"
                    key={`${tab}${index}`}
                    onClick={() => setState((prev) => ({ ...prev, tab: tab }))}
                    className={`${
                      state.tab === tab ? "bg-white" : "bg-transparent"
                    } hover:bg-white h-auto ${
                      state.tab === tab ? "text-[#6947BF]" : "text-[#98A1BB]"
                    } text-base ${
                      state.tab === tab ? "font-extrabold" : "font-bold"
                    } py-2 px-3 outline-none`}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-auto 2xl:w-[900px] mt-4">
                {state.tab === "All" ? (
                  files.length ? (
                    files.map((file) => (
                      <CourseWorkCard key={file.id} file={file} />
                    ))
                  ) : (
                    <div className="w-full h-[150px] bg-white rounded-3xl flex items-center justify-center text-xl font-extrabold text-[#5B6170]">
                      No file added yet!
                    </div>
                  )
                ) : files.filter((file) => file.coursework === state.tab)
                    .length ? (
                  files
                    .filter((file) => file.coursework === state.tab)
                    .map((file) => <CourseWorkCard key={file.id} file={file} />)
                ) : (
                  <div className="w-full h-[150px] bg-white rounded-3xl flex items-center justify-center text-xl font-extrabold text-[#5B6170]">
                    No file added yet!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Spacer */}
        <div className="min-h-20" />
      </div>
      {/* Floating bar */}
      <div className="w-[86px] h-full hidden md:flex items-start justify-center">
        <Bar />
      </div>
    </div>
  );
}