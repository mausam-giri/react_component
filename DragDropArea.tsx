import React, { useState, useRef } from "react";

interface UploaderProps {
  textContent?: string;
  buttonText?: string;
  classname?: string;
}

export default function DragDropArea({ textContent, buttonText, classname }: UploaderProps) {
  const [files, setFiles] = useState<File>();

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    const selectedFiles = files as FileList;
    if (files && files?.[0]) {
      alert(selectedFiles?.[0]);
    }
    setFiles(selectedFiles?.[0]);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      alert(e.dataTransfer.files);
    }
  };
  return (
    <div
      className={`${classname} relative m-auto max-h-[20rem] max-w-[50rem] w-full h-full `}
    >
      <form
        id="form-file-upload"
        className="text-center h-full"
        onSubmit={(e) => e.preventDefault()}
        onDragEnter={handleDrag}
      >
        <input
          type="file"
          placeholder="Upload File"
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="btn-file-upload"
          className={`h-full flex items-center justify-center border-2 rounded border-dashed bg-slate-600 ${
            dragActive ? "drag-active" : ""
          }`}
        >
          <div className="">
            <p>{textContent ? textContent : "Drag and drop your file here"}</p>
            <button
              type="button"
              id="btn-file-upload"
              className="w-fit px-3 py-2 rounded"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              {buttonText ? buttonText : "Upload a file"}
            </button>
          </div>
          {dragActive && (
            <div
              id="drag-file-element"
              className="absolute w-full h-full rounded top-0 right-0 bottom-0 left-0"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </label>
      </form>
    </div>
  );
}
