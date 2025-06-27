<?php
if (!defined('ABSPATH')) exit;

$categories = get_terms(array('taxonomy' => 'biaquiz_category', 'hide_empty' => false));
?>

<div id="biaquiz-app" class="biaquiz-frontend">
    <div class="biaquiz-loading" id="biaquiz-loading">
        <div class="biaquiz-spinner"></div>
        <p><?php echo esc_html__('Chargement...', 'acme-biaquiz'); ?></p>
    </div>
    
    <!-- Home View -->
    <div id="biaquiz-home" class="biaquiz-view biaquiz-active">
        <div class="biaquiz-header">
            <div class="biaquiz-logo">
                <div class="biaquiz-logo-icon">✈️</div>
                <div class="biaquiz-logo-text">
                    <h1><?php echo esc_html__('ACME BIAQuiz', 'acme-biaquiz'); ?></h1>
                    <p><?php echo esc_html__('Entraînement au Brevet d\'Initiation à l\'Aéronautique', 'acme-biaquiz'); ?></p>
                </div>
            </div>
        </div>
        
        <div class="biaquiz-intro">
            <h2><?php echo esc_html__('Préparez votre BIA efficacement', 'acme-biaquiz'); ?></h2>
            <p><?php echo esc_html__('Entrainez-vous avec nos quiz thématiques interactifs. Aucune inscription requise, correction immédiate et répétition des erreurs jusqu\'à la maîtrise parfaite.', 'acme-biaquiz'); ?></p>
        </div>
        
        <div class="biaquiz-stats">
            <div class="biaquiz-stat">
                <div class="biaquiz-stat-number"><?php echo count($categories); ?></div>
                <div class="biaquiz-stat-label"><?php echo esc_html__('Catégories disponibles', 'acme-biaquiz'); ?></div>
            </div>
            <div class="biaquiz-stat">
                <div class="biaquiz-stat-number">60+</div>
                <div class="biaquiz-stat-label"><?php echo esc_html__('Questions d\'entraînement', 'acme-biaquiz'); ?></div>
            </div>
            <div class="biaquiz-stat">
                <div class="biaquiz-stat-number">100%</div>
                <div class="biaquiz-stat-label"><?php echo esc_html__('Score requis pour valider', 'acme-biaquiz'); ?></div>
            </div>
        </div>
        
        <div class="biaquiz-categories">
            <h3><?php echo esc_html__('Choisissez votre domaine d\'entraînement', 'acme-biaquiz'); ?></h3>
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
                    <div class="biaquiz-category-count"><?php echo $count; ?> <?php echo esc_html__('quiz disponible', 'acme-biaquiz'); ?><?php echo $count > 1 ? esc_html__('s', 'acme-biaquiz') : ''; ?></div>
                    <div class="biaquiz-category-action"><?php echo esc_html__('Commencer l\'entraînement →', 'acme-biaquiz'); ?></div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="biaquiz-info">
            <div class="biaquiz-info-section">
                <h4><?php echo esc_html__('Comment ça marche ?', 'acme-biaquiz'); ?></h4>
                <ol>
                    <li><?php echo esc_html__('Choisissez une catégorie selon vos besoins de révision', 'acme-biaquiz'); ?></li>
                    <li><?php echo esc_html__('Répondez aux 20 questions du quiz sélectionné', 'acme-biaquiz'); ?></li>
                    <li><?php echo esc_html__('Reprenez les questions ratées jusqu\'à obtenir 20/20', 'acme-biaquiz'); ?></li>
                </ol>
            </div>
            <div class="biaquiz-info-section">
                <h4><?php echo esc_html__('Avantages', 'acme-biaquiz'); ?></h4>
                <ul>
                    <li><?php echo esc_html__('✅ Accès immédiat sans inscription', 'acme-biaquiz'); ?></li>
                    <li><?php echo esc_html__('✅ Correction et explication instantanées', 'acme-biaquiz'); ?></li>
                    <li><?php echo esc_html__('✅ Répétition intelligente des erreurs', 'acme-biaquiz'); ?></li>
                    <li><?php echo esc_html__('✅ Interface responsive et intuitive', 'acme-biaquiz'); ?></li>
                    <li><?php echo esc_html__('✅ Contenu officiel conforme au BIA', 'acme-biaquiz'); ?></li>
                </ul>
            </div>
        </div>
    </div>
    
    <!-- Category View -->
    <div id="biaquiz-category" class="biaquiz-view">
        <div class="biaquiz-nav">
            <button id="back-to-home" class="biaquiz-back-btn">← <?php echo esc_html__('Retour aux catégories', 'acme-biaquiz'); ?></button>
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
            <button id="back-to-category" class="biaquiz-back-btn">← <?php echo esc_html__('Retour', 'acme-biaquiz'); ?></button>
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
                <span id="progress-text"><?php echo esc_html__('Question 1/20', 'acme-biaquiz'); ?></span>
                <span id="progress-percentage">0% <?php echo esc_html__('vers 20/20', 'acme-biaquiz'); ?></span>
            </div>
        </div>
        
        <div id="review-mode-indicator" class="biaquiz-review-indicator" style="display: none;">
            📚 <?php echo esc_html__('Mode révision : Reprise des questions incorrectes', 'acme-biaquiz'); ?>
        </div>
        
        <div class="biaquiz-question-container">
            <div class="biaquiz-question">
                <h3 id="question-text"></h3>
            </div>
            
            <div id="question-options" class="biaquiz-options">
                <!-- Options will be populated by JavaScript -->
            </div>
            
            <div id="question-explanation" class="biaquiz-explanation" style="display: none;">
                <h4><?php echo esc_html__('Explication', 'acme-biaquiz'); ?></h4>
                <p id="explanation-text"></p>
            </div>
            
            <div class="biaquiz-question-actions">
                <div class="biaquiz-question-info">
                    <span id="wrong-questions-count" class="biaquiz-wrong-count" style="display: none;"></span>
                </div>
                <div class="biaquiz-question-buttons">
                    <button id="validate-answer" class="biaquiz-btn biaquiz-btn-primary" disabled><?php echo esc_html__('Valider', 'acme-biaquiz'); ?></button>
                    <button id="next-question" class="biaquiz-btn biaquiz-btn-success" style="display: none;"><?php echo esc_html__('Question suivante', 'acme-biaquiz'); ?></button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Completion View -->
    <div id="biaquiz-completion" class="biaquiz-view">
        <div class="biaquiz-completion-content">
            <div class="biaquiz-trophy">🏆</div>
            <h2><?php echo esc_html__('Félicitations !', 'acme-biaquiz'); ?></h2>
            <p><?php echo esc_html__('Vous avez terminé le quiz avec un score parfait', 'acme-biaquiz'); ?></p>
            
            <div class="biaquiz-final-score">
                <div class="biaquiz-score-number">20/20</div>
                <div class="biaquiz-score-label"><?php echo esc_html__('Score parfait !', 'acme-biaquiz'); ?></div>
            </div>
            
            <div class="biaquiz-completion-actions">
                <button id="restart-quiz" class="biaquiz-btn biaquiz-btn-primary">🔄 <?php echo esc_html__('Recommencer', 'acme-biaquiz'); ?></button>
                <button id="back-to-quizzes" class="biaquiz-btn biaquiz-btn-secondary">← <?php echo esc_html__('Retour aux quiz', 'acme-biaquiz'); ?></button>
            </div>
        </div>
    </div>
</div>