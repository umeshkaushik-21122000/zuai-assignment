"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropzone from "react-dropzone";
import useFileStore from "@/app/store/store";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  inputClick: () => void;
};

function DropDown({ file, setFile, inputRef, inputClick }: Props) {
  const { addCard } = useFileStore();

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file) {
      if (file.type === "application/pdf") {
        if (file.size <= maxSizeInBytes) {
          setFile(file);
        } else {
          addCard({
            msg: "File size should not be more than 5 MB",
            type: "error",
            id: new Date().getTime(),
          });
        }
      } else {
        setFile(null);
        addCard({
          msg: "Please upload a valid PDF file.",
          type: "error",
          id: new Date().getTime(),
        });
      }
    }
  };

  return (
    <Dropzone onDrop={handleDrop} accept={{ "application/pdf": [] }}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="w-full h-[200px] 2xl:h-[240px] rounded-xl border-[#CEC4EB] gap-[10px] bg-[#FCFBFD] border-dashed border flex flex-col items-center justify-center"
        >
          <FontAwesomeIcon icon={faFileArrowUp} color="#98A1BB" size="2xl" />
          <div className="flex flex-col items-center">
            <Label className="font-bold text-base text-[#7A8196]">
              Drag and drop a pdf
            </Label>
            <Label className="font-semibold text-xs text-[#7A8196]">
              *Limit 5 MB per file.
            </Label>
          </div>
          <Button
            role="button"
            onClick={inputClick}
            variant="outline"
            className="rounded-3xl px-4 py-2 bg-[#FCFBFD] border border-[#CEC4EB] shadow-button"
          >
            <Label className="font-extrabold text-base text-[#6947BF] cursor-pointer">
              {file ? file.name : "Upload your file"}
            </Label>
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              {...getInputProps()}
            />
          </Button>
        </div>
      )}
    </Dropzone>
  );
}

export default DropDown;