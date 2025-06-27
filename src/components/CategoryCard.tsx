import React from 'react';
import { QuizCategory } from '../types/quiz';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  category: QuizCategory;
  quizCount: number;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, quizCount, onClick }) => {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as any;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100 overflow-hidden"
    >
      <div className={`${category.color} h-2`}></div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`${category.color} p-3 rounded-lg mr-4 text-white`}>
            <IconComponent size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
              {quizCount} quiz disponible{quizCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{category.description}</p>
        <div className="mt-4 flex items-center text-blue-600 font-medium">
          <span>Commencer l'entraînement</span>
          <Icons.ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </div>
  );
};