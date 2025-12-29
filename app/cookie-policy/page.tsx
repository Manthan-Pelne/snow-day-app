import React from 'react'
import { Typography } from "@/components/typography";

const page = () => {
  return (
    <> 
     <Typography className="max-w-5xl mx-auto md:my-12 p-3 md:px-16">
       <div className="relative z-20 mx-auto text-center text-4xl font-bold">
       <div className="pb-14 px-6 md:px-20 grid">
          <div className="grid place-content-center sm:text-center gap-2">
             <h1 className="font-secondary text-3xl text-center max-w-md sm:max-w-3xl md:max-w-5xl sm:text-4xl font-medium md:text-4xl">
               <span className="relative inline-flex w-max">
                  <div className="pointer-events-none z-10 bg-[repeating-linear-gradient(45deg,_#00000066_0px,_#00000066_1px,_transparent_1px,_transparent_6px)] dark:bg-[repeating-linear-gradient(45deg,_#ffffff66_0px,_#ffffff66_1px,_transparent_1px,_transparent_6px)] absolute top-0 right-0 w-full h-full 100 !z-0"></div>
                  <span className="relative z-20 text-primary">Cookie </span>
               </span>  
               <span className='pl-1.5'>Policy</span>
               </h1>
             <p className="md:text-xl text-base sm:text-lg text-[13.5px] max-w-sm md:max-w-5xl text-center sm:mx-auto mt-4"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus velit quia natus quidem laboriosam amet eum dolores non alias veritatis? </p>
          </div>
       </div>
    </div>
    
   <article className="text-justify space-y-5">
      <p>This Cookie Policy explains what cookies are and how we use them, the types of cookies we use i.e, the information we collect using cookies and how that information is used, and how to control the cookie preferences. For further information on how we use, store, and keep your personal data secure, see our Privacy Policy.</p>
      <p>You can at any time change or withdraw your consent from the Cookie Declaration on our website. Learn more about who we are, how you can contact us, and how we process personal data in our Privacy Policy.</p>
      <p>Your consent applies to the following domains: <a href="/" className="text-blue-600 underline">snow day prediction</a></p>
      <div>Your current state: No consent given. <a className="cursor-pointer text-blue-600 underline">Manage your consent.</a></div>
      <h2>What are cookies?</h2>
      <p>Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide better user experience, and understand how the website performs and to analyze what works and where it needs improvement.</p>
      <h2>How do we use cookies?</h2>
      <p>As most of the online services, our website uses first-party and third-party cookies for several purposes. First-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.</p>
      <p>The third-party cookies used on our website are mainly for understanding how the website performs, how you interact with our website, keeping our services secure, providing advertisements that are relevant to you, and all in all providing you with a better and improved user experience and help speed up your future interactions with our website.</p>
      <h2>What types of cookies do we use?</h2>
      <p><strong>Essential:</strong> Some cookies are essential for you to be able to experience the full functionality of our site. They allow us to maintain user sessions and prevent any security threats. They do not collect or store any personal information. For example, these cookies allow you to log-in to your account and add products to your basket, and checkout securely.</p>
      <p><strong>Statistics:</strong> These cookies store information like the number of visitors to the website, the number of unique visitors, which pages of the website have been visited, the source of the visit, etc. These data help us understand and analyze how well the website performs and where it needs improvement.</p>
      <p><strong>Marketing:</strong> Our website displays advertisements. These cookies are used to personalize the advertisements that we show to you so that they are meaningful to you. These cookies also help us keep track of the efficiency of these ad campaigns.</p>
      <p>The information stored in these cookies may also be used by the third-party ad providers to show you ads on other websites on the browser as well.</p>
      <p><strong>Functional:</strong> These are the cookies that help certain non-essential functionalities on our website. These functionalities include embedding content like videos or sharing content of the website on social media platforms.</p>
      <p><strong>Preferences:</strong> These cookies help us store your settings and browsing preferences like language preferences so that you have a better and efficient experience on future visits to the website.</p>
      <p>The below list details the cookies used in our website.</p>
      <table className="w-full border-collapse border border-gray-200 dark:border-gray-800">
         <thead>
            <tr className="bg-gray-50 dark:bg-gray-900">
               <th className="border p-2 text-left">Cookie</th>
               <th className="border p-2 text-left">Description</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td className="border p-2 font-mono text-sm">cookielawinfo-checbox-analytics</td>
               <td className="border p-2 text-sm">This cookie is set by GDPR Cookie Consent plugin. The cookie is used to store the user consent for the cookies in the category 'Analytics'.</td>
            </tr>
            <tr>
               <td className="border p-2 font-mono text-sm">cookielawinfo-checbox-functional</td>
               <td className="border p-2 text-sm">The cookie is set by GDPR cookie consent to record the user consent for the cookies in the category 'Functional'.</td>
            </tr>
            <tr>
               <td className="border p-2 font-mono text-sm">cookielawinfo-checbox-others</td>
               <td className="border p-2 text-sm">This cookie is set by GDPR Cookie Consent plugin. The cookie is used to store the user consent for the cookies in the category 'Other'.</td>
            </tr>
            <tr>
               <td className="border p-2 font-mono text-sm">cookielawinfo-checkbox-necessary</td>
               <td className="border p-2 text-sm">This cookie is set by GDPR Cookie Consent plugin. The cookies is used to store the user consent for the cookies in the category 'Necessary'.</td>
            </tr>
            <tr>
               <td className="border p-2 font-mono text-sm">cookielawinfo-checkbox-performance</td>
               <td className="border p-2 text-sm">This cookie is set by GDPR Cookie Consent plugin. The cookie is used to store the user consent for the cookies in the category 'Performance'.</td>
            </tr>
            <tr>
               <td className="border p-2 font-mono text-sm">viewed_cookie_policy</td>
               <td className="border p-2 text-sm">The cookie is set by the GDPR Cookie Consent plugin and is used to store whether or not user has consented to the use of cookies. It does not store any personal data.</td>
            </tr>
         </tbody>
      </table>
      <h2>How can I control the cookie preferences?</h2>
      <p>Should you decide to change your preferences later through your browsing session, you can click on the “Privacy &amp; Cookie Policy” tab on your screen. This will display the consent notice again enabling you to change your preferences or withdraw your consent entirely.</p>
      <p>In addition to this, different browsers provide different methods to block and delete cookies used by websites. You can change the settings of your browser to block/delete the cookies. To find out more about how to manage and delete cookies, visit <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank" rel="noopener" className="text-blue-600 underline">wikipedia.org</a>.</p>
   </article>
    </Typography>
    </>
  )
}

export default page