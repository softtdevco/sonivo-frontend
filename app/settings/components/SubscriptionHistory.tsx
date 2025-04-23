"use client"
import React from 'react'
import { useGetSubscriptionHistories } from '@/service/subscriptions/subscription'
import { format } from 'date-fns'

interface SubscriptionHistory {
  id: string
  subscriptionRef: {
    name: string
    price: number
    credits: number
  }
  expiresAt: string
  amount: number
  status: string
}

const SubscriptionHistory = () => {
  const { data } = useGetSubscriptionHistories();
  const subscriptionHistories = data?.data || [];

  return (
    <div className='mt-6'>
      <table className='w-full'>
        <thead>
          <tr className="border-b bg-neutral-100 text-left text-sm">
            <th className="px-6 py-3 text-xs font-medium text-gray-500">
              Credits
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
          {subscriptionHistories.map((history: SubscriptionHistory) => (
            <tr key={history.id} className='group hover:bg-gray-50 border-b border-[#e8e6ea]'>
              <td className='px-6 py-4'>
                <p className='text-sm font-medium text-[#575758]'>
                  {history.subscriptionRef.credits} credits
                </p>
              </td>
              <td className='px-6 py-4'>
                <p className='text-sm font-medium text-[#575758]'>
                  {format(new Date(history.expiresAt), 'dd MMM yyyy')}
                </p>
              </td>
              <td className='px-6 py-4'>
                <p className='text-sm font-medium text-[#575758]'>
                  ${history.subscriptionRef.price.toLocaleString()}
                </p>
              </td>
              <td className='px-6 py-4'>
                <button
                  className="text-sm font-medium text-[#150a30] underline hover:text-gray-900"
                  onClick={() => {/* TODO: Implement view summary */}}
                >
                  View summary
                </button>
              </td>
            </tr>
          ))}
          {subscriptionHistories.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                No subscription history found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SubscriptionHistory
