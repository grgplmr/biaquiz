<?php
if (!defined('ABSPATH')) exit;

// Get statistics
$total_quizzes = wp_count_posts('biaquiz')->publish;
$categories = get_terms(array('taxonomy' => 'biaquiz_category', 'hide_empty' => false));
?>

<div class="wrap">
    <h1>ACME BIAQuiz - Tableau de bord</h1>
    
    <div class="biaquiz-dashboard">
        <div class="biaquiz-stats-grid">
            <div class="biaquiz-stat-card">
                <div class="biaquiz-stat-number"><?php echo $total_quizzes; ?></div>
                <div class="biaquiz-stat-label">Quiz disponibles</div>
            </div>
            
            <div class="biaquiz-stat-card">
                <div class="biaquiz-stat-number"><?php echo count($categories); ?></div>
                <div class="biaquiz-stat-label">Catégories</div>
            </div>
            
            <div class="biaquiz-stat-card">
                <div class="biaquiz-stat-number"><?php echo $total_quizzes * 20; ?></div>
                <div class="biaquiz-stat-label">Questions totales</div>
            </div>
        </div>
        
        <div class="biaquiz-categories-overview">
            <h2>Aperçu des catégories</h2>
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
            <h2>Actions rapides</h2>
            <div class="biaquiz-actions-grid">
                <a href="<?php echo admin_url('admin.php?page=biaquiz-import-export'); ?>" class="biaquiz-action-card">
                    <div class="biaquiz-action-icon">📥</div>
                    <h3>Importer un quiz</h3>
                    <p>Téléversez vos quiz au format CSV ou JSON</p>
                </a>
                
                <a href="<?php echo admin_url('post-new.php?post_type=biaquiz'); ?>" class="biaquiz-action-card">
                    <div class="biaquiz-action-icon">➕</div>
                    <h3>Créer un quiz</h3>
                    <p>Créez un nouveau quiz manuellement</p>
                </a>
                
                <a href="<?php echo admin_url('edit.php?post_type=biaquiz'); ?>" class="biaquiz-action-card">
                    <div class="biaquiz-action-icon">📋</div>
                    <h3>Gérer les quiz</h3>
                    <p>Voir et modifier tous les quiz existants</p>
                </a>
            </div>
        </div>
        
        <div class="biaquiz-shortcode-info">
            <h2>Utilisation</h2>
            <p>Pour afficher l'interface de quiz sur une page ou un article, utilisez le shortcode :</p>
            <code>[biaquiz]</code>
            
            <p>Vous pouvez également afficher une catégorie spécifique :</p>
            <code>[biaquiz category="aerodynamics"]</code>
            
            <p>Ou un quiz spécifique :</p>
            <code>[biaquiz quiz_id="123"]</code>
        </div>
    </div>
</div>