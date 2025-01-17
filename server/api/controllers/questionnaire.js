const InterviewsData = require('../../models/Jobs');
const Roles = require('../../models/Roles');
//const QnAData = require('../../questions.json')
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const { default: mongoose } = require('mongoose');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Generative Ai Questionnaires
async function generateInterviewQuestions(req,res) {
  // const token = req.body.token;
  // if(!token)
  //   return res.status(400).json({message:'Not authorized/missing token in body'})
  const userPrompt = req.body.role;
  console.log(userPrompt)
  if (!userPrompt) {
    return res.status(400).json({ message: 'Please provide a role as a query parameter.' });
  }
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = userPrompt + `generate interview questions, as all possible rounds that exist for the role, 
  and send them as an array of multiple objects with Each object having a key named "roundName" , and another key named "questions", 
  an array of strings containing interview questions. Here's an example of the desired JSON format:
  
   [
  {
  "roundName": "Technical Screening",
  "questions": [
  "Explain the concept of React components.",
  "What is the difference between useState and useEffect hooks?"
  ]
  },
  ...etc
  ]
  
  GENERATE MAXIMUM 15 QUESTIONS. NO CODING QUESTIONS, ONLY CONCEPTUAL QUESTIONS, separated by commas in the array. Return only the JSON object without any additional text or backticks json formatting`
   const result = await model.generateContent(prompt);
   const response = await result.response;
   
   var text = response.text().replace(/```/g, "");
   text = text.replace(/json/g, "");
   text = text.replace(/JSON /g, "");
   const parsedData = JSON.parse(text);

  var interviewData = parsedData.map(round=>{
    return{
      roundName:round.roundName,
      questions:round.questions.map(question=>({
        _id:new mongoose.Types.ObjectId(),
        question:question,
        answer:``,
        feedback:``,
      }))
    };
  });
  const newInterviewData = new InterviewsData({ role: userPrompt, interviewData: interviewData });
  console.log(newInterviewData.interviewData)
  fs.writeFileSync('ques.json', JSON.stringify(newInterviewData.interviewData, null, 2));
  try {
    await newInterviewData.save();
    console.log('Interview data saved successfully!');
    res.status(201).json({ message: 'Interview questions generated and saved.', data:newInterviewData.interviewData});
  } catch (error) {
    console.error('Error saving interview data:', error);
    res.status(500).json({ message: 'Error generating interview questions.' });
  }
}

async function getRoles(req,res){
  try {
    const rolesData = await Roles.find();
    res.status(201).json(rolesData);
}
catch (e) {
    console.log('Error fetching roles',e);
    res.status(500).json({ message: 'Error fetching roles.' });
}
}

async function reviewAnswers(req, res) {
  try {
    console.log('reviewing')
    var QnAData = req.body.QnA;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    for (const round of QnAData) {
      for (const question of round.questions) {
        const prompt = `Assume you are an interviewer and now provide a concise feedback to the user like you are addressing him/her 
        on the following product management answer: ${question.answer} The answer is related to the question: ${question.question}. 
        These answers have sentiment analysis strength mentioned in the answer, separated by | followed 
        by the sentiment analysis count. if count < 0, candidate is not confident and their answers are not 
        upto the industry level plus it has several buzzwords/weak action verbs. if count == 0 then its neutral
        if count>0 then they have strong action verbs, less buzzwords and are very confident and positive. if 
        no count is found it means they did not answer the question and skipped it bcause they lack the knowledge
        mention their personality type based on these analysis as confident/nervous/average
        also, the feedback you provide must not have any formatting like asteriks or indents, send the plain text. and in the end of the feedback, 
        give a rating out of 5 for their softskills or skill area being demonstrated by the specific question and how can they improve any of the skills. If the users did not answer anything or their answer is incorrect, 
        criticize them and let them know their answer is wrong`

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const feedback = response.text().replace(/[\n\t]/g, "");
        question.feedback = feedback;
      }
    }
    console.log('all done')
    fs.writeFileSync('review.json',JSON.stringify(QnAData, null, 2));

    // overall review
    var feedbackStr='';
    for (const round of QnAData) {
      for (const question of round.questions) {
        feedbackStr+= ' ' + question.feedback;
      }
    }
    console.log(feedbackStr,'overall feedback')
    const prompt = `Based on the following feedbacks for the candidate's answers assess how prepared 
    the candidate is for the role they interviewed for and what their overall flaws are: ${feedbackStr}. 
    strictly avoid praising as candidates will not improvise then`
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const feedback = response.text().replace(/[\n\t]/g, "");
    console.log(feedback,'performance')
    res.status(200).json({ message: 'Feedback generated for answers.', data: feedback });
  } catch (error) {
    console.error('Error generating feedback:', error);
    res.status(500).json({ message: 'Error generating feedback for answers.' });
  }
}


module.exports = {generateInterviewQuestions, getRoles, reviewAnswers};