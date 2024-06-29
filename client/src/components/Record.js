import React, { useState, useEffect, useRef } from "react";
import Sentiment from "sentiment";
import { FaAngleRight, FaMicrophone, FaPause, FaPlay, FaTrash } from "react-icons/fa";

const sentiment = new Sentiment();
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function InterviewRecord() {
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const timerRef = useRef(null);

  useEffect(() => {
    if (savedNotes.length > 0) {
      const results = savedNotes.map((note) => ({
        text: note,
        analysis: sentiment.analyze(note),
      }));
      setAnalysis(results);
    }
  }, [savedNotes]);

  useEffect(() => {
    handleListen();
  }, [isListening, isPaused]);

  useEffect(() => {
    if (isListening && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    if (timeLeft === 0) {
      handlePauseNote();
    }

    return () => clearInterval(timerRef.current);
  }, [isListening, isPaused, timeLeft]);

  const handleListen = () => {
    if (isListening && !isPaused) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  const handlePauseNote = () => {
    mic.stop();
    setIsPaused(true);
  };

  const handlePlayNote = () => {
    setIsPaused(false);
    setIsListening(true);
  };

  const handleClearNote = () => {
    setNote("");
    setSavedNotes("");
    setIsListening(false);
    setTimeLeft(120);
    clearInterval(timerRef.current);
  };

  console.log(analysis);

  return (
    <>
      <div className="flex justify-center flex-col items-center my-12">
        <div className="py-2 px-4 bg-blue-500 text-white rounded-full text-sm mb-4 border border-grey-300">
          <span>Question 1</span>
          <FaAngleRight />
        </div>
        <div className="w-[60%] py-8 px-4 text-center border rounded-lg shadow-lg">
          <p className="text-xl font-bold mb-6">q1.hello</p>
          <p>
              Time left: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </p>
          <div className="flex justify-center items-center">
            {isListening ? (
              <div className="flex space-x-4">
                {isPaused ? (
                  <button
                    onClick={handlePlayNote}
                    className="bg-red-700 inline-block p-3 rounded-full my-6 hover:opacity-80"
                  >
                    <FaPlay size={20} color="white" />
                  </button>
                ) : (
                  <button
                    onClick={handlePauseNote}
                    className="bg-red-700 inline-block p-3 rounded-full my-6 hover:opacity-80"
                  >
                    <FaPause size={20} color="white" />
                  </button>
                )}
                <button
                  onClick={handleClearNote}
                  disabled={!note}
                  className="bg-red-700 inline-block p-3 rounded-full my-6 hover:opacity-80"
                >
                  <FaTrash size={20} color="white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsListening(true);
                  setTimeLeft(120);
                }}
                className="bg-red-700 inline-block p-3 rounded-full my-6 hover:opacity-80"
              >
                <FaMicrophone size={20} color="white" />
              </button>
            )}
          </div>
          <hr/>
          <div className="mt-6">
            <p style={{ fontWeight: "bold" }}>{note}</p>
            
            {analysis.map((item, index) => (
              <div key={index}>
                <p>{item.text}</p>
                {/* <p>Sentiment Score: {item.analysis.score}</p> */}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleSaveNote}
          disabled={!note}
          className="inline-block p-3 rounded-full my-6 hover:opacity-80 py-2 px-4 bg-blue-500 text-white rounded-full text-sm font-semibold mb-4 border border-grey-300"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default InterviewRecord;
