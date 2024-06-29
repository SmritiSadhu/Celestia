import React, { useState } from 'react'
import robot from "../assets/robot.png"
import { useLocation } from 'react-router-dom';

const PerformanceAnalysis = () => {
  const location = useLocation();
  const feedbackData = location.state

  console.log(feedbackData)
  const formatFeedback = (feedback) => {
    return feedback
      .replace('**Preparedness for the Role:**', '<p class="font-bold mt-4">Preparedness for the Role:</p>')
      .replace('**Overall Flaws:**', '<p class="font-bold mt-4">Overall Flaws:</p>')
      .replace('**Soft Skills:**', '<p class="font-bold mt-4">Soft Skills:</p>')
      .replace('**Communication:**', '<p class="font-bold mt-4">Communication:</p>')
      .replace('**Suggestions for Improvement:**', '<p class="font-bold mt-4">Suggestions for Improvement:</p>')
      .replace('**Other:**', '<p class="font-bold mt-4">Other:</p>')
      .replace(/\* /g, '<li class="ml-4 list-disc">')
  };

  const formattedFeedback = formatFeedback(feedbackData.data);
  return (
    <div className="flex justify-center items-center my-12 flex-col">
      <h2 className="text-4xl font-bold text-primary mb-8">Performance Analysis</h2>
      <div className="w-[60%] rounded-lg p-3 shadow-neumorphic cursor-pointer text-center">
        {/* mapping of ques */}
        
          <div className="flex justify-center flex-col items-center text-left">
          <div className='w-[250px]'>
          <img src={robot} alt='robot' />
          </div>
        
        {/* <span className='text-red-700 text-2xl font-semibold mb-6'>Outstanding!</span> */}
            <span className='text-gray-700' dangerouslySetInnerHTML={{ __html: formattedFeedback }}>
            
            </span>
          </div>
     
      </div>
    </div>
  )
}

export default PerformanceAnalysis