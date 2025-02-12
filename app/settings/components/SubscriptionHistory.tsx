import React from 'react'

const SubscriptionHistory = () => {
  return (
    <div className='mt-6'>
      <table className='w-full'>
        <thead>
            <tr className="border-b bg-neutral-100 text-left text-sm">
            <th className="px-6 py-3 text-xs font-medium text-gray-500">
                 Plan
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500">
                  Date paid
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500">
                  Price
                </th>
               
                <th className="px-6 py-3 text-xs font-medium text-gray-500">
                  Action
                </th>
            </tr>
        </thead>
<tbody>
    <tr className='group hover:bg-gray-50 border-b border-[#3e8e6ea]'>
        <td className='px-6 py-4'>
            <p className='text-sm font-medium text-[#575758]'>
                Basic plan
            </p>
        </td>
        <td className='px-6 py-4'>
            <p className='text-sm font-medium text-[#575758]'>17 Jan 2025</p>
        </td>
        <td className='px-6 py-4'>
            <p className='text-sm font-medium text-[#575758]'>#24,000</p>
        </td>
        <td className='px-6 py-4'>
        <button
                            className="text-sm font-medium text-[#150a30] underline hover:text-gray-900"
                            
                          >
                            View summary
                          </button>
        </td>

    </tr>
</tbody>
      </table>
    </div>
  )
}

export default SubscriptionHistory
