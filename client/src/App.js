import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import GenerateTech from "./pages/generateTech";
import GenerateNontech from "./pages/generateNontech";
import Feedback from "./pages/feedback";
import InterviewRecord from "./components/Record";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  
  // const [interviewData,setInterviewData] = useState();
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [formData, setFormData] = useState({
  //   message: "",
  // });
  //const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.message.trim()) {
  //     setErrorMessage("Please describe the role, the field cannot be blank");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/questionnaire/genaiquestion",
  //       {
  //         role: formData.message,
  //       }
  //     );
     
  //     setErrorMessage(null);
      
  //     navigate("/generate", { state: response.data.data});
  //   } catch (error) {
  //     console.error("Error fetching interview questions:", error);
  //     setErrorMessage("Error generating interview questions.");
  //   }
  // };
//console.log(interviewData)
  
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech" element={<GenerateTech />} />
          <Route path="/nontech" element={<GenerateNontech />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/generate" element={<InterviewRecord />} />
          {/* {interviewData.map((question) => (
            <Route
              key={question.id}
              path={`/generate/${question.id}`}
              element={<InterviewRecord question={question} />}
            />
          ))} */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
