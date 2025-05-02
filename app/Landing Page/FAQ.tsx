import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
    const faqData = [
        {
            question: "What features does Transkript offer for call center management?",
            answer: "Transkript AI simplifies communication with a robust suite of features. The Call Flow Builder enables intuitive workflow design using customisable nodes for seamless customer interactions, while Agent Access allows efficient management of multiple agents and devices. With the Call Broadcast feature, you can reach thousands through personalised, automated bulk calling in minutes. Train the AI using your business-specific details with Tailored Training Data for smarter, more personalised interactions. Additionally, the integrated IVR & Dialer System combines dynamic IVR solutions with efficient call handling to enhance customer satisfaction and streamline operations."
        },
        {
            question: "How does the AI call assistant work?",
            answer: "The AI call assistant uses natural language processing and machine learning to understand and respond to customer inquiries. It can handle a wide range of topics and can be trained to specific business needs."
        },
        {
            question: "Can I customize call flows for different scenarios?",
            answer: "Yes, you can create and manage multiple call flows tailored to different business needs. Each flow can be customised with specific nodes and settings."
        },
        {
            question: "Do you offer a free trial?",
            answer: "Yes, we offer a free trial for all our plans. You can sign up for a free trial and see for yourself how our AI call assistant can help your business."
        },
            
    ]
    return (
        <>
            <div className='bg-black-900 mx-auto h-full pb-20 pt-12'>
                <div className="w-full inline-flex flex-col justify-start items-center gap-6 overflow-hidden">
                    <div className="self-stretch h-20 text-center justify-center text-white text-5xl font-normal font-['Inter'] leading-[61.60px]">FAQs</div>
                    <div className="w-full text-center justify-center text-white text-base font-normal font-['Inter'] leading-normal">Frequently asked questions</div>
                </div>
                <div className="mx-auto w-[90%] space-y-6 mt-24">
                    {
                        faqData.map((item, index) => (
                            <Accordion type="single" collapsible key={index}>
                                <AccordionItem value={`item-${index}`} className="bg-neutral-500/20 rounded-[10px] border-none px-10">
                            <AccordionTrigger className="text-white text-2xl font-semibold font-['Inter'] leading-9 tracking-tight [&[data-state=open]>svg]:hidden [&[data-state=open]>div]:block">
                                {item.question}
                                <div className="hidden h-4 w-4 shrink-0 text-white -mt-6">×</div>
                            </AccordionTrigger>
                            <AccordionContent className="text-white/70 text-xl font-normal font-['Inter'] leading-loose tracking-tight">
                                {item.answer}
                            </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))
                    }
                </div>
                <div className="text-center justify-center text-white text-xl font-bold font-['Inter'] leading-loose tracking-tight mt-6">Need additional information?</div>
            </div>
        </>
    );
};

export default FAQ;
