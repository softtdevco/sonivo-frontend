import React from 'react'
import SubscriptionDetails from './SubscriptionDetails'
import SubscriptionHistory from './SubscriptionHistory'

const Billing = () => {
    return (
        <div className='border-t-2 border-[#dadada] pt-6 -mt-[11px]'>
            <p className='text-base font-normal text-[#555e67]'>Subscription Details</p>
            <SubscriptionDetails />
            <div className='mt-6'>
                <p className='text-base font-normal text-[#555e67]'>Subscription history</p>
                <SubscriptionHistory />
            </div>
        </div>
    )
}

export default Billing
