$(document).ready(function () {
    const $section = $('section');
    const $start = $('button');
    const $dialogue = $('#dialogue');

    let $grid = $(document.querySelectorAll('img'));
    const $gridArray = $(Array.from($grid));

    cls = [1, 2, 3, 4, 5, 6, 8, 7];
    classWithPair = cls.concat(cls);

    let moves = 0;
    let matches = 0;
    const $flippedImages = $([])
    let matchArray = [];

    // render images in pairs
    $start.on('click', renderGrid);
    
    $('img').on('click', showImages);
    
    // ajax, render images in pairs
    function renderGrid() {
        matchArray = [];
        moves = 0;
        matches = 0;
        $('#acc').html(`Accuracy: 0%`);
        $dialogue.html('Get ready...');
        $.ajax({
            url: "https://api.nasa.gov/planetary/apod?api_key=hIlNblkyFJyGSZstYSaXgPk0m9o3WKjNpP1iHb6F&count=9"
        }).then(
            function (data) {
                shuffleClass(classWithPair);
                $gridArray.each(function (index) {
                    $(`#${index + 1}`).attr('class', classWithPair[index]);
                });
                for (let i = 1; i < 9; i++) {
                    $(data).each(function () {
                        $(`.${i}`).attr('src', data[i].url);
                    });       
                } setTimeout (function (){
                    hideImages($('img'));
                }, 3000);
                gameRound();
            },
            function (error) {
                alert('error');
            }
            )};
            
    function hideImages(img) {
        setTimeout(function () {
            $(img).addClass('hide');
            $dialogue.html('Click on two images');
            }, 750);
    }
            
    function showImages(evt) {
        $(evt.target).removeClass('hide');
        $(evt.target).css('box-shadow', '0px 0px 30px yellow');
        $flippedImages.push($(evt.target));
        gameRound();
        }
            
    function gameRound() {
        if ($flippedImages.length === 2) {
            moves += 1;
            if ($flippedImages.eq(0)[0].attr('class') === $flippedImages.eq(1)[0].attr('class')) {
                matches += 1;
                $flippedImages.each(function (index) {
                    $flippedImages.eq(index)[0].css('box-shadow', '0px 0px 40px #39FF14');
                });
                $dialogue.html('It\'s a match!');
                matchArray.push($flippedImages.splice(0, 2));
            } else {
                $dialogue.html('Not a match... try again');
                hideImages($flippedImages[0]);
                hideImages($flippedImages[1]);
                $flippedImages.splice(0, 2);
            }
        }
        gameUpdate();
    }
            
    function gameUpdate() {
        $('#moves').html(`Moves: ${moves}`);
        $('#matches').html(`Matches: ${matches}`);
        let accuracy = `${Math.round((matches / moves) * 100)}%`;
        if (accuracy !== 'NaN%') {
            $('#acc').html(`Accuracy: ${accuracy}`);
        }
        gameEnd();
    }
            
    function gameEnd () {
        if (matchArray.length === cls.length) {
            $dialogue.html('Congratulations, you win!<br><br><br>Click start game to play again');    
        }
    }
               
    // Fisher–Yates Shuffle
    function shuffleClass (array) {
        let m = array.length;
        let t;
        let i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    // // change difficulty
    // $('#easy').on('click', changeGrid);
    // $('#med').on('click', changeGrid);
    // $('#hard').on('click', changeGrid);
            
    // function changeGrid(evt) {
    //     if ($(evt.target).attr('id') === 'easy') {
    //         $section.attr('class', 'gallery16');
    //     }
    //     if ($(evt.target).attr('id') === 'med') {
    //         $section.attr('class', 'gallery20');
    //     }
    //     if ($(evt.target).attr('id') === 'hard') {
    //         $section.attr('class', 'gallery24');
    //     }
    // }
});  
        
        