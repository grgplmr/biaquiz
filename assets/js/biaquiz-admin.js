// ACME BIAQuiz Admin JavaScript
(function($) {
    'use strict';
    
    $(document).ready(function() {

        // Import Quiz
        $('#import-quiz').on('click', function() {
            const category = $('#import-category').val();
            const data = $('#import-data').val();
            const format = $('input[name="import-format"]:checked').val();
            
            if (!category || !data.trim()) {
                showMessage('Veuillez sélectionner une catégorie et saisir des données', 'error');
                return;
            }
            
            $.ajax({
                url: biaquiz_admin_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'biaquiz_import',
                    category: category,
                    data: data,
                    format: format,
                    nonce: biaquiz_admin_ajax.nonce
                },
                beforeSend: function() {
                    $('#import-quiz').prop('disabled', true).text('Import en cours...');
                },
                success: function(response) {
                    if (response.success) {
                        showMessage('Quiz importé avec succès !', 'success');
                        $('#import-data').val('');
                        $('#import-category').val('');
                    } else {
                        showMessage(response.message || 'Erreur lors de l\'import', 'error');
                    }
                },
                error: function() {
                    showMessage('Erreur de connexion', 'error');
                },
                complete: function() {
                    $('#import-quiz').prop('disabled', false).text('Importer le quiz');
                }
            });
        });

        // Import from file
        $('#import-file').on('change', function(e) {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(ev) {
                $('#import-data').val(ev.target.result);
            };
            reader.readAsText(file);

            const ext = file.name.split('.').pop().toLowerCase();
            if (ext === 'json') {
                $('input[name="import-format"][value="json"]').prop('checked', true).trigger('change');
            } else if (ext === 'csv') {
                $('input[name="import-format"][value="csv"]').prop('checked', true).trigger('change');
            }
        });
        
        // Export Quiz
        $('#export-quiz').on('click', function() {
            const category = $('#export-category').val();
            
            if (!category) {
                showMessage('Veuillez sélectionner une catégorie', 'error');
                return;
            }
            
            $.ajax({
                url: biaquiz_admin_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'biaquiz_export',
                    category: category,
                    nonce: biaquiz_admin_ajax.nonce
                },
                beforeSend: function() {
                    $('#export-quiz').prop('disabled', true).text('Export en cours...');
                },
                success: function(response) {
                    if (response.success) {
                        downloadCSV(response.data, `quiz_${category}_${new Date().toISOString().split('T')[0]}.csv`);
                        showMessage('Export terminé avec succès !', 'success');
                    } else {
                        showMessage(response.message || 'Erreur lors de l\'export', 'error');
                    }
                },
                error: function() {
                    showMessage('Erreur de connexion', 'error');
                },
                complete: function() {
                    $('#export-quiz').prop('disabled', false).text('Exporter en CSV');
                }
            });
        });
        
        // Format selection change
        $('input[name="import-format"]').on('change', function() {
            const format = $(this).val();
            if (format === 'csv') {
                $('.biaquiz-csv-template').show();
            } else {
                $('.biaquiz-csv-template').hide();
            }
        });
        
    });
    
    function showMessage(message, type) {
        const messageHtml = `<div class="biaquiz-message ${type}">${message}</div>`;
        $('#biaquiz-messages').html(messageHtml);
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            $('.biaquiz-message').fadeOut();
        }, 5000);
    }
    
    function downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    
})(jQuery);