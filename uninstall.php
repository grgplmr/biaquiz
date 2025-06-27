<?php
// If uninstall not called from WordPress, exit.
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Delete all biaquiz posts and their metadata.
$posts = get_posts(
    array(
        'post_type'   => 'biaquiz',
        'numberposts' => -1,
        'post_status' => 'any',
    )
);

foreach ($posts as $post) {
    wp_delete_post($post->ID, true);
}

// Delete all terms in biaquiz_category taxonomy and their metadata.
$terms = get_terms(
    array(
        'taxonomy'   => 'biaquiz_category',
        'hide_empty' => false,
    )
);

if (!is_wp_error($terms)) {
    foreach ($terms as $term) {
        $term_meta = get_term_meta($term->term_id);
        if (!empty($term_meta)) {
            foreach (array_keys($term_meta) as $key) {
                delete_term_meta($term->term_id, $key);
            }
        }
        wp_delete_term($term->term_id, 'biaquiz_category');
    }
}

