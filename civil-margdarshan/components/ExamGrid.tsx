
import React, { useState, useEffect } from 'react';
import { ExamCategory } from '../types';
import QuizModal from './QuizModal';
import { api } from '../services/api';

interface ExamGridProps {
  onCategorySelect: (id: string, title: string) => void;
}

const ExamGrid: React.FC<ExamGridProps> = ({ onCategorySelect }) => {
  const [exams, setExams] = useState<ExamCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    const loadExams = async () => {
      try {
        const data = await api.getExams();
        setExams(data);
      } catch (error) {
        console.error("Failed to fetch exams", error);
      } finally {
        setLoading(false);
      }
    };
    loadExams();
  }, []);

  const handleCardClick = (id: string, title: string) => {
    onCategorySelect(id, title);
    const element = document.getElementById('downloads');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuizOpen = (e: React.MouseEvent, examId: string) => {
    e.stopPropagation();
    setSelectedQuizId(examId);
    setIsQuizOpen(true);
  };

  return (
    <section id="exams" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            Select Your <span className="text-saffron">Goal</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Click on any exam card to see relevant notes and resources.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exams.map((exam) => (
              <div 
                key={exam.id} 
                onClick={() => handleCardClick(exam.id, exam.title)}
                className="group flex flex-col bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-saffron opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="w-14 h-14 bg-navy text-white rounded-lg flex items-center justify-center text-2xl mb-6 shadow-md relative z-10">
                  <i className={`fas ${exam.icon}`}></i>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{exam.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed relative z-10">{exam.description}</p>
                
                <div className="mt-auto flex flex-col gap-3 relative z-10">
                  <span 
                    className="text-navy font-semibold text-sm group-hover:text-saffron transition-colors flex items-center justify-start hover:underline decoration-saffron underline-offset-4"
                  >
                    View Resources <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </span>
                  
                  {/* Specific Quiz Action for RPSC RAS - In a real app, this logic could be dynamic based on quiz availability */}
                  {exam.id === '1' && (
                    <button 
                      onClick={(e) => handleQuizOpen(e, exam.id)}
                      className="w-full mt-2 bg-navy text-white py-2.5 px-4 rounded-xl text-sm font-bold hover:bg-navy-light hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:bg-saffron group-hover:text-navy"
                    >
                      <i className="fas fa-brain"></i> Take Mock Quiz
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        examId={selectedQuizId}
      />
    </section>
  );
};

export default ExamGrid;
