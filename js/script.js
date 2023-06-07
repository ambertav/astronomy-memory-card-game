$(document).ready(function () {
    const $start = $('button');
    const $dialogue = $('#dialogue');
    const $section = $('section');

    let cls = []
    let classWithPair = [];

    let moves = 0;
    let matches = 0;
    const $flippedImages = $([])
    let matchArray = [];
    
    $('#easy').on('click', changeGrid);
    $('#med').on('click', changeGrid);
    $('#hard').on('click', changeGrid);

    $start.on('click', renderGrid);
    $(document).on('click', '.container', showImages)
    
    function renderGrid() {
        gameReset();
        $dialogue.html('Get ready...');
        $.ajax({
            url: `https://api.nasa.gov/planetary/apod?api_key=hIlNblkyFJyGSZstYSaXgPk0m9o3WKjNpP1iHb6F&count=${cls.length}`
        }).then(
            function (data) {
                classWithPair = cls.concat(cls);
                shuffleClass(classWithPair);
                let $grid = $(document.querySelectorAll('img'));
                const $gridArray = $(Array.from($grid));
                $gridArray.each(function (index) {
                    $(`#${index + 1}`).attr('class', classWithPair[index]);
                });
                for (let i = 0; i < cls.length; i++) {
                    $(data).each(function () {
                        $(`.${i + 1}`).attr('src', data[i].hdurl);
                    });       
                } setTimeout (function (){
                    hideImages($('img'));
                }, 5000);
                gameRound();
            }
        )
        .catch(function (jqXHR) {
            $dialogue.html(`${jqXHR.statusText.toUpperCase()}: status code ${jqXHR.status}, ${jqXHR.responseText}.`)
            .css('font-weight','bold');
        });
    }
            
    function hideImages(img) {
        setTimeout(function () {
            $(img).hide();
            $dialogue.html('Click on two images');
        }, 750);
    }
            
    function showImages(evt) {
        $clickedImg = $($(evt.target).children());
        if ($clickedImg.attr('src')) {
            if ($clickedImg.is(':visible')) return;
            $clickedImg.show();
            $clickedImg.css('box-shadow', '0px 0px 10px yellow');
            $flippedImages.push($clickedImg);
            gameRound();
            }
        }
            
    function gameRound() {
        if ($flippedImages.length === 2) {
            moves += 1;
            if ($flippedImages.eq(0)[0].attr('class') === $flippedImages.eq(1)[0].attr('class')) {
                matches += 1;
                $flippedImages.each(function (index) {
                    $flippedImages.eq(index)[0].css('box-shadow', '0px 0px 10px #39FF14');
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
            $dialogue.html('Congratulations, you win!<br><br><br><br>Click start game to play again');    
        }
    }

    function gameReset () {
        matchArray = [];
        moves = 0;
        matches = 0;
        $('#acc').html(`Accuracy: 0%`);
        $('img').css('box-shadow', 'none');
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

    // change difficulty
    function changeGrid(evt) {
        if ($('img').attr('src')) return;
        $('.container').remove();
        cls = [1, 2, 3, 4, 5, 6, 7, 8];
        let numberOfBoxes = 0;
        if ($(evt.target).attr('id') === 'easy') {
            numberOfBoxes = 16;
        } else if ($(evt.target).attr('id') === 'med') {
            numberOfBoxes = 20;
            cls.push(9, 10);
        } else if ($(evt.target).attr('id') === 'hard') {
            numberOfBoxes = 24;
            cls.push(9, 10, 11, 12);
        }
        $section.attr('class', `gallery${numberOfBoxes}`);
        for (i = 1; i <= numberOfBoxes; i++) {
            let $div = $('<div>').attr('class', 'container');
            let $img = $('<img>').attr('id', i);
            $div.append($img);
            $section.append($div);
        }
    }
});
