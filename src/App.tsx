import React, { useState } from 'react';
import { Plane, Settings, GraduationCap } from 'lucide-react';
import { categories } from './data/categories';
import { sampleQuizzes } from './data/sampleQuizzes';
import { CategoryCard } from './components/CategoryCard';
import { QuizCard } from './components/QuizCard';
import { QuizInterface } from './components/QuizInterface';
import { AdminPanel } from './components/AdminPanel';
import { Quiz } from './types/quiz';

type AppView = 'home' | 'category' | 'quiz' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('category');
  };

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView('quiz');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory('');
    setSelectedQuiz(null);
  };

  const handleBackToCategory = () => {
    setCurrentView('category');
    setSelectedQuiz(null);
  };

  const getQuizzesByCategory = (categoryId: string) => {
    return sampleQuizzes.filter(quiz => quiz.category === categoryId);
  };

  const getCategoryById = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  // Rendu conditionnel selon la vue actuelle
  if (currentView === 'admin') {
    return <AdminPanel onBack={handleBackToHome} />;
  }

  if (currentView === 'quiz' && selectedQuiz) {
    return <QuizInterface quiz={selectedQuiz} onBack={handleBackToCategory} />;
  }

  if (currentView === 'category' && selectedCategory) {
    const category = getCategoryById(selectedCategory);
    const quizzes = getQuizzesByCategory(selectedCategory);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBackToHome}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                ← Retour aux catégories
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Settings size={20} className="mr-2" />
                Administration
              </button>
            </div>
            
            {category && (
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
                <p className="text-gray-600">{category.description}</p>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">
                    {quizzes.length} quiz disponible{quizzes.length > 1 ? 's' : ''} dans cette catégorie
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Liste des quiz */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onClick={() => handleQuizSelect(quiz)}
              />
            ))}
          </div>

          {quizzes.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">Aucun quiz disponible</h3>
              <p className="text-gray-500">Les quiz de cette catégorie seront bientôt disponibles.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vue d'accueil
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 p-3 rounded-xl mr-4">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">ACME BIAQuiz</h1>
                <p className="text-gray-600">Entraînement au Brevet d'Initiation à l'Aéronautique</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('admin')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              <Settings size={20} className="mr-2" />
              Administration
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Présentation */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Préparez votre BIA efficacement
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Entrainez-vous avec nos quiz thématiques interactifs. Aucune inscription requise, 
            correction immédiate et répétition des erreurs jusqu'à la maîtrise parfaite.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
            <div className="text-gray-600">Catégories disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">60+</div>
            <div className="text-gray-600">Questions d'entraînement</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Score requis pour valider</div>
          </div>
        </div>

        {/* Catégories */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Choisissez votre domaine d'entraînement
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                quizCount={getQuizzesByCategory(category.id).length}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer informations */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Comment ça marche ?</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
                  Choisissez une catégorie selon vos besoins de révision
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
                  Répondez aux 20 questions du quiz sélectionné
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
                  Reprenez les questions ratées jusqu'à obtenir 20/20
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Avantages</h4>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Accès immédiat sans inscription</li>
                <li>✅ Correction et explication instantanées</li>
                <li>✅ Répétition intelligente des erreurs</li>
                <li>✅ Interface responsive et intuitive</li>
                <li>✅ Contenu officiel conforme au BIA</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;