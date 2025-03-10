import { Info } from 'lucide-react';
import React from 'react';

interface ModelConfiguration {
  provider: string;
  language: string;
  temperature: number;
  maxTokens: number;
  voice: string;
}

interface ModelTabProps {
  modelConfiguration: ModelConfiguration;
  onSave?: (config: ModelConfiguration) => void;
}

const ModelTab = ({ modelConfiguration, onSave }: ModelTabProps) => {
  const [config, setConfig] = React.useState(modelConfiguration);

  const handleChange = (field: keyof ModelConfiguration, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-[710px] inline-flex flex-col justify-start items-start gap-12">
      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="w-[363px] flex flex-col justify-start items-start gap-2">
          <div className="self-stretch justify-start text-[#272728] text-base font-medium">Model</div>
          <div className="self-stretch justify-end text-[#808080] text-xs font-normal leading-[15px]">
            This section allows you to configure the model for the assistant.
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-5">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Provider</div>
              <Info className="h-4 w-4 text-[#EF5A3C]" />
            </div>
            <select
              value={config.provider}
              onChange={(e) => handleChange('provider', e.target.value)}
              className="self-stretch h-[50px] px-[20.52px] py-5 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700"
            >
              <option value="openai">OpenAI</option>
              {/* Add other provider options as needed */}
            </select>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Language</div>
              <Info className="h-4 w-4 text-[#EF5A3C]" />
            </div>
            <select
              value={config.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="self-stretch h-[50px] px-[20.52px] py-5 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700"
            >
              <option value="en">English</option>
              {/* Add other language options as needed */}
            </select>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Voice</div>
              <Info className="h-4 w-4 text-[#EF5A3C]" />
            </div>
            <select
              value={config.voice}
              onChange={(e) => handleChange('voice', e.target.value)}
              className="self-stretch h-[50px] px-[20.52px] py-5 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700"
            >
              <option value="Nova">Nova</option>
              {/* Add other voice options as needed */}
            </select>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
              <div className="inline-flex justify-center items-center gap-2">
                <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Max. Tokens</div>
                <Info className="h-4 w-4 text-[#EF5A3C]" />
              </div>
              <input
                type="number"
                value={config.maxTokens}
                onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
                className="self-stretch h-[50px] px-[20.52px] py-5 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => onSave?.(config)}
        className="h-11 px-5 py-3 bg-[#131313] rounded-xl inline-flex justify-start items-center gap-1.5"
      >
        <div className="text-center justify-center text-white text-base font-medium leading-[14.40px]">Save</div>
      </button>
    </div>
  );
};

export default ModelTab;