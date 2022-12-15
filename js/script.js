$(document).ready(function () {
    const $section = $('section');
    const $start = $('button');

    let $grid = $(document.querySelectorAll('img'));
    const $gridArray = $(Array.from($grid));

    cls = [1, 2, 3, 4, 5, 6, 7, 8];
    classWithPair = cls.concat(cls);

    // change difficulty
    $('#easy').on('click', changeGrid);
    $('#med').on('click', changeGrid);
    $('#hard').on('click', changeGrid);

    $start.on('click', fillGrid);

    function fillGrid() {
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
            }
        },
            function (error) {
                console.log(error)
            }
            )};
    
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

