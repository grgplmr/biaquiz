import React, { useState } from 'react';
import { Upload, Download, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Quiz } from '../types/quiz';
import { categories } from '../data/categories';

interface AdminPanelProps {
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [csvData, setCsvData] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleImportCSV = () => {
    if (!csvData.trim() || !selectedCategory) {
      alert('Veuillez sélectionner une catégorie et saisir des données CSV');
      return;
    }
    
    // Simulation de l'import
    alert('Quiz importé avec succès !');
    setCsvData('');
    setSelectedCategory('');
    setShowImportModal(false);
  };

  const handleExportCSV = () => {
    // Données d'exemple pour l'export
    const csvContent = `question,option1,option2,option3,option4,correct_answer,explanation
"Quelle est la force qui s'oppose au mouvement d'un avion ?","La portance","La traînée","Le poids","La poussée",2,"La traînée est la force qui s'oppose au mouvement"
"La portance est générée principalement par :","Le dessous de l'aile","Le dessus de l'aile","Les deux faces","L'hélice",2,"La portance est générée par la dépression au dessus de l'aile"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_${selectedCategory}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const csvTemplate = `question,option1,option2,option3,option4,correct_answer,explanation
"Votre question ici","Option A","Option B","Option C","Option D",1,"Explication de la réponse"
"Autre question","Option A","Option B","Option C","Option D",3,"Autre explication"`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
              >
                <ArrowLeft size={20} className="mr-2" />
                Retour
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Administration ACME BIAQuiz</h1>
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              Interface d'administration
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div
            onClick={() => setShowImportModal(true)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center mb-4">
              <Upload className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Importer un quiz</h3>
            </div>
            <p className="text-gray-600">Téléversez vos quiz au format CSV ou JSON</p>
          </div>

          <div
            onClick={() => setShowExportModal(true)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center mb-4">
              <Download className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Exporter un quiz</h3>
            </div>
            <p className="text-gray-600">Sauvegardez vos quiz au format CSV</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <Plus className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Créer un quiz</h3>
            </div>
            <p className="text-gray-600">Créez un nouveau quiz manuellement</p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistiques des quiz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                  <h4 className="font-medium text-gray-800">{category.name}</h4>
                </div>
                <div className="text-2xl font-bold text-gray-700">
                  {category.id === 'aerodynamics' ? '1' : category.id === 'aircraft' ? '1' : category.id === 'meteorology' ? '1' : '0'}
                </div>
                <div className="text-sm text-gray-600">quiz disponible(s)</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Import */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Importer un quiz</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format CSV attendu
                  </label>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                    {csvTemplate}
                  </pre>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Données CSV
                  </label>
                  <textarea
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    placeholder="Collez vos données CSV ici..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleImportCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Importer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Export */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">Exporter un quiz</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie à exporter
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleExportCSV}
                    disabled={!selectedCategory}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Exporter CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};