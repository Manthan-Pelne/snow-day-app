import dynamic from 'next/dynamic';
import ContactForm from "./ContactForm"
import Image from "next/image"
const Snowfall = dynamic(() => import('@/components/snowfall'));

export const metadata = {
  title: "Contact Us - snow day prediction",
  description:
    "Have questions, feedback, or issues with snow day prediction? Contact our team and we’ll get back to you as soon as possible.",
}

export default function Page() {
  return (
    <>
          <div className="pt-20 max-w-7xl mx-auto">
            <div className="absolute top-0 left-0"> <Snowfall /></div>
            <div className=" w-full relative overflow-hidden text-foreground ">
                {/* Mobile Cloud */}
                <div className="mt-10">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="space-y-1">
                        <h1 className="text-4xl font-medium tracking-tighter">
                         Get in Touch with
                        </h1>
                        <h2 className="text-5xl tracking-tight text-blue-400">
                          Snow day Prediction
                        </h2>
                      </div>
    
                      <p className="leading-relaxed mt-2">
                       Have a question, found a bug, or want to share feedback? We’re always happy to hear from you. Our team aims to respond as quickly as possible.
                      </p>
                </div>
                <div className="min-w-2xl w-full grid place-content-center relative">
                   <div className="flex justify-center w-full ">
                  <Image
                    width={300}
                    height={180}
                    className="w-full max-w-[300px] drop-shadow-2xl relative z-10 dark:animate-pulse"
                    src="/cloud3.png"
                    alt="Snow Cloud"
                  />
                  </div>
    
                </div>
               
    
               
                </div>
    
            </div>

            <section className="">
              <div className="max-w-2xl mx-auto">
                {/* FORM CARD */}
                <div className="rounded-2xl  backdrop-blur-xl shadow-xl p-6 md:p-8">
                  <ContactForm />
                </div>

                {/* Privacy Note */}
                <p className="mt-4 text-center text-xs text-gray-500">
                  We respect your privacy. Your information will only be used to
                  respond to your message.
                </p>
              </div>
            </section>
          </div>
    </>
  )
}
