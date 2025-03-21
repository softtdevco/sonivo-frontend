import React, { useState } from "react";
import Modal from "react-responsive-modal";
import "../../../assistants/components/customModal.css";
import "react-responsive-modal/styles.css";
import { useAddTool } from "@/service/assistant/assistant";
import { Tool } from "./ToolsTab";
import { ErrorResponse } from "@/service/auth/authServices";
import { toast } from "react-toastify";
// Define types for our form data
interface Header {
  key: string;
  value: string;
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

const AddToolModal = ({ open, setOpen, id, tools }: { open: boolean; setOpen: (open: boolean) => void, id: string, tools: Tool[] }) => {
  // State for form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [executionText, setExecutionText] = useState("");
  const [timeout, setTimeout] = useState("5000");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [parameters, setParameters] = useState<Parameter[]>([
    { name: "", type: "string", required: false, description: "" }
  ]);
  const [fixedParams, setFixedParams] = useState("");

  const { mutate: addTool, isPending } = useAddTool(id);



  // Handle adding a new header
  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  // Handle updating a header
  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  // Handle removing a header
  const removeHeader = (index: number) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
  };

  // Handle adding a new parameter
  const addParameter = () => {
    setParameters([...parameters, { name: "", type: "string", required: false, description: "" }]);
  };

  // Handle updating a parameter
  const updateParameter = (index: number, field: keyof Parameter, value: string | boolean) => {
    const updatedParameters = [...parameters];
    updatedParameters[index][field] = value;
    setParameters(updatedParameters);
  };

  // Handle removing a parameter
  const removeParameter = (index: number) => {
    const updatedParameters = [...parameters];
    updatedParameters.splice(index, 1);
    setParameters(updatedParameters);
  };

  // Handle form submission
  const handleSave = () => {
    const toolData = {
      name,
      description,
      url,
      method,
      executionText,
      timeout: parseInt(timeout),
      headers: headers.filter(h => h.key && h.value),
      parameters: parameters.filter(p => p.name),
      fixedParams: fixedParams ? JSON.parse(fixedParams) : {}
    };

    addTool(toolData, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Tool added successfully");
      },
      onError: (error: ErrorResponse) => {
        toast.error(error.response.data.message);
        console.log(error);
      }
    });
    
    console.log("Tool data:", toolData);
    // Here you would call your API to save the tool
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      classNames={{
        modal: "custom-modal",
      }}
      center
    >
      <div className="self-stretch px-8 py-6 bg-white rounded-bl-[20px] rounded-br-[20px] inline-flex flex-col justify-start items-start gap-8 ">
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          {/* Name field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-zinc-800 text-sm font-normal font-['Inter'] leading-none">Name</div>
            </div>
            <div className="self-stretch h-12 px-5 py-5 bg-neutral-50 rounded-xl outline outline-1 outline-offset-[-1.14px] outline-gray-200 inline-flex justify-start items-center gap-5">
              <input 
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm font-normal font-['Inter']" 
                placeholder="Tool name (e.g. get_weather_data)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          
          {/* Description field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-zinc-800 text-sm font-normal font-['Inter'] leading-none">Description</div>
            </div>
            <div className="self-stretch h-12 px-5 py-5 bg-neutral-50 rounded-xl outline outline-1 outline-offset-[-1.14px] outline-gray-200 inline-flex justify-start items-center gap-5">
              <input 
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm font-normal font-['Inter']" 
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="self-stretch justify-end text-zinc-500 text-xs font-normal font-['Inter'] leading-none">Based on this description the class decides whether to use the tool or not, the more precise the description of how it works and when it should be used, the better.</div>
          </div>
          
          {/* URL field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-zinc-800 text-sm font-normal font-['Inter'] leading-none">URL</div>
            </div>
            <div className="self-stretch h-12 px-5 py-5 bg-neutral-50 rounded-xl outline outline-1 outline-offset-[-1.14px] outline-gray-200 inline-flex justify-start items-center gap-5">
              <input 
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm font-normal font-['Inter']" 
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          
          {/* Method field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-zinc-800 text-sm font-normal font-['Inter'] leading-none">Method</div>
            </div>
            <div className="self-stretch h-12 px-5 py-5 bg-neutral-50 rounded-xl outline outline-1 outline-offset-[-1.14px] outline-gray-200 inline-flex justify-start items-center gap-5">
              <select 
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm font-normal font-['Inter']"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
          
          {/* Execution text field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-zinc-800 text-sm font-normal font-['Inter'] leading-none">Execution text</div>
            </div>
            <div className="self-stretch h-12 px-5 py-5 bg-neutral-50 rounded-xl outline outline-1 outline-offset-[-1.14px] outline-gray-200 inline-flex justify-start items-center gap-5">
              <input 
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm font-normal font-['Inter']" 
                placeholder="Enter text"
                value={executionText}
                onChange={(e) => setExecutionText(e.target.value)}
              />
            </div>
            <div className="self-stretch justify-end text-zinc-500 text-xs font-normal font-['Inter'] leading-none">Text spoken during execution.<br/>Leave blank if no speaking is to take place during execution!</div>
          </div>
          
          {/* Timeout field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-end text-zinc-800 text-sm font-normal font-['Inter'] leading-none">Timeout (Milliseconds)</div>
            </div>
            <div className="self-stretch h-12 px-5 py-5 bg-neutral-50 rounded-xl outline outline-1 outline-offset-[-1.14px] outline-gray-200 inline-flex justify-start items-center gap-5">
              <input 
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm font-normal font-['Inter']" 
                type="number"
                value={timeout}
                onChange={(e) => setTimeout(e.target.value)}
              />
            </div>
          </div>
          
          {/* Headers section */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch h-12 py-5 border-b-1 border-gray-200 inline-flex justify-between items-center gap-5">
                <div className="flex-1 justify-end text-gray-700 text-sm font-normal font-['Inter'] leading-none">Headers</div>
                <button 
                  onClick={addHeader}
                  className="px-2 py-1 bg-neutral-100 rounded text-xs"
                >
                  + Add Header
                </button>
              </div>
            </div>
            
            {/* Header items */}
            {headers.map((header, index) => (
              <div key={index} className="self-stretch flex gap-2 mb-2">
                <input
                  className="flex-1 h-10 px-3 py-2 bg-neutral-50 rounded-xl outline outline-1 outline-gray-200 text-sm"
                  placeholder="Key (e.g. Authorization)"
                  value={header.key}
                  onChange={(e) => updateHeader(index, "key", e.target.value)}
                />
                <input
                  className="flex-1 h-10 px-3 py-2 bg-neutral-50 rounded-xl outline outline-1 outline-gray-200 text-sm"
                  placeholder="Value"
                  value={header.value}
                  onChange={(e) => updateHeader(index, "value", e.target.value)}
                />
                <button 
                  onClick={() => removeHeader(index)}
                  className="px-2 py-1 bg-red-50 text-red-500 rounded text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          {/* Parameters section */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch h-12 py-5 border-b-1 border-gray-200 inline-flex justify-between items-center gap-5">
                <div className="flex-1 justify-end text-gray-700 text-sm font-normal font-['Inter'] leading-none">Parameters</div>
                <button 
                  onClick={addParameter}
                  className="px-2 py-1 bg-neutral-100 rounded text-xs"
                >
                  + Add Parameter
                </button>
              </div>
            </div>
            
            {/* Parameter items */}
            {parameters.map((param, index) => (
              <div key={index} className="self-stretch flex flex-col gap-2 mb-4 p-3 bg-neutral-50 rounded-xl">
                <div className="flex gap-2">
                  <input
                    className="flex-1 h-10 px-3 py-2 bg-white rounded-xl outline outline-1 outline-gray-200 text-sm"
                    placeholder="Name (e.g. latitude)"
                    value={param.name}
                    onChange={(e) => updateParameter(index, "name", e.target.value)}
                  />
                  <select
                    className="h-10 px-3 py-2 bg-white rounded-xl outline outline-1 outline-gray-200 text-sm"
                    value={param.type}
                    onChange={(e) => updateParameter(index, "type", e.target.value)}
                  >
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="boolean">boolean</option>
                    <option value="object">object</option>
                    <option value="array">array</option>
                  </select>
                </div>
                <input
                  className="w-full h-10 px-3 py-2 bg-white rounded-xl outline outline-1 outline-gray-200 text-sm"
                  placeholder="Description"
                  value={param.description}
                  onChange={(e) => updateParameter(index, "description", e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={param.required}
                    onChange={(e) => updateParameter(index, "required", e.target.checked)}
                    id={`required-${index}`}
                  />
                  <label htmlFor={`required-${index}`} className="text-sm">Required</label>
                  <div className="flex-1"></div>
                  <button 
                    onClick={() => removeParameter(index)}
                    className="px-2 py-1 bg-red-50 text-red-500 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fixed Parameters section */}
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch h-12 py-5 border-b-1 inline-flex justify-start items-center gap-5">
                <div className="flex-1 justify-end text-gray-700 text-sm font-normal font-['Inter'] leading-none">Default/Fixed Parameters</div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch h-32 px-5 py-5 bg-neutral-50 rounded-xl outline outline-1 outline-offset-[-1.14px] outline-gray-200 inline-flex justify-start items-start gap-5">
                <textarea 
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm font-normal font-['Inter'] resize-none h-full"
                  placeholder='{"param1": "value1", "param2": "value2"}'
                  value={fixedParams}
                  onChange={(e) => setFixedParams(e.target.value)}
                />
              </div>
              <div className="self-stretch justify-end text-zinc-500 text-xs font-normal font-['Inter'] leading-none">Default/Fixed parameters are used for values that are not dynamically filled. They will be overwritten if the same fields are filled dynamically! Example: API Key</div>
            </div>
          </div>
          
          <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-slate-200" />
          
          {/* Action buttons */}
          <div className="self-stretch inline-flex justify-end items-center gap-2">
            <button 
              onClick={() => setOpen(false)}
              className="self-stretch px-5 py-3 bg-white rounded-xl border border-neutral-200 flex justify-center items-center"
            >
              <div className="text-center text-neutral-900 text-base font-medium font-['Inter'] leading-none">Cancel</div>
            </button>
            <button 
              onClick={handleSave}
              className="h-11 px-5 py-3 bg-neutral-900 rounded-xl flex justify-center items-center"
            >
              <div className="text-center text-white text-base font-medium font-['Inter'] leading-none">Save</div>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddToolModal;
