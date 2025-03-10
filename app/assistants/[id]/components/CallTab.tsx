import { Info } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";

interface CallConfiguration {
  backchannelingEnabled: boolean;
  backgroundDenoiseEnabled: boolean;
  detectEmotion: boolean;
  temperature: number;
}

interface CallTabProps {
  callConfiguration: CallConfiguration;
  onSave?: (config: CallConfiguration) => void;
}

const CallTab = ({ callConfiguration, onSave }: CallTabProps) => {
  const [config, setConfig] = React.useState(callConfiguration);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }));
  };

  const handleToggleChange = (field: keyof CallConfiguration) => {
    setConfig(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="inline-flex h-[292px] w-[710px] flex-col items-start justify-start gap-12">
      <div className="flex h-[200px] flex-col items-start justify-start gap-6 self-stretch">
        <div className="h-[0.5px] w-[710px] bg-[#E9EAF4]" />
        <div className="inline-flex items-center justify-start gap-6 self-stretch">
          <div className="inline-flex h-[76px] shrink grow basis-0 flex-col items-start justify-between">
            <div className="inline-flex items-center justify-center gap-2">
              <div className="text-sm font-normal leading-[17.50px] text-[#272728]">
                Temperature
              </div>
              <Info className="h-4 w-4 text-[#EF5A3C]" />
            </div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="inline-flex w-[266.67px] flex-col items-start justify-center gap-[10.67px] py-[21.33px] pr-[133.33px]">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.temperature}
                  onChange={handleTemperatureChange}
                  className="h-[5.33px] w-full appearance-none rounded-[133.33px] bg-[#ef5a3c] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black/10 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0px_2.67px_5.33px_0px_rgba(0,0,0,0.10)]"
                />
              </div>
              <div className="flex h-10 w-12 items-center justify-center gap-[19.38px] rounded-xl border border-gray-200 bg-neutral-50 px-[20.52px] py-5">
                <div className="text-sm font-normal leading-[17.50px] text-gray-700">
                  {config.temperature}
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex h-[76px] shrink grow basis-0 flex-col items-start justify-start gap-4">
            <div className="inline-flex items-center justify-center gap-2">
              <div className="text-sm font-normal leading-[17.50px] text-[#272728]">
                Detect emotion
              </div>
              <Info className="h-4 w-4 text-[#EF5A3C]" />
            </div>
            <Switch
              checked={config.detectEmotion}
              onCheckedChange={() => handleToggleChange('detectEmotion')}
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                config.detectEmotion ? 'data-[state=checked]:bg-[#ef5a3c]' : 'data-[state=unchecked]:bg-gray-200'
              }`}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-start gap-6 self-stretch">
          <div className="flex shrink grow basis-0 items-start justify-between self-stretch">
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
              <div>
                <div className="inline-flex items-center justify-center gap-2">
                  <div className="text-sm font-normal leading-[17.50px] text-[#272728]">
                    Backchannelling Enabled
                  </div>
                  <Info className="h-4 w-4 text-[#EF5A3C]" />
                </div>
                <p className="text-sm italic text-[#b0b0b0]">
                  Make the bot say words like &apos;mhmm&apos;, &apos;ya&apos;
                  etc. while listening to make the conversation sounds natural.
                  Default disabled
                </p>
              </div>
            </div>
            <Switch
              checked={config.backchannelingEnabled}
              onCheckedChange={() => handleToggleChange('backchannelingEnabled')}
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                config.backchannelingEnabled ? 'data-[state=checked]:bg-[#ef5a3c]' : 'data-[state=unchecked]:bg-gray-200'
              }`}
            />
          </div>
          <div className="flex h-[76px] w-[343px] items-start justify-start gap-4">
            <div className="inline-flex flex-col items-start justify-start gap-1">
              <div className="inline-flex items-center justify-center gap-2">
                <div className="text-sm font-normal leading-[17.50px] text-[#272728]">
                  Background Denoising Enabled
                </div>
                <Info className="h-4 w-4 text-[#EF5A3C]" />
              </div>
              <p className="text-sm italic text-[#b0b0b0]">
                Filter background noise while the user is talking.
              </p>
            </div>
            <Switch
              checked={config.backgroundDenoiseEnabled}
              onCheckedChange={() => handleToggleChange('backgroundDenoiseEnabled')}
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                config.backgroundDenoiseEnabled ? 'data-[state=checked]:bg-[#ef5a3c]' : 'data-[state=unchecked]:bg-gray-200'
              }`}
            />
          </div>
        </div>
      </div>
      <button 
        onClick={() => onSave?.(config)}
        className="inline-flex h-11 items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3"
      >
        <div className="text-center text-base font-medium leading-[14.40px] text-white">
          Save
        </div>
      </button>
    </div>
  );
};

export default CallTab;
