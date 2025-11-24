
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { api } from '../services/api';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  examId: string | null;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, examId }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<boolean | null>(null);

  // Load questions when modal opens
  useEffect(() => {
    if (isOpen && examId) {
      setLoading(true);
      setError(false);
      resetQuizState();
      
      api.getQuiz(examId)
        .then(data => {
          if (data && data.length > 0) {
            setQuestions(data);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [isOpen, examId]);

  const resetQuizState = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setFeedback(null);
  };

  if (!isOpen) return null;

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    setFeedback(isCorrect);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up relative min-h-[400px]">
        
        {/* Header */}
        <div className="bg-navy p-5 flex justify-between items-center text-white border-b border-navy-light">
          <h3 className="font-bold text-lg flex items-center">
            <i className="fas fa-graduation-cap text-saffron mr-3"></i>
            Mock Quiz
          </h3>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-6">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-10">
               <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-navy mb-4"></div>
               <p className="text-gray-500">Loading your questions...</p>
             </div>
          ) : error ? (
             <div className="text-center py-10">
               <i className="fas fa-exclamation-circle text-red-400 text-4xl mb-4"></i>
               <h3 className="text-lg font-bold text-gray-800">No Quiz Available</h3>
               <p className="text-gray-500 mt-2">There are currently no active quizzes for this category.</p>
               <button onClick={onClose} className="mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium">Close</button>
             </div>
          ) : showScore ? (
            <div className="text-center py-6">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 border-4 border-gray-100">
                  <i className={`fas ${score > (questions.length / 2) ? 'fa-trophy text-yellow-500' : 'fa-book-reader text-navy'} text-4xl`}></i>
                </div>
                <h2 className="text-2xl font-bold text-navy mb-2">Quiz Completed!</h2>
                <p className="text-gray-600 mb-2">You scored</p>
                <div className="text-5xl font-extrabold text-saffron mb-2">{score}<span className="text-2xl text-gray-400">/{questions.length}</span></div>
                <p className="text-sm text-gray-500">
                  {score === questions.length ? 'Excellent work! You are ready.' : score > (questions.length / 2) ? 'Good job! Keep practicing.' : 'Keep studying, you can do better!'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button 
                  onClick={resetQuizState} 
                  className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors shadow-lg hover:shadow-xl"
                >
                  <i className="fas fa-redo-alt mr-2"></i> Try Again
                </button>
                <button 
                  onClick={onClose} 
                  className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-saffron h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,153,51,0.5)]" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {questions[currentQuestion].options.map((option, index) => {
                   let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center group relative overflow-hidden ";
                   
                   if (selectedOption === option) {
                      if (feedback === true) {
                        btnClass += "border-green-500 bg-green-50 text-green-800 font-bold";
                      } else {
                        btnClass += "border-red-500 bg-red-50 text-red-800 font-bold";
                      }
                   } else if (selectedOption && option === questions[currentQuestion].correctAnswer) {
                      btnClass += "border-green-500 bg-green-50 text-green-800 font-bold";
                   } else {
                      btnClass += "border-gray-100 bg-white hover:border-navy hover:bg-blue-50/50 text-gray-700 hover:shadow-md";
                   }
                   
                   if (selectedOption && selectedOption !== option && option !== questions[currentQuestion].correctAnswer) {
                     btnClass += " opacity-50";
                   }

                   return (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      disabled={selectedOption !== null}
                      className={btnClass}
                    >
                      <div className="flex items-center">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mr-3 ${
                          selectedOption === option || (selectedOption && option === questions[currentQuestion].correctAnswer)
                           ? 'bg-white/50' 
                           : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-navy transition-colors'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                      
                      {selectedOption === option && (
                        <i className={`fas ${feedback ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'} text-xl`}></i>
                      )}
                      
                      {selectedOption && option === questions[currentQuestion].correctAnswer && selectedOption !== option && (
                         <i className="fas fa-check-circle text-green-600 text-xl"></i>
                      )}
                    </button>
                   );
                })}
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                 <button
                   onClick={handleNext}
                   disabled={selectedOption === null}
                   className="px-8 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
                 >
                   {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} 
                   <i className="fas fa-arrow-right"></i>
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
