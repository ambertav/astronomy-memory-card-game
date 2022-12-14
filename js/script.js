$(document).ready(function () {
    const $section = $('section');

    // event listeners toggle difficulty
    $('#easy').on('click', function (evt) {
        $section.attr('class', 'gallery4');
    });

    $('#med').on('click', function (evt) {
        $section.attr('class', 'gallery5');
    });

    $('#hard').on('click', function (evt) {
        $section.attr('class', 'gallery6');
    });


});
