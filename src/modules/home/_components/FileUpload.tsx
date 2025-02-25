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
    <div className="md-card flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Upload an Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-300 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-800"
      />

      {image && (
        <div id="image-container" className="w-64 h-64 relative">
        <Image
          src={image}
          alt="Uploaded"
          layout="fill" // Fill the parent div
          objectFit="contain" // Maintain aspect ratio
          className="rounded-lg max-w-full max-h-full bg-gray-400" // Ensure the image doesn't exceed the div
        />
      </div>
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-gray-400"
        disabled={!selectedFile}
      >
        Submit
      </button>

      {resMessage && <p className="mt-2 text-green-600 dark:text-green-400">{resMessage}</p>}
      {errMessage && <p className="mt-2 text-red-600 dark:text-red-400">{errMessage}</p>}
    </div>
  );
};
