<?php
if (!defined('ABSPATH')) exit;

// Get statistics
$total_quizzes = wp_count_posts('biaquiz')->publish;
$categories = get_terms(array('taxonomy' => 'biaquiz_category', 'hide_empty' => false));
?>

<div class="wrap">
    <h1><?php echo esc_html__('ACME BIAQuiz - Tableau de bord', 'acme-biaquiz'); ?></h1>
    
    <div class="biaquiz-dashboard">
        <div class="biaquiz-stats-grid">
            <div class="biaquiz-stat-card">
                <div class="biaquiz-stat-number"><?php echo $total_quizzes; ?></div>
                <div class="biaquiz-stat-label"><?php echo esc_html__('Quiz disponibles', 'acme-biaquiz'); ?></div>
            </div>
            
            <div class="biaquiz-stat-card">
                <div class="biaquiz-stat-number"><?php echo count($categories); ?></div>
                <div class="biaquiz-stat-label"><?php echo esc_html__('Catégories', 'acme-biaquiz'); ?></div>
            </div>
            
            <div class="biaquiz-stat-card">
                <div class="biaquiz-stat-number"><?php echo $total_quizzes * 20; ?></div>
                <div class="biaquiz-stat-label"><?php echo esc_html__('Questions totales', 'acme-biaquiz'); ?></div>
            </div>
        </div>
        
        <div class="biaquiz-categories-overview">
            <h2><?php echo esc_html__('Aperçu des catégories', 'acme-biaquiz'); ?></h2>
            <div class="biaquiz-categories-grid">
                <?php foreach ($categories as $category): 
                    $quiz_count = wp_count_posts('biaquiz');
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
                ?>
                <div class="biaquiz-category-card">
                    <h3><?php echo esc_html($category->name); ?></h3>
                    <p><?php echo esc_html($category->description); ?></p>
                    <div class="biaquiz-category-stats">
                        <span class="biaquiz-quiz-count"><?php echo $count; ?> quiz</span>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="biaquiz-quick-actions">
            <h2><?php echo esc_html__('Actions rapides', 'acme-biaquiz'); ?></h2>
            <div class="biaquiz-actions-grid">
                <a href="<?php echo admin_url('admin.php?page=biaquiz-import-export'); ?>" class="biaquiz-action-card">
                    <div class="biaquiz-action-icon">📥</div>
                    <h3><?php echo esc_html__('Importer un quiz', 'acme-biaquiz'); ?></h3>
                    <p><?php echo esc_html__('Téléversez vos quiz au format CSV ou JSON', 'acme-biaquiz'); ?></p>
                </a>
                
                <a href="<?php echo admin_url('post-new.php?post_type=biaquiz'); ?>" class="biaquiz-action-card">
                    <div class="biaquiz-action-icon">➕</div>
                    <h3><?php echo esc_html__('Créer un quiz', 'acme-biaquiz'); ?></h3>
                    <p><?php echo esc_html__('Créez un nouveau quiz manuellement', 'acme-biaquiz'); ?></p>
                </a>
                
                <a href="<?php echo admin_url('edit.php?post_type=biaquiz'); ?>" class="biaquiz-action-card">
                    <div class="biaquiz-action-icon">📋</div>
                    <h3><?php echo esc_html__('Gérer les quiz', 'acme-biaquiz'); ?></h3>
                    <p><?php echo esc_html__('Voir et modifier tous les quiz existants', 'acme-biaquiz'); ?></p>
                </a>
            </div>
        </div>
        
        <div class="biaquiz-shortcode-info">
            <h2><?php echo esc_html__('Utilisation', 'acme-biaquiz'); ?></h2>
            <p><?php echo esc_html__('Pour afficher l\'interface de quiz sur une page ou un article, utilisez le shortcode :', 'acme-biaquiz'); ?></p>
            <code>[biaquiz]</code>
            
            <p><?php echo esc_html__('Vous pouvez également afficher une catégorie spécifique :', 'acme-biaquiz'); ?></p>
            <code>[biaquiz category="aerodynamics"]</code>
            
            <p><?php echo esc_html__('Ou un quiz spécifique :', 'acme-biaquiz'); ?></p>
            <code>[biaquiz quiz_id="123"]</code>
        </div>
    </div>
</div>