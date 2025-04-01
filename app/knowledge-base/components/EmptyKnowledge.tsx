"use client";
import FileAdd from '@/assets/icons/FileAdd'
import React, { useCallback, useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import type { CloudinaryUploadWidgetError, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useCreateKnowledgeBaseFile } from '@/service/knowledge-base/knowledgeBase'
import { toast } from 'react-toastify'

const EmptyKnowledge = () => {
  const [uploading, setUploading] = useState(false)
  const { mutate: createKnowledgeBaseFile } = useCreateKnowledgeBaseFile()

  const onUploadSuccess = useCallback((result: CloudinaryUploadWidgetResults) => {
    console.log('Upload successful:', result)
    
    // Call createKnowledgeBaseFile with the uploaded file details
    if ('info' in result && typeof result.info === 'object') {
      const fileInfo = result.info
      
      // Extract file extension from original filename if format is not available
      let fileExtension = fileInfo.format
      const originalFilename = fileInfo.original_filename as string
      
      if (!fileExtension && originalFilename) {
        const lastDotIndex = originalFilename.lastIndexOf('.')
        if (lastDotIndex !== -1) {
          fileExtension = originalFilename.substring(lastDotIndex + 1).toLowerCase()
        }
      } else if (fileExtension) {
        fileExtension = fileExtension.toLowerCase()
      }
      
      // Validate file format - only allow PDF or TXT
      if (!fileExtension || !['pdf', 'txt'].includes(fileExtension)) {
        setUploading(false)
        toast.error("Only PDF and TXT files are supported")
        return
      }
      
      // Ensure we have a proper filename with extension
      let fileName = originalFilename
      if (fileExtension && !fileName.toLowerCase().endsWith(`.${fileExtension}`)) {
        fileName = `${fileName}.${fileExtension}`
      }
      
      setUploading(false)
      
      createKnowledgeBaseFile(
        {
          fileName: fileName,
          fileSize: fileInfo.bytes,
          fileExtention: fileExtension, // Using the detected extension
          file: {
            publicId: fileInfo.public_id,
            publicUrl: fileInfo.secure_url,
          }
        },
        {
          onSuccess: () => {
            toast.success("File uploaded successfully")
          },
          onError: (error) => {
            toast.error("Failed to upload file")
            console.error(error)
          }
        }
      )
    }
  }, [createKnowledgeBaseFile])

  const onUploadError = useCallback((error: CloudinaryUploadWidgetError) => {
    console.error('Upload failed:', error)
    setUploading(false)
    toast.error("Upload failed")
  }, [])

  return (
    <div className="inline-flex h-full w-full items-center justify-center overflow-hidden bg-white px-[89px] pb-[160px] pt-[46px]">
    <div className="inline-flex shrink grow basis-0 items-center justify-center self-stretch rounded-2xl border-2 border-dashed border-[#bbbbbb] bg-neutral-400/5 py-[47px] pl-[160px] pr-[160px]">
      <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-8 self-stretch">
        <div className="flex h-[205px] flex-col items-start justify-start gap-6 self-stretch">
          <div data-svg-wrapper className="relative">
            <FileAdd />
          </div>
          <div className="flex h-[151px] flex-col items-start justify-start gap-2 self-stretch">
            <div className="self-stretch text-base font-semibold text-gray-600">
            Knowledge Base
            </div>
            <div className="self-stretch text-base font-normal text-gray-500">
            Knowledge base is a bank of files that are accessible by your assistants.
              <br />
              <br />
              You can upload a PDF, etc and attach it to your assistants, they pull from these for more context during conversations.
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-4">
          <CldUploadWidget
            uploadPreset="sonivo"
            onSuccess={onUploadSuccess}
            onError={onUploadError}
            options={{
              sources: ['local', 'url', 'dropbox'],
              multiple: false,
              maxFiles: 1,
              resourceType: 'auto',
              clientAllowedFormats: ['pdf', 'txt'],
            }}
          >
            {({ open }) => (
              <div
                className="flex cursor-pointer items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3"
                onClick={() => {
                  setUploading(true)
                  open()
                }}
              >
                <div className="text-center text-base font-medium leading-[14.40px] text-white">
                  {uploading ? 'Uploading...' : 'Upload File'}
                </div>
              </div>
            )}
          </CldUploadWidget>
          <div className="cursor-pointer rounded-xl bg-white px-5 py-3">
            <div className="flex h-11 w-[158px] items-center justify-center rounded-xl border border-[#dedede] text-center text-base font-medium leading-[14.40px] text-[#131313]">
              Documentation
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EmptyKnowledge;
