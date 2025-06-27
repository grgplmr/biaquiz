(function($){
  'use strict';

  const quizData = window.biaquiz_data || {
    questions: []
  };
  let currentIndex = 0;

  function displayQuestion(){
    const question = quizData.questions[currentIndex];
    if(!question) return;
    const $questionText = $('#question-text');
    const $options = $('#question-options');
    $questionText.text(question.question);
    $options.empty();
    question.options.forEach((opt,i)=>{
      const $label = $('<label>').addClass('biaquiz-option');
      const $input = $('<input>', {type:'radio', name:'option', value:i});
      const $span = $('<span>');
      $span.text(opt);
      $label.append($input).append($span);
      $options.append($label);
    });
  }

  window.displayQuestion = displayQuestion;

})(jQuery);
