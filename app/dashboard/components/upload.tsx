import React from 'react'
import { FaFileUpload } from 'react-icons/fa'

const Upload = () => {
  return (
    <div className="inline-flex h-[249px] w-full items-center justify-center rounded-2xl border-2 border-[#bbbbbb] bg-neutral-400/5 border-dashed">
    <div className="flex flex-col items-center justify-center gap-6">
      <FaFileUpload className="relative h-10 w-10 overflow-hidden text-black-700" />
      <div className="flex h-[46px] flex-col items-start justify-start gap-2 self-stretch">
        <div className="self-stretch text-center text-base font-medium text-[#4d4d4d]">
          Click or Drag & Drop to upload file
        </div>
        <div className="self-stretch text-base font-medium text-[#4d4d4d]/50">
          Supported file types are .Wav, .Mp3, .MOV, .Mp4{" "}
        </div>
      </div>
      <div className="rounded-xl border border-[#dedede] bg-white px-5 py-3">
        <div className="text-center text-base font-medium leading-[14.40px] text-[#131313]">
          Upload FIle
        </div>
      </div>
    </div>
  </div>
  )
}

export default Upload
