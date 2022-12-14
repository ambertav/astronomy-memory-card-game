$(document).ready(function () {
    const $section = $('section');

    // change difficulty
    $('#easy').on('click', changeGrid);
    $('#med').on('click', changeGrid);
    $('#hard').on('click', changeGrid);


    // change difficulty
    function changeGrid(evt) {
        if ($(evt.target).attr('id') === 'easy') {
            $section.attr('class', 'gallery4');
        }
        if ($(evt.target).attr('id') === 'med') {
            $section.attr('class', 'gallery5');
        }
        if ($(evt.target).attr('id') === 'hard') {
            $section.attr('class', 'gallery6');
        }
    }   

});

