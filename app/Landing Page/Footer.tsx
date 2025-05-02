
const Footer = () => {
    return (
        <>
            <div className="bg-black-900 h-full pb-20 pt-12">
                <div className="w-[90%] mx-auto">
                    <div className="w-full inline-flex flex-col gap-6 overflow-hidden">
                        <div className="text-white text-3xl font-semibold font-['Outfit'] leading-9">Transkript ai</div>
                    </div>
                    <div className="pt-8 grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="text-white text-lg font-semibold font-['Outfit'] leading-relaxed">Pages</div>
                            <div className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug">Welcome to Transkript</div>
                            <div className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug">SIP & Call Dialer Integration</div>
                            <div className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug">Choose Your Plan</div>
                            <div className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug">We're Here to Help</div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-white text-lg font-semibold font-['Outfit'] leading-relaxed">Useful links</div>
                            <div className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug">Privacy policy</div>
                            <div className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug">Terms & Conditions</div>
                            <div className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug">Contact Us</div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Footer;