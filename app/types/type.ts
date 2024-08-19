export type FileData = {
    fileName: string;
    title: string;
    file: File;
    subject: string;
    coursework: string;
    read: string;
    words: string;
    id: string;
    content: string;
    images: string[];
    evaluatedOn: string;
  };
  
  export type Card = {
    msg: string;
    type: "error" | "success";
    id: number;
  };