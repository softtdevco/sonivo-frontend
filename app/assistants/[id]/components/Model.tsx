import { useUpdateAssistantModel } from '@/service/assistant/assistant';
import { ErrorResponse } from '@/service/auth/authServices';
import { Info, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import React from 'react';

interface ModelConfiguration {
  firstMessage: string;
  prompt: string;
  language: string;
  voice: string;
  maxTokens: number;
}

interface ModelProps {
  modelConfiguration: ModelConfiguration;
  onSave?: (config: ModelConfiguration) => void;
  id: string;
}

const Model = ({ modelConfiguration, id }: ModelProps) => {
  const [config, setConfig] = React.useState(modelConfiguration);

  const handleChange = (field: keyof ModelConfiguration, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const { mutate: updateAssistantModel, isPending } = useUpdateAssistantModel(id);

  const handleSave = () => {
    updateAssistantModel(config, {
      onSuccess: () => {
        toast.success("Model updated successfully");
      },
      onError: (error: ErrorResponse) => {
        toast.error(error.response.data.message);
        console.log(error);
      }
    });
  }

  return (
    <div className="w-[710px] inline-flex flex-col justify-start items-start gap-12 mt-9">
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
              <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">First message</div>
              <Info className="h-4 w-4 text-[#EF5A3C]" />
            </div>
            <input
              type="text"
              value={config.firstMessage}
              onChange={(e) => handleChange('firstMessage', e.target.value)}
              className="self-stretch h-[50px] px-[20.52px] py-5 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7]"
            />
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Prompt</div>
              <Info className="h-4 w-4 text-[#EF5A3C]" />
            </div>
            <textarea
              value={config.prompt}
              onChange={(e) => handleChange('prompt', e.target.value)}
              className="self-stretch h-[154px] px-[20.52px] py-5 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700 resize-none"
              placeholder="This is a blank template with minimal defaults, you can change the model, temperature, and messages."
            />
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
              <div className="inline-flex justify-center items-center gap-2">
                <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Language</div>
                <Info className="h-4 w-4 text-[#EF5A3C]" />
              </div>
              <select
                value={config.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="self-stretch h-[50px] px-[20.52px] py-3 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700 appearance-none"
                style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="nl">Dutch</option>
                <option value="pl">Polish</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="self-stretch inline-flex justify-start items-start gap-6">
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="inline-flex justify-center items-center gap-2">
                  <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Voice</div>
                  <Info className="h-4 w-4 text-[#EF5A3C]" />
                </div>
                <select
                  value={config.voice}
                  onChange={(e) => handleChange('voice', e.target.value)}
                  className="self-stretch h-[50px] px-[20.52px] py-3 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700"
                >
                  <option value="Nova">Nova</option>
                  {/* Add other voice options as needed */}
                </select>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-6">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
              <div className="inline-flex justify-center items-center gap-2">
                <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Knowledge Base</div>
                <Info className="h-4 w-4 text-[#EF5A3C]" />
              </div>
              <select
                className="self-stretch h-[50px] px-[20.52px] py-3 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700"
              >
                <option value="">Select</option>
              </select>
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
              <div className="inline-flex justify-center items-center gap-2">
                <div className="justify-end text-[#272728] text-sm font-normal leading-[17.50px]">Max. Tokens</div>
                <Info className="h-4 w-4 text-[#EF5A3C]" />
              </div>
              <input
                type="number"
                value={config.maxTokens}
                onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
                className="self-stretch h-[50px] px-[20.52px] py-3 bg-neutral-50 rounded-xl border-[1.14px] border-[#e7e7e7] text-sm font-normal text-gray-700"
                max={350}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="h-11 px-5 py-3 bg-[#131313] rounded-xl inline-flex justify-start items-center gap-1.5"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <div className="text-center justify-center text-white text-base font-medium leading-[14.40px]">Save</div>
        )}
      </button>
    </div>
  );
};

export default Model;