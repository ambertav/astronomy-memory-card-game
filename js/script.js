$(document).ready(function () {
    const $start = $('#start');
    const $dialogue = $('#dialogue');
    const $section = $('section');

    let cls = [];
    let classWithPair = [];

    let moves = 0;
    let matches = 0;
    const $flippedImages = $([]);
    let matchArray = [];
    let difficulty = '';

    const statStructure = {
        easy: {
            moves: 0,
            matches: 0,
            accuracy: 0
        },
        med: {
            moves: 0,
            matches: 0,
            accuracy: 0
        },
        hard: {
            moves: 0,
            matches: 0,
            accuracy: 0
        },
    };
  
    $('#easy, #med, #hard').on('click', changeGrid);
    $start.on('click', renderGrid);
    $section.on('click', '.container', showImages);

    async function renderGrid () {
        gameReset();
        $dialogue.html('Generating board...');

        $('#easy, #med, #hard, #start').attr('disabled', true);

        try {
            const data = await $.ajax({
                url: `https://api.nasa.gov/planetary/apod?api_key=hIlNblkyFJyGSZstYSaXgPk0m9o3WKjNpP1iHb6F&count=${cls.length}`
            });
            
            // shuffles pairs of classes so that the pairs will not be next to each other
            classWithPair = cls.concat(cls);
            shuffleClass(classWithPair);

            // assigns classes to img for future pair matching
            for (i = 0; i < classWithPair.length; i++) {
                $(`#${i + 1}`).attr('class', classWithPair[i]);
            }
            // assigns src from data for each img
            for (i = 0; i < data.length; i++) {
                $(`.${i + 1}`).attr('src', data[i].hdurl);
            }

            // verifies that each image was assigned a src from the data
            if ($('[src=""]').length === 0) $('img').show();
            else renderGrid();

            $dialogue.html('Get ready...');

            setTimeout(function () {
                hideImages($('img'));
            }, 8000);

            gameRound();

        } catch (jqXHR) {
            $dialogue.html(`${jqXHR.statusText.toUpperCase()}: status code ${jqXHR.status}, ${jqXHR.responseText}.`)
                .css('font-weight', 'bold');
        }
    }


    function hideImages (img) {
        setTimeout(function () {
            $(img).hide();
            $dialogue.html('Click on two images');
        }, 750);
    }

    function showImages (evt) {
        $clickedImg = $($(evt.target).children());
        if ($clickedImg.attr('src')) {
            if ($clickedImg.is(':visible')) return;
            $clickedImg.show().css('box-shadow', '0px 0px 10px yellow');
            $flippedImages.push($clickedImg);
            gameRound();
        }
    }

    function gameRound () {
        if ($flippedImages.length === 2) {
            moves += 1;
            const imageClass1 = $flippedImages.eq(0)[0].attr('class');
            const imageClass2 = $flippedImages.eq(1)[0].attr('class');

            if (imageClass1 === imageClass2) {
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

    function gameUpdate () {
        $('#moves').html(`Moves: ${moves}`);
        $('#matches').html(`Matches: ${matches}`);
        let accuracy = `${Math.round((matches / moves) * 100)}%`;
        if (accuracy !== 'NaN%') $('#acc').html(`Accuracy: ${accuracy}`);
        gameEnd();
    }

    function gameEnd () {
        if (matchArray.length === cls.length) { 
            $dialogue.html('Congratulations, you win!<br><br>Change difficulty and/or click start game to play again');
            $('#easy, #med, #hard, #start').attr('disabled', false);
            saveGameStats(difficulty, moves, matches);
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
    function changeGrid (evt) {
        $('.container').remove();
        difficulty = $(evt.target).attr('id');
        const stats = getGameStats(difficulty);

        historyUpdate(stats);

        cls = [1, 2, 3, 4, 5, 6, 7, 8];
        let numberOfBoxes = 0;
        if (difficulty === 'easy') {
            numberOfBoxes = 16;
        } else if (difficulty === 'med') {
            numberOfBoxes = 20;
            cls.push(9, 10);
        } else if (difficulty === 'hard') {
            numberOfBoxes = 24;
            cls.push(9, 10, 11, 12);
        }

        $section.attr('class', `gallery${numberOfBoxes}`);
        for (i = 1; i <= numberOfBoxes; i++) {
            let $div = $('<div>').attr('class', 'container');
            let $img = $('<img>').attr('id', i).attr('src', '').hide();
            $div.append($img);
            $section.append($div);
            $start.removeAttr('disabled');
        }
    }

    function saveGameStats (difficulty, moves, matches) {
        const storedStats = JSON.parse(localStorage.getItem('gameStats')) || statStructure;
        if (!storedStats[difficulty]) storedStats[difficulty] = statStructure;  

        storedStats[difficulty].moves += moves;
        storedStats[difficulty].matches += matches;

        storedStats[difficulty].accuracy = Math.round((storedStats[difficulty].matches / storedStats[difficulty].moves) * 100);

        localStorage.setItem('gameStats', JSON.stringify(storedStats));
        historyUpdate(storedStats[difficulty]);
    }

    function getGameStats (difficulty) {
        const storedStats = JSON.parse(localStorage.getItem('gameStats')) || statStructure;

        return storedStats[difficulty] || statStructure;
    }

    function historyUpdate (stats) {
        $('#historyMoves').html(`Moves: ${stats.moves}`);
        $('#historyMatches').html(`Matches: ${stats.matches}`);
        if (stats.accuracy !== 'NaN%') $('#historyAcc').html(`Accuracy: ${stats.accuracy}%`);
    }

});