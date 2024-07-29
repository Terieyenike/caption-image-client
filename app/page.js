"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = async (result) => {
    setLoading(true);
    setImageUrl(result.info.secure_url);

    const response = await fetch(
      "https://caption-image-server.onrender.com/api/v1/caption",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: result.info.secure_url }),
      }
    );
    const data = await response.json();
    setCaption(data.caption);
    setLoading(false);
  };

  const handleCopyCaption = () => {
    copy(caption, {
      debug: true,
    });
    toast("✅ Copied");
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4 bg-gray-800'>
      <h1 className='text-2xl font-bold mb-8'>AI-Enhanced Photo Captioner</h1>
      <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        {imageUrl && (
          <div className='flex flex-col items-center justify-center border border-dashed border-gray-400 p-4 bg-white rounded-lg'>
            <h2 className='text-xl font-semibold mb-2 text-gray-900'>
              Uploaded Image:
            </h2>
            <img
              src={imageUrl}
              alt='Uploaded'
              className='w-full h-auto object-contain'
              style={{ maxHeight: "60vh" }}
            />
          </div>
        )}
        {caption && (
          <div className='flex flex-col items-center justify-center border border-dashed border-gray-400 p-4 bg-white rounded-lg text-gray-900'>
            <h2 className='text-xl font-semibold mb-2'>Caption:</h2>
            <p className='select-none'>{caption}</p>
            <button
              className='px-4 py-2 bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none mt-5 cursor-pointer'
              onClick={handleCopyCaption}>
              Copy caption
            </button>
          </div>
        )}
      </div>
      <div className='flex flex-col items-center'>
        <CldUploadWidget
          signatureEndpoint='/api/sign-cloudinary-params'
          onSuccess={handleUploadSuccess}>
          {({ open }) => (
            <button
              onClick={() => open()}
              disabled={loading}
              className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none disabled:bg-gray-400'>
              {loading ? "Loading..." : "Upload an Image"}
            </button>
          )}
        </CldUploadWidget>
      </div>
      <ToastContainer theme='dark' />
    </main>
  );
}
