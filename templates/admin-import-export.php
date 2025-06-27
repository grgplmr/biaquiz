<?php
if (!defined('ABSPATH')) exit;

$categories = get_terms(array('taxonomy' => 'biaquiz_category', 'hide_empty' => false));
?>

<div class="wrap">
    <h1>Import / Export des Quiz</h1>
    
    <div class="biaquiz-import-export">
        <div class="biaquiz-section">
            <h2>Importer un quiz</h2>
            <div class="biaquiz-import-form">
                <table class="form-table">
                    <tr>
                        <th scope="row">Catégorie</th>
                        <td>
                            <select id="import-category" required>
                                <option value="">Sélectionner une catégorie</option>
                                <?php foreach ($categories as $category): ?>
                                <option value="<?php echo esc_attr($category->slug); ?>">
                                    <?php echo esc_html($category->name); ?>
                                </option>
                                <?php endforeach; ?>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Format</th>
                        <td>
                            <label>
                                <input type="radio" name="import-format" value="csv" checked> CSV
                            </label>
                            <label>
                                <input type="radio" name="import-format" value="json"> JSON
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Données</th>
                        <td>
                            <textarea id="import-data" rows="10" cols="80" placeholder="Collez vos données ici..."></textarea>
                            <p class="description">
                                Format CSV attendu : question,option1,option2,option3,option4,correct_answer,explanation<br>
                                Le quiz doit contenir exactement 20 questions.
                            </p>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <button type="button" id="import-quiz" class="button button-primary">Importer le quiz</button>
                </p>
            </div>
            
            <div class="biaquiz-csv-template">
                <h3>Exemple de format CSV</h3>
                <pre>question,option1,option2,option3,option4,correct_answer,explanation
"Quelle est la force qui s'oppose au mouvement d'un avion ?","La portance","La traînée","Le poids","La poussée",2,"La traînée est la force qui s'oppose au mouvement"
"La portance est générée principalement par :","Le dessous de l'aile","Le dessus de l'aile","Les deux faces","L'hélice",2,"La portance est générée par la dépression au dessus de l'aile"</pre>
            </div>
        </div>
        
        <div class="biaquiz-section">
            <h2>Exporter des quiz</h2>
            <div class="biaquiz-export-form">
                <table class="form-table">
                    <tr>
                        <th scope="row">Catégorie à exporter</th>
                        <td>
                            <select id="export-category" required>
                                <option value="">Sélectionner une catégorie</option>
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
                    <button type="button" id="export-quiz" class="button button-secondary">Exporter en CSV</button>
                </p>
            </div>
        </div>
    </div>
    
    <div id="biaquiz-messages"></div>
</div>