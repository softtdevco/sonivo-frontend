"use client";

import React, { useCallback } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import { CldUploadWidget } from 'next-cloudinary'
import type { CloudinaryUploadWidgetError, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useCreateTranscription } from '@/service/transcriptions/transcriptions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Upload = () => {
  const [uploading, setUploading] = React.useState(false)
  const { mutate: createTranscription } = useCreateTranscription();
  const router = useRouter();

  const onUploadSuccess = useCallback((result: CloudinaryUploadWidgetResults) => {
    console.log('Upload successful:', result)
    setUploading(false)
    
    // Call createTranscription with the uploaded file details
    if ('info' in result && typeof result.info === 'object') {
      createTranscription(
        {
          publicId: result.info.public_id,
          publicUrl: result.info.secure_url,
          fileType: result.info.is_audio ? "audio" : "video"
        },
        {
          onSuccess: (data) => {
            toast.success("File uploaded successfully");
            router.push(`/transcriptions/${data.id}`);
          }
        }
      );
    }
  }, [createTranscription, router])

  const onUploadError = useCallback((error: CloudinaryUploadWidgetError) => {
    console.error('Upload failed:', error)
    setUploading(false)
  }, [])

  return (
    <CldUploadWidget
      uploadPreset="sonivo"
      onSuccess={onUploadSuccess}
      onError={onUploadError}
      options={{
        sources: ['local', 'url', 'dropbox'],
        multiple: false,
        maxFiles: 1,
        resourceType: 'auto',
        clientAllowedFormats: ['mp3', 'wav', 'mp4', 'mov'],
      }}
    >
      {({ open }) => (
        <div 
          className="inline-flex h-[249px] w-full items-center justify-center rounded-2xl border-2 border-[#bbbbbb] bg-neutral-400/5 border-dashed cursor-pointer"
          onClick={() => open()}
        >
          <div className="flex flex-col items-center justify-center gap-6">
            <FaFileUpload className="relative h-10 w-10 overflow-hidden text-black-700" />
            <div className="flex h-[46px] flex-col items-start justify-start gap-2 self-stretch">
              <div className="self-stretch text-center text-base font-medium text-[#4d4d4d]">
                {uploading ? 'Uploading...' : 'Click or Drag & Drop to upload file'}
              </div>
              <div className="self-stretch text-base font-medium text-[#4d4d4d]/50">
                Supported file types are .Wav, .Mp3, .MOV, .Mp4
              </div>
            </div>
            <div className="rounded-xl border border-[#dedede] bg-white px-5 py-3">
              <div className="text-center text-base font-medium leading-[14.40px] text-[#131313]">
                Upload File
              </div>
            </div>
          </div>
        </div>
      )}
    </CldUploadWidget>
  )
}

export default Upload
