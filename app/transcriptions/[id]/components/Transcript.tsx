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
    <div className="overflow-x-hidden">
      <div className="space-y-3 md:space-y-4">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className={`flex flex-col md:flex-row gap-1 md:gap-4 rounded-md p-2 transition-colors ${
              currentTime >= segment.start && currentTime <= segment.end
                ? "bg-[#ef5a3c]/10"
                : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-1 md:mb-0">
              <span className="min-w-[60px] md:min-w-[80px] text-[12px] md:text-[13px] text-gray-500">
                {formatTime(segment.start)}
              </span>
              <span className="text-[12px] md:text-[13px] font-bold text-gray-500">
                {getSpeaker(segment.id)}:
              </span>
            </div>
            <p className="text-[12px] md:text-[13px] text-gray-500 pl-0 md:pl-2">{segment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transcript;
