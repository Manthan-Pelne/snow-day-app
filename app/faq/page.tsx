import React from 'react'
import FaqContent from './faqContent'

export const metadata = {
  title: "Frequently Asked Questions - Snow Day Predictor",
  description:
    "Common questions about snow day chances, how our predictor works, and the accuracy of our weather data.",
};


const page = () => {
  return (
    <div>
      <FaqContent/>
    </div>
  )
}

export default page