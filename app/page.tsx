"use client";
import NavBar from "@/components/CompositeComonent/NavBar";
import FileUpload from "@/components/CompositeComonent/FileUpload";


export default function Home() {


  return (
    <div className="bg-[#E5ECF3] w-screen h-screen flex flex-col md:flex-row transition-all duration-300 ease-in">
      <div className="w-full h-[60px] md:w-[68px] md:h-full flex items-center justify-center">
        <NavBar />
      </div>
      <div className="flex-1 h-full flex flex-col overflow-hidden overflow-y-scroll scrollbar-hide">
        <div className="w-auto flex flex-col justify-center">
                    {/* file to be uploaded */}
                    <FileUpload />
        </div>
        <div className="min-h-20" />
      </div>
    </div>
  );
}