
# Astronomy Memory Game

A web application that utilizes randomized images from NASA's Astronomy Photo of the Day (APOD) API as the cards for a memory matching game.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery
- Local Storage
- NASA's Astronomy Photo of the Day API
- GitHub Pages

## Screenshots

![Generating game board, medium difficulty](https://i.imgur.com/4d6ujhP.png "Game Start")<br><br>
![Mid game play, hard difficulty](https://i.imgur.com/eZUjKHz.png "Game Play")<br><br>
![Game win, easy difficulty](https://i.imgur.com/yJdutVX.png "Game Win")

## Getting Started

The user has access to three levels of difficulty: `Easy`, `Medium`, and `Hard`. These difficulties are defined by the size of the array of images created, which are `4 x 4` (totaling 16 images and 8 pairs), `4 x 5` (totaling 20 images and 10 pairs), and `4 x 6` (totaling 24 images and 12 pairs) respectively.

The user then presses `Start Game`, and will have to memorize as many images shown as possible before they are hidden.

The user then selects two images at a time: if the images match, the images remain face up. If the images do not, the user is given a short time to review the images before they are hidden again. The game ends when all images are matched.

The number of `moves` and `matches` the user makes throughout the game are updated and then saved into local storage. These scores are specific to each difficulty and enables the user to view not only the current game's progress, but their history of `moves`, `matches`, and overall `accuracy`.

**[Click here](https://ambertav.github.io/astronomy-memory-game/) to see the deployed application!**


## Future Enhancements

To enable the user to:

- Reset scores saved to local storage for each difficulty
- Play on a mobile device