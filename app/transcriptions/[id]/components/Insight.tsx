import React from "react";
import { formatDate, formatDuration } from "./Summary";

interface InsightProps {
  insight: string;
  date: string;
  duration: string;
}

const Insight = ({ insight, date, duration }: InsightProps) => {
  // Parse sections from the insight text
  const sections = insight.split('\n\n');
  const topic = sections[0].replace('Topic: ', '');
  
  // Helper function to parse sections
  const getSection = (title: string) => {
    const section = sections.find(s => s.startsWith(title));
    return section?.replace(`${title}\n`, '').replace(`${title}:`, '').trim();
  };

  // Helper to split text into bullet points
  const getBulletPoints = (text: string | undefined) => {
    if (!text) return [];
    return text.split('\n').filter(point => point.trim());
  };

  return (
    <div className="px-4">
        <h2 className="text-[#4d4d4d] text-base mb-2">
        <span className="font-bold">Meeting Title:</span> <span className='text-[#4d4d4d] text-base'>{topic}</span>
      </h2>

      <p className="mb-2 text-base text-[#4d4d4d]">
        <span className="font-bold">Date:</span>{" "}
        <span className="text-base text-[#4d4d4d]">{formatDate(date)}</span>
      </p>

      {/* Duration */}
      <p className="mb-2 text-base text-[#4d4d4d]">
        <span className="font-bold">Duration:</span>{" "}
        <span className="text-base text-[#4d4d4d]">
          {formatDuration(duration)}
        </span>
      </p>
      {/* Topic */}
      <p className='text-base text-[#8F8F8F] mt-14 mb-2'>Sentiment Analysis</p>

      {/* Overall Tone */}
      <div>
        <h3 className="font-semibold text-[#4d4d4d] mb-2 ">Overall Tone</h3>
        <p className="text-[#4d4d4d]">{getSection('Overall Tone')}</p>
      </div>

      {/* Sentiment Breakdown */}
      <div>
        <h3 className="font-semibold text-[#4d4d4d] mb-2 mt-6">Sentiment Breakdown</h3>
        
        {/* Positive */}
        <div className="ml-4 mb-3">
          <p className="font-medium text-green-600 mb-1">Positive</p>
          {getBulletPoints(getSection('Positive Sentiment')).map((point, index) => (
            <p key={index} className="flex gap-2 text-[#4d4d4d]">
              <span>•</span>
              <span>{point}</span>
            </p>
          ))}
        </div>

        {/* Neutral */}
        <div className="ml-4 mb-3">
          <p className="font-medium text-gray-600 mb-1">Neutral</p>
          {getBulletPoints(getSection('Neutral Sentiment')).map((point, index) => (
            <p key={index} className="flex gap-2 text-[#4d4d4d]">
              <span>•</span>
              <span>{point}</span>
            </p>
          ))}
        </div>

        {/* Negative */}
        <div className="ml-4">
          <p className="font-medium text-red-600 mb-1">Negative</p>
          {getBulletPoints(getSection('Negative Sentiment')).map((point, index) => (
            <p key={index} className="flex gap-2 text-[#4d4d4d]">
              <span>•</span>
              <span>{point}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Actionable Insights */}
      <div>
        <h3 className="font-semibold text-[#4d4d4d] mb-2 mt-6">Actionable Insights</h3>
        {getBulletPoints(getSection('Actionable Insights')).map((point, index) => (
          <p key={index} className="flex gap-2 text-[#4d4d4d]">
            <span>•</span>
            <span>{point}</span>
          </p>
        ))}
      </div>

      {/* Keywords & Topics */}
      <div>
        <h3 className="font-semibold text-[#4d4d4d] mb-2 mt-6">Keywords & Topics</h3>
        <p className="text-[#4d4d4d]">{getSection('Keywords & Topics')}</p>
      </div>
    </div>
  );
};

export default Insight;
