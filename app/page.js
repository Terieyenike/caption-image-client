"use client";

import { CldUploadWidget } from "next-cloudinary";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-3xl font-bold'>Image uploader</h1>
      <div>
        <CldUploadWidget>
          {({ open }) => {
            return <button onClick={() => open()}>Upload an Image</button>;
          }}
        </CldUploadWidget>
      </div>
    </main>
  );
}
