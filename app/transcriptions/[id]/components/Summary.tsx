import React from 'react'
import { format } from 'date-fns';

interface SummaryProps {
  summary: string;
  date?: string;
  duration?: string;
}

export const formatDuration = (duration: string) => {
  const seconds = parseFloat(duration);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Format date
export const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMM dd, yyyy');
  } catch {
    return "N/A";
  }
};

const Summary = ({ summary, date = "N/A", duration = "N/A" }: SummaryProps) => {
  // Split the summary into topic and content
  const parts = summary.split(' - ');
  const topic = parts[0].replace('Topic: ', '');
  const content = parts.slice(1);

  // Format duration from seconds to MM:SS
  

  return (
    <div className=" px-4 ">
      <h2 className="text-[#4d4d4d] text-base mb-2">
        <span className="font-bold">Meeting Title:</span> <span className='text-[#4d4d4d] text-base'>{topic}</span>
      </h2>
    
      <p className="text-base text-[#4d4d4d] mb-2">
        <span className="font-bold">Date:</span> <span className='text-[#4d4d4d] text-base'>{formatDate(date)}</span>
      </p>

      {/* Duration */}
      <p className="text-base text-[#4d4d4d] mb-2">
        <span className="font-bold">Duration:</span> <span className='text-[#4d4d4d] text-base'>{formatDuration(duration)}</span>
      </p>

      {/* Content */}
      <div className=" space-y-2 text-[#4d4d4d] mt-14">
        <p className='text-base text-[#8F8F8F]'>Key Topics Discussed</p>
        <p className='text-base text-[#4d4d4d] font-bold'>Meeting Updates:</p>
        {content.map((point, index) => (
          <p key={index} className="flex gap-2">
            <span className="text-[#4d4d4d] text-base">•</span>
            <span className="text-[#4d4d4d] text-base">{point}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default Summary
