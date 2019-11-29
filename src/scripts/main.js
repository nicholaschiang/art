const axios = require('axios');

// Draws an image on the given canvas by using BFS or DFS algorithms to color
// each pixel.
//
// @param {HTML Canvas} canvas
//   The canvas to draw the image unto
function draw(canvas) {
    const ctx = canvas.getContext('2d');
    axios({
        method: 'get',
        url: 'https://us-central1-auto-artonomous.cloudfunctions.net/paint',
        params: {
            height: canvas.height,
            width: canvas.width,
            color: '#FF0000',
            probs: 0.4,
            delta: 3,
            row: 300,
            col: 200,
        },
    }).then((res) => {
        document.getElementById('preloader').parentNode.removeChild(
            document.getElementById('preloader'));
        ctx.putImageData(convert(
            res.data, ctx.createImageData(canvas.width, canvas.height)), 0, 0);
    }).catch((err) => {
        console.error('[ERROR] Could not fetch image ', err);
    });
};

// Converts the given two-dimensional array into a one-dimensional array used to
// draw on the HTML Canvas.
//
// @param {2D Array} pixels
//   A two-dimensional array representation of the pixels of the image.
// @param {ImageData} image
//   An ImageData() object to write pixels to.
//
// @return {ImageData} image
//   The original ImageData() object with pixels written to it.
function convert(pixels, image) {
    for (var row = 0; row < image.height; row++) {
        for (var col = 0; col < image.width; col++) {
            var index = (row * image.width + col) * 4;
            image.data[index] = pixels[row][col].red;
            image.data[index + 1] = pixels[row][col].green;
            image.data[index + 2] = pixels[row][col].blue;
            image.data[index + 3] = pixels[row][col].alpha;
        }
    }
    return image;
};

window.onload = () => {
    draw(document.querySelector('canvas'));
};