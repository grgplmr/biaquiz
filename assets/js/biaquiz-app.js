// ACME BIAQuiz Frontend JavaScript
(function($) {
    'use strict';
    
    class BIAQuizApp {
        constructor() {
            this.currentView = 'home';
            this.selectedCategory = null;
            this.selectedQuiz = null;
            this.currentQuestionIndex = 0;
            this.selectedAnswer = null;
            this.showResult = false;
            this.attempts = [];
            this.wrongQuestions = [];
            this.questionsToReview = [];
            this.isReviewingWrongAnswers = false;
            this.isCompleted = false;
            
            this.init();
        }
        
        init() {
            this.bindEvents();
            this.loadCategories();
        }
        
        bindEvents() {
            // Category selection
            $(document).on('click', '.biaquiz-category-card', (e) => {
                const category = $(e.currentTarget).data('category');
                this.selectCategory(category);
            });
            
            // Quiz selection
            $(document).on('click', '.biaquiz-quiz-card', (e) => {
                const quizId = $(e.currentTarget).data('quiz-id');
                this.selectQuiz(quizId);
            });
            
            // Navigation
            $('#back-to-home').on('click', () => this.showView('home'));
            $('#back-to-category').on('click', () => this.showView('category'));
            $('#back-to-quizzes').on('click', () => this.showView('category'));
            
            // Quiz controls
            $(document).on('click', '.biaquiz-option', (e) => {
                if (!this.showResult) {
                    this.selectAnswer($(e.currentTarget).data('index'));
                }
            });
            
            $('#validate-answer').on('click', () => this.validateAnswer());
            $('#next-question').on('click', () => this.nextQuestion());
            $('#restart-quiz').on('click', () => this.restartQuiz());
        }
        
        loadCategories() {
            // Categories are already loaded in PHP, just show the home view
            this.showView('home');
        }
        
        selectCategory(categorySlug) {
            this.selectedCategory = categorySlug;
            this.loadCategoryQuizzes(categorySlug);
        }
        
        loadCategoryQuizzes(categorySlug) {
            $.ajax({
                url: biaquiz_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'biaquiz_get_category_quizzes',
                    category: categorySlug,
                    nonce: biaquiz_ajax.nonce
                },
                success: (response) => {
                    if (response.success) {
                        this.displayCategoryQuizzes(response.data);
                    }
                }
            });
        }
        
        displayCategoryQuizzes(data) {
            $('#category-title').text(data.category.name);
            $('#category-description').text(data.category.description);
            $('#category-quiz-count').text(`${data.quizzes.length} quiz disponible${data.quizzes.length > 1 ? 's' : ''}`);
            
            const quizzesHtml = data.quizzes.map(quiz => `
                <div class="biaquiz-quiz-card" data-quiz-id="${quiz.id}">
                    <h4>${quiz.title}</h4>
                    <div class="biaquiz-quiz-meta">
                        📅 Créé le ${new Date(quiz.created_at).toLocaleDateString('fr-FR')}
                    </div>
                    <div class="biaquiz-quiz-action">Commencer</div>
                </div>
            `).join('');
            
            $('#category-quizzes').html(quizzesHtml);
            this.showView('category');
        }
        
        selectQuiz(quizId) {
            $.ajax({
                url: biaquiz_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'biaquiz_get_quiz',
                    quiz_id: quizId,
                    nonce: biaquiz_ajax.nonce
                },
                success: (response) => {
                    if (response.success) {
                        this.selectedQuiz = response.data;
                        this.startQuiz();
                    }
                }
            });
        }
        
        startQuiz() {
            this.currentQuestionIndex = 0;
            this.selectedAnswer = null;
            this.showResult = false;
            this.attempts = [];
            this.wrongQuestions = [];
            this.questionsToReview = [];
            this.isReviewingWrongAnswers = false;
            this.isCompleted = false;
            
            $('#quiz-title').text(this.selectedQuiz.title);
            this.displayQuestion();
            this.showView('quiz');
        }
        
        displayQuestion() {
            const question = this.selectedQuiz.questions[this.currentQuestionIndex];
            
            $('#question-text').text(question.question);
            
            const optionsHtml = question.options.map((option, index) => `
                <div class="biaquiz-option" data-index="${index}">
                    <div class="biaquiz-option-letter">${String.fromCharCode(65 + index)}</div>
                    <span>${option}</span>
                    <div class="biaquiz-option-icon"></div>
                </div>
            `).join('');
            
            $('#question-options').html(optionsHtml);
            
            this.updateProgress();
            this.updateControls();
            
            // Hide explanation and reset state
            $('#question-explanation').hide();
            this.selectedAnswer = null;
            this.showResult = false;
        }
        
        selectAnswer(index) {
            this.selectedAnswer = index;
            
            $('.biaquiz-option').removeClass('selected');
            $(`.biaquiz-option[data-index="${index}"]`).addClass('selected');
            
            this.updateControls();
        }
        
        validateAnswer() {
            if (this.selectedAnswer === null) return;
            
            const question = this.selectedQuiz.questions[this.currentQuestionIndex];
            const isCorrect = this.selectedAnswer === question.correct_answer;
            
            // Update attempts
            const existingAttempt = this.attempts.find(a => a.questionId === question.id);
            if (existingAttempt) {
                existingAttempt.selectedAnswer = this.selectedAnswer;
                existingAttempt.isCorrect = isCorrect;
                existingAttempt.attempts += 1;
            } else {
                this.attempts.push({
                    questionId: question.id || this.currentQuestionIndex,
                    selectedAnswer: this.selectedAnswer,
                    isCorrect: isCorrect,
                    attempts: 1
                });
            }
            
            // Mark wrong questions for review
            if (!isCorrect && !this.isReviewingWrongAnswers) {
                if (!this.wrongQuestions.includes(this.currentQuestionIndex)) {
                    this.wrongQuestions.push(this.currentQuestionIndex);
                }
            }
            
            this.showResult = true;
            this.displayResult(question, isCorrect);
            this.updateProgress();
            this.updateControls();
        }
        
        displayResult(question, isCorrect) {
            // Update option styles
            $('.biaquiz-option').each((index, element) => {
                const optionIndex = $(element).data('index');
                
                if (optionIndex === question.correct_answer) {
                    $(element).addClass('correct');
                    $(element).find('.biaquiz-option-icon').html('✓');
                } else if (optionIndex === this.selectedAnswer) {
                    $(element).addClass('incorrect');
                    $(element).find('.biaquiz-option-icon').html('✗');
                }
            });
            
            // Show explanation
            if (question.explanation) {
                $('#explanation-text').text(question.explanation);
                $('#question-explanation').show();
            }
        }
        
        nextQuestion() {
            const isCorrect = this.selectedAnswer === this.selectedQuiz.questions[this.currentQuestionIndex].correct_answer;
            
            if (!this.isReviewingWrongAnswers) {
                // Normal mode: go through all questions
                if (this.currentQuestionIndex < this.selectedQuiz.questions.length - 1) {
                    this.currentQuestionIndex++;
                    this.displayQuestion();
                } else {
                    // End of first pass
                    if (this.wrongQuestions.length > 0) {
                        // Start reviewing wrong answers
                        this.isReviewingWrongAnswers = true;
                        this.questionsToReview = [...this.wrongQuestions];
                        this.currentQuestionIndex = this.wrongQuestions[0];
                        this.wrongQuestions = [];
                        this.displayQuestion();
                        this.updateReviewMode();
                    } else {
                        // No wrong answers, complete quiz
                        this.completeQuiz();
                    }
                }
            } else {
                // Review mode
                if (isCorrect) {
                    // Remove from review list
                    this.questionsToReview = this.questionsToReview.filter(q => q !== this.currentQuestionIndex);
                    
                    if (this.questionsToReview.length > 0) {
                        this.currentQuestionIndex = this.questionsToReview[0];
                        this.displayQuestion();
                    } else if (this.wrongQuestions.length > 0) {
                        // New wrong answers to review
                        this.questionsToReview = [...this.wrongQuestions];
                        this.currentQuestionIndex = this.wrongQuestions[0];
                        this.wrongQuestions = [];
                        this.displayQuestion();
                    } else {
                        // All questions correct
                        this.completeQuiz();
                    }
                } else {
                    // Wrong answer, add to wrong questions for later
                    if (!this.wrongQuestions.includes(this.currentQuestionIndex)) {
                        this.wrongQuestions.push(this.currentQuestionIndex);
                    }
                    
                    // Remove from current review list
                    this.questionsToReview = this.questionsToReview.filter(q => q !== this.currentQuestionIndex);
                    
                    if (this.questionsToReview.length > 0) {
                        this.currentQuestionIndex = this.questionsToReview[0];
                        this.displayQuestion();
                    } else if (this.wrongQuestions.length > 0) {
                        // Continue with new wrong answers
                        this.questionsToReview = [...this.wrongQuestions];
                        this.currentQuestionIndex = this.wrongQuestions[0];
                        this.wrongQuestions = [];
                        this.displayQuestion();
                    }
                }
            }
        }
        
        updateProgress() {
            const correctAnswers = this.getCorrectAnswersCount();
            const totalQuestions = this.selectedQuiz.questions.length;
            const percentage = (correctAnswers / totalQuestions) * 100;
            
            $('#current-score').text(correctAnswers);
            $('#progress-fill').css('width', `${percentage}%`);
            $('#progress-percentage').text(`${Math.round(percentage)}% vers 20/20`);
            
            if (!this.isReviewingWrongAnswers) {
                $('#progress-text').text(`Question ${this.currentQuestionIndex + 1}/${totalQuestions}`);
            } else {
                $('#progress-text').text(`Révision - Question ${this.currentQuestionIndex + 1}`);
            }
        }
        
        updateReviewMode() {
            if (this.isReviewingWrongAnswers) {
                const remaining = this.questionsToReview.length + this.wrongQuestions.length;
                $('#review-mode-indicator').show().html(`📚 Mode révision : Reprise des questions incorrectes${remaining > 0 ? ` (${remaining} restante${remaining > 1 ? 's' : ''})` : ''}`);
            } else {
                $('#review-mode-indicator').hide();
            }
            
            // Update wrong questions counter
            const wrongCount = this.wrongQuestions.length + this.questionsToReview.length;
            if (wrongCount > 0) {
                $('#wrong-questions-count').show().text(`${wrongCount} question${wrongCount > 1 ? 's' : ''} à revoir`);
            } else {
                $('#wrong-questions-count').hide();
            }
        }
        
        updateControls() {
            if (!this.showResult) {
                $('#validate-answer').show().prop('disabled', this.selectedAnswer === null);
                $('#next-question').hide();
            } else {
                $('#validate-answer').hide();
                $('#next-question').show().text(
                    this.selectedAnswer === this.selectedQuiz.questions[this.currentQuestionIndex].correct_answer 
                        ? 'Question suivante' 
                        : 'Continuer'
                );
            }
            
            this.updateReviewMode();
        }
        
        getCorrectAnswersCount() {
            return this.attempts.filter(a => a.isCorrect).length;
        }
        
        completeQuiz() {
            this.isCompleted = true;
            this.showView('completion');
        }
        
        restartQuiz() {
            this.startQuiz();
        }
        
        showView(viewName) {
            $('.biaquiz-view').removeClass('biaquiz-active');
            $(`#biaquiz-${viewName}`).addClass('biaquiz-active');
            this.currentView = viewName;
        }
    }
    
    // Initialize when document is ready
    $(document).ready(function() {
        new BIAQuizApp();
    });
    
})(jQuery);

// Add AJAX handler for category quizzes
jQuery(document).ready(function($) {
    // This would be handled by the PHP AJAX handlers
    $(document).ajaxSuccess(function(event, xhr, settings) {
        if (settings.data && settings.data.indexOf('biaquiz_get_category_quizzes') !== -1) {
            // Handle category quizzes response
        }
    });
});