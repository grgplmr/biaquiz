import React from 'react';
import { Quiz } from '../types/quiz';
import { Calendar, BookOpen } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onClick: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          20 questions
        </div>
      </div>
      
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <Calendar size={16} className="mr-2" />
        <span>Créé le {new Date(quiz.createdAt).toLocaleDateString('fr-FR')}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-600">
          <BookOpen size={16} className="mr-2" />
          <span>{quiz.questions.length} questions</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Commencer
        </button>
      </div>
    </div>
  );
};