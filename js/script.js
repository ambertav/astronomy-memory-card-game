$(document).ready(function () {
    const $section = $('section');
    const $start = $('button');

    let $grid = $(document.querySelectorAll('img'));
    const $gridArray = $(Array.from($grid));

    cls = [1, 2, 3, 4, 5, 6, 8, 7];
    classWithPair = cls.concat(cls);

    // change difficulty
    $('#easy').on('click', changeGrid);
    $('#med').on('click', changeGrid);
    $('#hard').on('click', changeGrid);

    // render images in pairs
    $start.on('click', renderGrid);


    // render images in pairs
    function renderGrid() {
        $.ajax({
            url: "https://api.nasa.gov/planetary/apod?api_key=hIlNblkyFJyGSZstYSaXgPk0m9o3WKjNpP1iHb6F&count=10&concept_tags=True"
        }).then(
            function (data) {
                // shuffleIds(classWithPair);
                    $gridArray.each(function (index) {
                        $(`#${index + 1}`).attr('class', classWithPair[index]);
                    });
                        for (let i = 1; i < 9; i++) {
                            $(data).each(function () {
                            $(`.${i}`).attr('src', data[i].url);
                        });
                               
            } hideImages();
        },
            function (error) {
                console.log(error)
            }
            )};
    

    // hide images immediately after rendering with ajax
    function hideImages() {
        $gridArray.attr('class', 'hide');
    }

    // change difficulty
    function changeGrid(evt) {
        if ($(evt.target).attr('id') === 'easy') {
            $section.attr('class', 'gallery16');
        }
        if ($(evt.target).attr('id') === 'med') {
            $section.attr('class', 'gallery20');
        }
        if ($(evt.target).attr('id') === 'hard') {
            $section.attr('class', 'gallery24');
        }
    }
})   

    // Fisher–Yates Shuffle
//     function shuffleIds (array) {
//         let m = array.length;
//         let t;
//         let i;

//         while (m) {
//             i = Math.floor(Math.random() * m--);
//             t = array[m];
//             array[m] = array[i];
//             array[i] = t;
//         }
//         return array;
//     }

// });

/*
    to do:
    hide images upon rendering them, add visble card layout in background
    click listeners on imgs to show them
    game function
        limit rounds of showing images (after two choices, hide images again)
        check to see if classes match
        keep images up if they match
        if no images are hidden, alert that user won



        time the game
        count how many clicks (moves = clicks / 2), (accuracy = images up / clicks)
        append all the this info to the html
*/