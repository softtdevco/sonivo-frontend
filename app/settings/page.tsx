import { BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb'
import DashboardWrapper from '@/components/shared/dashboard-wrapper'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { TabsDemo } from './components/Tabs'

const page = () => {
  return (
    <DashboardWrapper
    header={
      <BreadcrumbList>
        <BreadcrumbItem className="hidden text-base font-medium leading-none text-[#4d4d4d] md:block">
         User & Account Settings
        </BreadcrumbItem>
        <BreadcrumbItem>
            <IoIosArrowForward className='size-4' />
        </BreadcrumbItem>
        <BreadcrumbItem className='text-base font-medium leading-none text-[#4d4d4d]'>
            Account Settings
        </BreadcrumbItem>
      </BreadcrumbList>
    }
  >
    <div className='bg-white px-7 py-3'>
      <TabsDemo />
    </div>
  </DashboardWrapper>
  )
}

export default page
