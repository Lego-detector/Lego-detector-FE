"use client";
import { useState } from "react";
import Image from "next/image";

export function FileUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [resMessage, setResMessage] = useState<string | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>){
    const file = event.target.files?.[0];

    if (file) {
      console.log(file.name);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImage(null);
    }
  };

  async function handleSubmit(){
    console.log("Submitting file:", selectedFile?.name);

    const API_UPLOAD_URL = process.env.NEXT_PUBLIC_API_UPLOAD_URL || "";

    const formData = new FormData();
    formData.append("file", selectedFile as Blob);

    try {
      const response = await fetch(API_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      setResMessage(result);
    } catch (error) {
      setErrMessage(error as string);
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Upload an Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {image && (
        <div id="image-container" className="w-64 h-64 relative">
          <Image
            src={image}
            alt="Uploaded"
            width={512} // Fixed width
            height={512} // Fixed height
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        disabled={!selectedFile}
      >
        Submit
      </button>

      { resMessage || <p>{resMessage}</p> }
      { errMessage || <p className="text-red-600">{errMessage}</p> }

    </div>
  );
};
