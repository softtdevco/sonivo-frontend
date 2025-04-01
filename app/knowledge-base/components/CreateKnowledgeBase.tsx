"use client";
import FileAdd from '@/assets/icons/FileAdd'
import React, { useCallback, useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import type { CloudinaryUploadWidgetError, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useCreateKnowledgeBaseFile } from '@/service/knowledge-base/knowledgeBase'
import { toast } from 'react-toastify'

const CreateKnowledgeBase = () => {
  const [uploading, setUploading] = useState(false)
  const { mutate: createKnowledgeBaseFile } = useCreateKnowledgeBaseFile()

  const onUploadSuccess = useCallback((result: CloudinaryUploadWidgetResults) => {
    console.log('Upload successful:', result)
    setUploading(false)
    
    // Call createKnowledgeBaseFile with the uploaded file details
    if ('info' in result && typeof result.info === 'object') {
      const fileInfo = result.info
      const fileName = fileInfo.original_filename + '.' + fileInfo.format
      
      createKnowledgeBaseFile(
        {
          fileName: fileName,
          fileSize: fileInfo.bytes,
          fileExtention: fileInfo.format || 'unknown',
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
    <div className="inline-flex h-[505px] w-full items-center justify-center overflow-hidden bg-white py-6 pl-7 pr-[26px]">
      <div className="inline-flex w-full items-center justify-center self-stretch rounded-2xl border-2 border-[#bbbbbb] bg-neutral-400/5 py-6 pl-[98px] pr-[97px]">
        <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start gap-8 self-stretch">
          <div className="flex h-[125px] flex-col items-center justify-start gap-6 self-stretch">
            <div data-svg-wrapper className="relative">
              <FileAdd />
            </div>
            <div className="flex h-[61px] flex-col items-center justify-start gap-2 self-stretch">
              <div className="self-stretch text-center text-base font-semibold text-gray-600">
                Knowledge Base
              </div>
              <div className="self-stretch text-center text-sm font-normal text-gray-500">
                Knowledge base is a bank of files that are accessible by your assistants.
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
                clientAllowedFormats: ['pdf', 'doc', 'docx', 'txt', 'csv'],
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
            <div className="flex items-center justify-start gap-1.5 self-stretch rounded-xl">
              <div className="flex h-11 w-[158px] items-center justify-center rounded-xl border border-[#dedede]">
                Documentation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateKnowledgeBase