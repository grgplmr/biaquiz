<?php
if (!defined('ABSPATH')) exit;

$categories = get_terms(array('taxonomy' => 'biaquiz_category', 'hide_empty' => false));
?>

<div class="wrap">
    <h1><?php echo esc_html__('Import / Export des Quiz', 'acme-biaquiz'); ?></h1>
    
    <div class="biaquiz-import-export">
        <div class="biaquiz-section">
            <h2><?php echo esc_html__('Importer un quiz', 'acme-biaquiz'); ?></h2>
            <div class="biaquiz-import-form">
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php echo esc_html__('Catégorie', 'acme-biaquiz'); ?></th>
                        <td>
                            <select id="import-category" required>
                                <option value=""><?php echo esc_html__('Sélectionner une catégorie', 'acme-biaquiz'); ?></option>
                                <?php foreach ($categories as $category): ?>
                                <option value="<?php echo esc_attr($category->slug); ?>">
                                    <?php echo esc_html($category->name); ?>
                                </option>
                                <?php endforeach; ?>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php echo esc_html__('Format', 'acme-biaquiz'); ?></th>
                        <td>
                            <label>
                                <input type="radio" name="import-format" value="csv" checked> <?php echo esc_html__('CSV', 'acme-biaquiz'); ?>
                            </label>
                            <label>
                                <input type="radio" name="import-format" value="json"> <?php echo esc_html__('JSON', 'acme-biaquiz'); ?>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php echo esc_html__('Données', 'acme-biaquiz'); ?></th>
                        <td>
                            <textarea id="import-data" rows="10" cols="80" placeholder="<?php echo esc_attr__('Collez vos données ici...', 'acme-biaquiz'); ?>"></textarea>
                            <p class="description">
                                <?php echo esc_html__('Format CSV attendu : question,option1,option2,option3,option4,correct_answer,explanation', 'acme-biaquiz'); ?><br>
                                <?php echo esc_html__('Le quiz doit contenir exactement 20 questions.', 'acme-biaquiz'); ?>
                            </p>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <button type="button" id="import-quiz" class="button button-primary"><?php echo esc_html__('Importer le quiz', 'acme-biaquiz'); ?></button>
                </p>
            </div>
            
            <div class="biaquiz-csv-template">
                <h3><?php echo esc_html__('Exemple de format CSV', 'acme-biaquiz'); ?></h3>
                <pre>question,option1,option2,option3,option4,correct_answer,explanation
"Quelle est la force qui s'oppose au mouvement d'un avion ?","La portance","La traînée","Le poids","La poussée",2,"La traînée est la force qui s'oppose au mouvement"
"La portance est générée principalement par :","Le dessous de l'aile","Le dessus de l'aile","Les deux faces","L'hélice",2,"La portance est générée par la dépression au dessus de l'aile"</pre>
            </div>
        </div>
        
        <div class="biaquiz-section">
            <h2><?php echo esc_html__('Exporter des quiz', 'acme-biaquiz'); ?></h2>
            <div class="biaquiz-export-form">
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php echo esc_html__('Catégorie à exporter', 'acme-biaquiz'); ?></th>
                        <td>
                            <select id="export-category" required>
                                <option value=""><?php echo esc_html__('Sélectionner une catégorie', 'acme-biaquiz'); ?></option>
                                <?php foreach ($categories as $category): ?>
                                <option value="<?php echo esc_attr($category->slug); ?>">
                                    <?php echo esc_html($category->name); ?>
                                </option>
                                <?php endforeach; ?>
                            </select>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <button type="button" id="export-quiz" class="button button-secondary"><?php echo esc_html__('Exporter en CSV', 'acme-biaquiz'); ?></button>
                </p>
            </div>
        </div>
    </div>
    
    <div id="biaquiz-messages"></div>
</div>