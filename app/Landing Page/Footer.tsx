import Link from "next/link";

const Footer = () => {
    return (
        <>
            <div className="bg-black-900 h-full pb-20 pt-12">
                <div className="w-[90%] md:w-[80%] mx-auto">
                    <div className="w-full inline-flex flex-col gap-6 overflow-hidden">
                        <Link href="/" className="text-white text-3xl font-semibold font-['Outfit'] leading-9 hover:text-gray-300 transition-colors">Transkript ai</Link>
                    </div>
                    <div className="pt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="text-white text-lg font-semibold font-['Outfit'] leading-relaxed">Pages</div>
                            <Link href="/" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">Welcome to Transkript</Link>
                            <Link href="/integrations" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">SIP & Call Dialer Integration</Link>
                            <Link href="/pricing" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">Choose Your Plan</Link>
                            <Link href="/contact" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">We&apos;re Here to Help</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-white text-lg font-semibold font-['Outfit'] leading-relaxed">Useful links</div>
                            <Link href="/privacy-policy" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">Privacy policy</Link>
                            <Link href="/terms" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">Terms & Conditions</Link>
                            <Link href="/contact" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">Contact Us</Link>
                        </div>
                        <div className="flex flex-col gap-4 mt-6 md:mt-0">
                            <div className="text-white text-lg font-semibold font-['Outfit'] leading-relaxed">Connect</div>
                            <Link href="https://twitter.com/transkriptai" target="_blank" rel="noopener noreferrer" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">Twitter</Link>
                            <Link href="https://linkedin.com/company/transkriptai" target="_blank" rel="noopener noreferrer" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">LinkedIn</Link>
                            <Link href="https://facebook.com/transkriptai" target="_blank" rel="noopener noreferrer" className="text-neutral-100 text-sm font-normal font-['Outfit'] leading-snug hover:text-white transition-colors hover:underline">Facebook</Link>
                        </div>
                    </div>
                    <div className="text-neutral-100 text-xs font-normal font-['Outfit'] mt-12 text-center">
                        © {new Date().getFullYear()} Transkript AI. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;