<?php
/**
 * Plugin Name: ACME BIAQuiz
 * Plugin URI: https://example.com/acme-biaquiz
 * Description: Application d'entraînement au Brevet d'Initiation à l'Aéronautique (BIA) avec quiz thématiques interactifs
 * Version: 1.0.0
 * Author: ACME
 * License: GPL v2 or later
 * Text Domain: acme-biaquiz
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ACME_BIAQUIZ_VERSION', '1.0.0');
define('ACME_BIAQUIZ_PLUGIN_URL', plugin_dir_url(__FILE__));
define('ACME_BIAQUIZ_PLUGIN_PATH', plugin_dir_path(__FILE__));

class ACME_BIAQuiz {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('wp_ajax_biaquiz_import', array($this, 'handle_import'));
        add_action('wp_ajax_biaquiz_export', array($this, 'handle_export'));
        add_action('wp_ajax_biaquiz_get_quiz', array($this, 'get_quiz_data'));
        add_action('wp_ajax_nopriv_biaquiz_get_quiz', array($this, 'get_quiz_data'));
        add_action('wp_ajax_biaquiz_get_category_quizzes', array($this, 'get_category_quizzes'));
        add_action('wp_ajax_nopriv_biaquiz_get_category_quizzes', array($this, 'get_category_quizzes'));
        add_shortcode('biaquiz', array($this, 'shortcode'));
        
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        $this->create_post_types();
        $this->create_taxonomies();
        load_plugin_textdomain('acme-biaquiz', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function create_post_types() {
        // Quiz Post Type
        register_post_type('biaquiz', array(
            'labels' => array(
                'name' => __('Quiz BIA', 'acme-biaquiz'),
                'singular_name' => __('Quiz', 'acme-biaquiz'),
                'add_new' => __('Ajouter un Quiz', 'acme-biaquiz'),
                'add_new_item' => __('Ajouter un nouveau Quiz', 'acme-biaquiz'),
                'edit_item' => __('Modifier le Quiz', 'acme-biaquiz'),
                'new_item' => __('Nouveau Quiz', 'acme-biaquiz'),
                'view_item' => __('Voir le Quiz', 'acme-biaquiz'),
                'search_items' => __('Rechercher des Quiz', 'acme-biaquiz'),
                'not_found' => __('Aucun quiz trouvé', 'acme-biaquiz'),
                'not_found_in_trash' => __('Aucun quiz dans la corbeille', 'acme-biaquiz')
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => false,
            'capability_type' => 'post',
            'supports' => array('title', 'custom-fields'),
            'has_archive' => false,
            'rewrite' => false
        ));
    }
    
    public function create_taxonomies() {
        // Quiz Categories
        register_taxonomy('biaquiz_category', 'biaquiz', array(
            'labels' => array(
                'name' => __('Catégories BIA', 'acme-biaquiz'),
                'singular_name' => __('Catégorie', 'acme-biaquiz'),
                'add_new_item' => __('Ajouter une catégorie', 'acme-biaquiz'),
                'edit_item' => __('Modifier la catégorie', 'acme-biaquiz'),
                'update_item' => __('Mettre à jour la catégorie', 'acme-biaquiz'),
                'search_items' => __('Rechercher des catégories', 'acme-biaquiz')
            ),
            'hierarchical' => true,
            'public' => false,
            'show_ui' => true,
            'show_admin_column' => true,
            'rewrite' => false
        ));
    }
    
    public function enqueue_scripts() {
        wp_enqueue_script('acme-biaquiz-app', ACME_BIAQUIZ_PLUGIN_URL . 'assets/js/biaquiz-app.js', array('jquery'), ACME_BIAQUIZ_VERSION, true);
        wp_enqueue_style('acme-biaquiz-style', ACME_BIAQUIZ_PLUGIN_URL . 'assets/css/biaquiz-style.css', array(), ACME_BIAQUIZ_VERSION);
        
        wp_localize_script('acme-biaquiz-app', 'biaquiz_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('biaquiz_nonce')
        ));
    }
    
    public function admin_enqueue_scripts($hook) {
        $screen = get_current_screen();
        if ($screen && ($screen->id === 'biaquiz_page_biaquiz-import-export' || $screen->id === 'toplevel_page_biaquiz-dashboard')) {
            wp_enqueue_script('acme-biaquiz-admin', ACME_BIAQUIZ_PLUGIN_URL . 'assets/js/biaquiz-admin.js', array('jquery'), ACME_BIAQUIZ_VERSION, true);
            wp_enqueue_style('acme-biaquiz-admin-style', ACME_BIAQUIZ_PLUGIN_URL . 'assets/css/biaquiz-admin.css', array(), ACME_BIAQUIZ_VERSION);

            wp_localize_script('acme-biaquiz-admin', 'biaquiz_admin_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('biaquiz_admin_nonce')
            ));
        }
    }
    
    public function admin_menu() {
        add_menu_page(
            __('ACME BIAQuiz', 'acme-biaquiz'),
            __('BIAQuiz', 'acme-biaquiz'),
            'manage_options',
            'biaquiz-dashboard',
            array($this, 'admin_dashboard'),
            'dashicons-welcome-learn-more',
            30
        );
        
        add_submenu_page(
            'biaquiz-dashboard',
            __('Tous les Quiz', 'acme-biaquiz'),
            __('Tous les Quiz', 'acme-biaquiz'),
            'manage_options',
            'edit.php?post_type=biaquiz'
        );
        
        add_submenu_page(
            'biaquiz-dashboard',
            __('Catégories', 'acme-biaquiz'),
            __('Catégories', 'acme-biaquiz'),
            'manage_options',
            'edit-tags.php?taxonomy=biaquiz_category&post_type=biaquiz'
        );
        
        add_submenu_page(
            'biaquiz-dashboard',
            __('Import/Export', 'acme-biaquiz'),
            __('Import/Export', 'acme-biaquiz'),
            'manage_options',
            'biaquiz-import-export',
            array($this, 'admin_import_export')
        );
    }
    
    public function admin_dashboard() {
        include ACME_BIAQUIZ_PLUGIN_PATH . 'templates/admin-dashboard.php';
    }
    
    public function admin_import_export() {
        include ACME_BIAQUIZ_PLUGIN_PATH . 'templates/admin-import-export.php';
    }
    
    public function handle_import() {
        check_ajax_referer('biaquiz_admin_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die(__('Unauthorized', 'acme-biaquiz'));
        }
        
        $category = sanitize_text_field($_POST['category']);
        $data = wp_unslash($_POST['data']);
        $format = sanitize_text_field($_POST['format']);
        
        if ($format === 'csv') {
            $result = $this->import_csv($category, $data);
        } else {
            $result = $this->import_json($category, $data);
        }
        
        wp_send_json($result);
    }
    
    private function import_csv($category, $csv_data) {
        // Split lines in a cross-platform way and trim possible CR characters
        $lines = preg_split("/\r\n|\n|\r/", trim($csv_data));
        $header_line = trim(array_shift($lines));
        // Remove potential UTF-8 BOM
        $header_line = preg_replace('/^\xEF\xBB\xBF/', '', $header_line);
        $header = str_getcsv($header_line);
        
        if (!$this->validate_csv_header($header)) {
            return array('success' => false, 'message' => __('Format CSV invalide', 'acme-biaquiz'));
        }
        
        $questions = array();
        foreach ($lines as $index => $line) {
            $line = trim($line);
            if ($line === '') {
                continue;
            }

            $data = str_getcsv($line);

            if (count($data) !== 7) {
                return array(
                    'success' => false,
                    'message' => sprintf(
                        __('Ligne %d invalide : nombre de colonnes incorrect', 'acme-biaquiz'),
                        $index + 2
                    )
                );
            }

            if (!ctype_digit(trim($data[5])) || intval($data[5]) < 1 || intval($data[5]) > 4) {
                return array(
                    'success' => false,
                    'message' => sprintf(
                        __('Ligne %d invalide : la colonne correct_answer doit être un entier de 1 à 4', 'acme-biaquiz'),
                        $index + 2
                    )
                );
            }

            $questions[] = array(
                'question' => $data[0],
                'options' => array($data[1], $data[2], $data[3], $data[4]),
                'correct_answer' => intval($data[5]) - 1, // Convert to 0-based index
                'explanation' => $data[6]
            );
        }
        
        if (count($questions) !== 20) {
            return array('success' => false, 'message' => __('Un quiz doit contenir exactement 20 questions', 'acme-biaquiz'));
        }
        
        return $this->create_quiz($category, $questions);
    }
    
    private function import_json($category, $json_data) {
        $data = json_decode($json_data, true);

        if (!$data || !isset($data['questions']) || count($data['questions']) !== 20) {
            return array('success' => false, 'message' => __('Format JSON invalide ou nombre de questions incorrect', 'acme-biaquiz'));
        }

        foreach ($data['questions'] as $index => $question) {
            if (!is_array($question)
                || !isset($question['question'])
                || !isset($question['options'])
                || !isset($question['correct_answer'])
                || !isset($question['explanation'])) {
                return array(
                    'success' => false,
                    'message' => sprintf(__('Question %d invalide', 'acme-biaquiz'), $index + 1)
                );
            }

            if (!is_array($question['options']) || count($question['options']) !== 4) {
                return array(
                    'success' => false,
                    'message' => sprintf(__('Question %d : nombre d\'options incorrect', 'acme-biaquiz'), $index + 1)
                );
            }

            foreach ($question['options'] as $opt) {
                if (!is_string($opt)) {
                    return array(
                        'success' => false,
                        'message' => sprintf(__('Question %d : option invalide', 'acme-biaquiz'), $index + 1)
                    );
                }
            }

            if (!is_numeric($question['correct_answer'])) {
                return array(
                    'success' => false,
                    'message' => sprintf(__('Question %d : réponse correcte invalide', 'acme-biaquiz'), $index + 1)
                );
            }

            $answer = intval($question['correct_answer']);
            if ($answer < 0 || $answer > 3) {
                return array(
                    'success' => false,
                    'message' => sprintf(__('Question %d : indice de réponse hors plage', 'acme-biaquiz'), $index + 1)
                );
            }
        }

        return $this->create_quiz($category, $data['questions']);
    }
    
    private function validate_csv_header($header) {
        $expected = array('question', 'option1', 'option2', 'option3', 'option4', 'correct_answer', 'explanation');

        // Normalize header labels to lowercase to avoid case issues
        $header = array_map('strtolower', $header);

        // Ensure the header contains exactly the expected columns in order
        return $header === $expected;
    }
    
    private function create_quiz($category, $questions) {
        // Get next quiz number for category
        $quiz_number = $this->get_next_quiz_number($category);
        
        // Get category term
        $term = get_term_by('slug', $category, 'biaquiz_category');
        if (!$term) {
            return array('success' => false, 'message' => __('Catégorie introuvable', 'acme-biaquiz'));
        }
        
        // Create quiz post
        $post_id = wp_insert_post(array(
            'post_title' => sprintf('Quiz %d - %s', $quiz_number, $term->name),
            'post_type' => 'biaquiz',
            'post_status' => 'publish',
            'meta_input' => array(
                'biaquiz_questions' => json_encode($questions),
                'biaquiz_quiz_number' => $quiz_number
            )
        ));
        
        if ($post_id) {
            wp_set_object_terms($post_id, $category, 'biaquiz_category');
            return array('success' => true, 'message' => __('Quiz importé avec succès', 'acme-biaquiz'));
        }
        
        return array('success' => false, 'message' => __('Erreur lors de la création du quiz', 'acme-biaquiz'));
    }
    
    private function get_next_quiz_number($category) {
        $args = array(
            'post_type' => 'biaquiz',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'biaquiz_category',
                    'field' => 'slug',
                    'terms' => $category
                )
            ),
            'meta_key' => 'biaquiz_quiz_number',
            'orderby' => 'meta_value_num',
            'order' => 'DESC'
        );
        
        $quizzes = get_posts($args);
        
        if (empty($quizzes)) {
            return 1;
        }
        
        $last_number = get_post_meta($quizzes[0]->ID, 'biaquiz_quiz_number', true);
        return intval($last_number) + 1;
    }
    
    public function handle_export() {
        check_ajax_referer('biaquiz_admin_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die(__('Unauthorized', 'acme-biaquiz'));
        }
        
        $category = sanitize_text_field($_POST['category']);
        
        $args = array(
            'post_type' => 'biaquiz',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'biaquiz_category',
                    'field' => 'slug',
                    'terms' => $category
                )
            )
        );
        
        $quizzes = get_posts($args);
        $csv_data = "question,option1,option2,option3,option4,correct_answer,explanation\n";
        
        foreach ($quizzes as $quiz) {
            $questions = json_decode(get_post_meta($quiz->ID, 'biaquiz_questions', true), true);
            
            foreach ($questions as $question) {
                $csv_data .= sprintf('"%s","%s","%s","%s","%s",%d,"%s"' . "\n",
                    str_replace('"', '""', $question['question']),
                    str_replace('"', '""', $question['options'][0]),
                    str_replace('"', '""', $question['options'][1]),
                    str_replace('"', '""', $question['options'][2]),
                    str_replace('"', '""', $question['options'][3]),
                    $question['correct_answer'] + 1, // Convert to 1-based index
                    str_replace('"', '""', $question['explanation'])
                );
            }
        }
        
        wp_send_json(array('success' => true, 'data' => $csv_data));
    }
    
    public function get_quiz_data() {
        check_ajax_referer('biaquiz_nonce', 'nonce');
        
        $quiz_id = intval($_POST['quiz_id']);
        $quiz = get_post($quiz_id);
        
        if (!$quiz || $quiz->post_type !== 'biaquiz') {
            wp_send_json_error(__('Quiz introuvable', 'acme-biaquiz'));
        }
        
        $questions = json_decode(get_post_meta($quiz_id, 'biaquiz_questions', true), true);
        
        wp_send_json_success(array(
            'id' => $quiz_id,
            'title' => $quiz->post_title,
            'questions' => $questions
        ));
    }

    public function get_category_quizzes() {
        check_ajax_referer('biaquiz_nonce', 'nonce');

        $slug = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';
        if (empty($slug)) {
            wp_send_json_error(__('Catégorie invalide', 'acme-biaquiz'));
        }

        $term = get_term_by('slug', $slug, 'biaquiz_category');
        if (!$term) {
            wp_send_json_error(__('Catégorie introuvable', 'acme-biaquiz'));
        }

        $args = array(
            'post_type' => 'biaquiz',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'biaquiz_category',
                    'field' => 'slug',
                    'terms' => $slug
                )
            ),
            'orderby' => 'date',
            'order' => 'ASC'
        );

        $posts = get_posts($args);
        $quizzes = array();

        foreach ($posts as $post) {
            $quizzes[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'created_at' => $post->post_date
            );
        }

        wp_send_json_success(array(
            'category' => array(
                'slug' => $term->slug,
                'name' => $term->name,
                'description' => $term->description
            ),
            'quizzes' => $quizzes
        ));
    }
    
    public function shortcode($atts) {
        $atts = shortcode_atts(array(
            'category' => '',
            'quiz_id' => ''
        ), $atts);
        
        ob_start();
        include ACME_BIAQUIZ_PLUGIN_PATH . 'templates/quiz-frontend.php';
        return ob_get_clean();
    }
    
    public function activate() {
        $this->init();
        flush_rewrite_rules();
        
        // Create default categories
        $categories = array(
            array(
                'slug'        => 'aerodynamics',
                'name'        => __('Aérodynamique et mécanique du vol', 'acme-biaquiz'),
                'description' => __('Principes de vol, portance, traînée, facteurs de charge', 'acme-biaquiz'),
            ),
            array(
                'slug'        => 'aircraft',
                'name'        => __('Connaissance des aéronefs', 'acme-biaquiz'),
                'description' => __('Structure, systèmes, motorisation, équipements', 'acme-biaquiz'),
            ),
            array(
                'slug'        => 'meteorology',
                'name'        => __('Météorologie', 'acme-biaquiz'),
                'description' => __('Masses d\'air, nuages, phénomènes météorologiques', 'acme-biaquiz'),
            ),
            array(
                'slug'        => 'navigation',
                'name'        => __('Navigation, règlementation et sécurité', 'acme-biaquiz'),
                'description' => __('Navigation, réglementation aérienne, sécurité des vols', 'acme-biaquiz'),
            ),
            array(
                'slug'        => 'history',
                'name'        => __('Histoire de l\'aéronautique et de l\'espace', 'acme-biaquiz'),
                'description' => __('Pionniers, évolution technologique, conquête spatiale', 'acme-biaquiz'),
            ),
            array(
                'slug'        => 'english',
                'name'        => __('Anglais aéronautique', 'acme-biaquiz'),
                'description' => __('Vocabulaire technique, phraséologie radio', 'acme-biaquiz'),
            ),
        );
        
        foreach ($categories as $category) {
            if (!term_exists($category['slug'], 'biaquiz_category')) {
                wp_insert_term($category['name'], 'biaquiz_category', array(
                    'slug' => $category['slug'],
                    'description' => $category['description']
                ));
            }
        }
    }
    
    public function deactivate() {
        flush_rewrite_rules();
    }
}

// Initialize the plugin
new ACME_BIAQuiz();
