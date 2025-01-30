"use client";
import { formatTime } from "@/lib/utils";

interface TranscriptSegment {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface TranscriptProps {
  transcription: string;
  currentTime?: number;
}

const Transcript = ({ transcription, currentTime = 0 }: TranscriptProps) => {
  const segments: TranscriptSegment[] = JSON.parse(transcription);

  const getSpeaker = (id: number) => {
    // Alternate between Speaker 1 and 2 based on ID
    return `Speaker ${(id % 2) + 1}`;
  };

  return (
    <div className="">
      <div className=" space-y-4">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className={`flex gap-4 rounded-md p-2 transition-colors ${
              currentTime >= segment.start && currentTime <= segment.end
                ? "bg-[#ef5a3c]/10"
                : ""
            }`}
          >
            <span className="min-w-[80px] text-[13px] text-gray-500">
              {formatTime(segment.start)}
            </span>
            <span className="text-[13px] font-bold text-gray-500">
              {getSpeaker(segment.id)} :
            </span>
            <p className="text-[13px] text-gray-500">{segment.text}</p>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default Transcript;
