import React, { useState, useEffect } from 'react';
import { Quiz, Question, QuizSession, QuizAttempt } from '../types/quiz';
import { CheckCircle, XCircle, RotateCcw, Trophy, ArrowLeft } from 'lucide-react';

interface QuizInterfaceProps {
  quiz: Quiz;
  onBack: () => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({ quiz, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [session, setSession] = useState<QuizSession>({
    quizId: quiz.id,
    attempts: [],
    score: 0,
    completed: false,
    startTime: new Date()
  });
  const [wrongQuestions, setWrongQuestions] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isReviewingWrongAnswers, setIsReviewingWrongAnswers] = useState(false);
  const [questionsToReview, setQuestionsToReview] = useState<number[]>([]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAttempt = attempts.find(a => a.questionId === currentQuestion.id);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleValidateAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const existingAttempt = attempts.find(a => a.questionId === currentQuestion.id);
    
    let newAttempts = [...attempts];
    
    if (existingAttempt) {
      existingAttempt.selectedAnswer = selectedAnswer;
      existingAttempt.isCorrect = isCorrect;
      existingAttempt.attempts += 1;
    } else {
      newAttempts.push({
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect,
        attempts: 1
      });
    }
    
    setAttempts(newAttempts);
    setShowResult(true);

    // Si c'est une mauvaise réponse et qu'on n'est pas en mode révision
    if (!isCorrect && !isReviewingWrongAnswers) {
      if (!wrongQuestions.includes(currentQuestionIndex)) {
        setWrongQuestions([...wrongQuestions, currentQuestionIndex]);
      }
    }
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (!isReviewingWrongAnswers) {
      // Mode normal : parcourir toutes les questions
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Fin du premier passage, vérifier s'il y a des erreurs
        if (wrongQuestions.length > 0) {
          // Commencer la révision des mauvaises réponses
          setIsReviewingWrongAnswers(true);
          setQuestionsToReview([...wrongQuestions]);
          setCurrentQuestionIndex(wrongQuestions[0]);
          setWrongQuestions([]); // Reset pour la prochaine série
        } else {
          // Aucune erreur, quiz terminé
          completeQuiz();
        }
      }
    } else {
      // Mode révision des mauvaises réponses
      if (isCorrect) {
        // Bonne réponse, retirer de la liste à réviser
        const remainingQuestions = questionsToReview.filter(q => q !== currentQuestionIndex);
        setQuestionsToReview(remainingQuestions);
        
        if (remainingQuestions.length > 0) {
          // Il reste des questions à réviser
          setCurrentQuestionIndex(remainingQuestions[0]);
        } else {
          // Plus de questions à réviser, vérifier s'il y a de nouvelles erreurs
          if (wrongQuestions.length > 0) {
            // Il y a de nouvelles erreurs, continuer la révision
            setQuestionsToReview([...wrongQuestions]);
            setCurrentQuestionIndex(wrongQuestions[0]);
            setWrongQuestions([]);
          } else {
            // Aucune nouvelle erreur, quiz terminé
            completeQuiz();
          }
        }
      } else {
        // Mauvaise réponse, ajouter aux questions à revoir plus tard
        if (!wrongQuestions.includes(currentQuestionIndex)) {
          setWrongQuestions([...wrongQuestions, currentQuestionIndex]);
        }
        
        // Passer à la question suivante dans la liste de révision
        const remainingQuestions = questionsToReview.filter(q => q !== currentQuestionIndex);
        setQuestionsToReview(remainingQuestions);
        
        if (remainingQuestions.length > 0) {
          setCurrentQuestionIndex(remainingQuestions[0]);
        } else {
          // Plus de questions dans cette série, mais il y a de nouvelles erreurs
          if (wrongQuestions.length > 0) {
            setQuestionsToReview([...wrongQuestions, currentQuestionIndex]);
            setCurrentQuestionIndex(wrongQuestions[0]);
            setWrongQuestions([]);
          }
        }
      }
    }
    
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const completeQuiz = () => {
    setIsCompleted(true);
    setSession(prev => ({
      ...prev,
      completed: true,
      endTime: new Date(),
      score: 20
    }));
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAttempts([]);
    setWrongQuestions([]);
    setQuestionsToReview([]);
    setIsReviewingWrongAnswers(false);
    setIsCompleted(false);
    setSession({
      quizId: quiz.id,
      attempts: [],
      score: 0,
      completed: false,
      startTime: new Date()
    });
  };

  const getCorrectAnswersCount = () => {
    return attempts.filter(a => a.isCorrect).length;
  };

  const getProgressPercentage = () => {
    if (!isReviewingWrongAnswers) {
      // Mode normal : progression basée sur les questions parcourues
      return ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
    } else {
      // Mode révision : progression basée sur les bonnes réponses obtenues
      return (getCorrectAnswersCount() / quiz.questions.length) * 100;
    }
  };

  const getTotalQuestionsAnswered = () => {
    return attempts.length;
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Félicitations !</h2>
            <p className="text-gray-600">Vous avez terminé le quiz avec un score parfait</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-green-600 mb-2">20/20</div>
            <p className="text-green-700">Score parfait !</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              <RotateCcw size={20} className="mr-2" />
              Recommencer
            </button>
            
            <button
              onClick={onBack}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour aux quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour
            </button>
            <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
            <div className="text-right">
              <div className="text-sm text-gray-600">Bonnes réponses</div>
              <div className="text-lg font-bold text-blue-600">{getCorrectAnswersCount()}/20</div>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>
              {isReviewingWrongAnswers 
                ? `Révision - Question ${currentQuestionIndex + 1}` 
                : `Question ${currentQuestionIndex + 1}/${quiz.questions.length}`
              }
            </span>
            <span>{Math.round(getProgressPercentage())}% vers 20/20</span>
          </div>
          
          {/* Indicateur de mode */}
          {isReviewingWrongAnswers && (
            <div className="mt-3 bg-orange-100 border border-orange-200 rounded-lg p-3">
              <p className="text-orange-800 text-sm font-medium">
                📚 Mode révision : Reprise des questions incorrectes
                {questionsToReview.length > 0 && (
                  <span className="ml-2">({questionsToReview.length + wrongQuestions.length} restante{questionsToReview.length + wrongQuestions.length > 1 ? 's' : ''})</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options de réponse */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border rounded-lg transition-all duration-300 font-medium ";
              
              if (showResult) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += "bg-green-100 border-green-500 text-green-800 ";
                } else if (index === selectedAnswer) {
                  buttonClass += "bg-red-100 border-red-500 text-red-800 ";
                } else {
                  buttonClass += "bg-gray-50 border-gray-200 text-gray-600 ";
                }
              } else if (selectedAnswer === index) {
                buttonClass += "bg-blue-100 border-blue-500 text-blue-800 ";
              } else {
                buttonClass += "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 ";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="ml-auto text-green-600" size={20} />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                      <XCircle className="ml-auto text-red-600" size={20} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explication */}
          {showResult && currentQuestion.explanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-800 mb-2">Explication</h4>
              <p className="text-blue-700">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              {(wrongQuestions.length > 0 || questionsToReview.length > 0) && (
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  {wrongQuestions.length + questionsToReview.length} question{wrongQuestions.length + questionsToReview.length > 1 ? 's' : ''} à revoir
                </div>
              )}
            </div>
            
            <div className="space-x-3">
              {!showResult ? (
                <button
                  onClick={handleValidateAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Valider
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  {selectedAnswer === currentQuestion.correctAnswer 
                    ? 'Question suivante'
                    : 'Continuer'
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};