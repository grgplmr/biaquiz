<?php
if (!defined('ABSPATH')) exit;

$categories = get_terms(array('taxonomy' => 'biaquiz_category', 'hide_empty' => false));
?>

<div id="biaquiz-app" class="biaquiz-frontend">
    <div class="biaquiz-loading" id="biaquiz-loading">
        <div class="biaquiz-spinner"></div>
        <p>Chargement...</p>
    </div>
    
    <!-- Home View -->
    <div id="biaquiz-home" class="biaquiz-view biaquiz-active">
        <div class="biaquiz-header">
            <div class="biaquiz-logo">
                <div class="biaquiz-logo-icon">✈️</div>
                <div class="biaquiz-logo-text">
                    <h1>ACME BIAQuiz</h1>
                    <p>Entraînement au Brevet d'Initiation à l'Aéronautique</p>
                </div>
            </div>
        </div>
        
        <div class="biaquiz-intro">
            <h2>Préparez votre BIA efficacement</h2>
            <p>Entrainez-vous avec nos quiz thématiques interactifs. Aucune inscription requise, correction immédiate et répétition des erreurs jusqu'à la maîtrise parfaite.</p>
        </div>
        
        <div class="biaquiz-stats">
            <div class="biaquiz-stat">
                <div class="biaquiz-stat-number"><?php echo count($categories); ?></div>
                <div class="biaquiz-stat-label">Catégories disponibles</div>
            </div>
            <div class="biaquiz-stat">
                <div class="biaquiz-stat-number">60+</div>
                <div class="biaquiz-stat-label">Questions d'entraînement</div>
            </div>
            <div class="biaquiz-stat">
                <div class="biaquiz-stat-number">100%</div>
                <div class="biaquiz-stat-label">Score requis pour valider</div>
            </div>
        </div>
        
        <div class="biaquiz-categories">
            <h3>Choisissez votre domaine d'entraînement</h3>
            <div class="biaquiz-categories-grid">
                <?php foreach ($categories as $category): 
                    $args = array(
                        'post_type' => 'biaquiz',
                        'tax_query' => array(
                            array(
                                'taxonomy' => 'biaquiz_category',
                                'field' => 'term_id',
                                'terms' => $category->term_id
                            )
                        )
                    );
                    $category_quizzes = get_posts($args);
                    $count = count($category_quizzes);
                    
                    $icons = array(
                        'aerodynamics' => '✈️',
                        'aircraft' => '⚙️',
                        'meteorology' => '☁️',
                        'navigation' => '🧭',
                        'history' => '🚀',
                        'english' => '🌐'
                    );
                    $icon = isset($icons[$category->slug]) ? $icons[$category->slug] : '📚';
                ?>
                <div class="biaquiz-category-card" data-category="<?php echo esc_attr($category->slug); ?>">
                    <div class="biaquiz-category-icon"><?php echo $icon; ?></div>
                    <h4><?php echo esc_html($category->name); ?></h4>
                    <p><?php echo esc_html($category->description); ?></p>
                    <div class="biaquiz-category-count"><?php echo $count; ?> quiz disponible<?php echo $count > 1 ? 's' : ''; ?></div>
                    <div class="biaquiz-category-action">Commencer l'entraînement →</div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="biaquiz-info">
            <div class="biaquiz-info-section">
                <h4>Comment ça marche ?</h4>
                <ol>
                    <li>Choisissez une catégorie selon vos besoins de révision</li>
                    <li>Répondez aux 20 questions du quiz sélectionné</li>
                    <li>Reprenez les questions ratées jusqu'à obtenir 20/20</li>
                </ol>
            </div>
            <div class="biaquiz-info-section">
                <h4>Avantages</h4>
                <ul>
                    <li>✅ Accès immédiat sans inscription</li>
                    <li>✅ Correction et explication instantanées</li>
                    <li>✅ Répétition intelligente des erreurs</li>
                    <li>✅ Interface responsive et intuitive</li>
                    <li>✅ Contenu officiel conforme au BIA</li>
                </ul>
            </div>
        </div>
    </div>
    
    <!-- Category View -->
    <div id="biaquiz-category" class="biaquiz-view">
        <div class="biaquiz-nav">
            <button id="back-to-home" class="biaquiz-back-btn">← Retour aux catégories</button>
        </div>
        
        <div class="biaquiz-category-header">
            <h2 id="category-title"></h2>
            <p id="category-description"></p>
            <div id="category-quiz-count" class="biaquiz-quiz-count"></div>
        </div>
        
        <div id="category-quizzes" class="biaquiz-quizzes-grid">
            <!-- Quiz cards will be populated by JavaScript -->
        </div>
    </div>
    
    <!-- Quiz View -->
    <div id="biaquiz-quiz" class="biaquiz-view">
        <div class="biaquiz-quiz-header">
            <button id="back-to-category" class="biaquiz-back-btn">← Retour</button>
            <h2 id="quiz-title"></h2>
            <div class="biaquiz-score">
                <span id="current-score">0</span>/20
            </div>
        </div>
        
        <div class="biaquiz-progress">
            <div class="biaquiz-progress-bar">
                <div id="progress-fill" class="biaquiz-progress-fill"></div>
            </div>
            <div class="biaquiz-progress-text">
                <span id="progress-text">Question 1/20</span>
                <span id="progress-percentage">0% vers 20/20</span>
            </div>
        </div>
        
        <div id="review-mode-indicator" class="biaquiz-review-indicator" style="display: none;">
            📚 Mode révision : Reprise des questions incorrectes
        </div>
        
        <div class="biaquiz-question-container">
            <div class="biaquiz-question">
                <h3 id="question-text"></h3>
            </div>
            
            <div id="question-options" class="biaquiz-options">
                <!-- Options will be populated by JavaScript -->
            </div>
            
            <div id="question-explanation" class="biaquiz-explanation" style="display: none;">
                <h4>Explication</h4>
                <p id="explanation-text"></p>
            </div>
            
            <div class="biaquiz-question-actions">
                <div class="biaquiz-question-info">
                    <span id="wrong-questions-count" class="biaquiz-wrong-count" style="display: none;"></span>
                </div>
                <div class="biaquiz-question-buttons">
                    <button id="validate-answer" class="biaquiz-btn biaquiz-btn-primary" disabled>Valider</button>
                    <button id="next-question" class="biaquiz-btn biaquiz-btn-success" style="display: none;">Question suivante</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Completion View -->
    <div id="biaquiz-completion" class="biaquiz-view">
        <div class="biaquiz-completion-content">
            <div class="biaquiz-trophy">🏆</div>
            <h2>Félicitations !</h2>
            <p>Vous avez terminé le quiz avec un score parfait</p>
            
            <div class="biaquiz-final-score">
                <div class="biaquiz-score-number">20/20</div>
                <div class="biaquiz-score-label">Score parfait !</div>
            </div>
            
            <div class="biaquiz-completion-actions">
                <button id="restart-quiz" class="biaquiz-btn biaquiz-btn-primary">🔄 Recommencer</button>
                <button id="back-to-quizzes" class="biaquiz-btn biaquiz-btn-secondary">← Retour aux quiz</button>
            </div>
        </div>
    </div>
</div>