const axios = require('axios');
const paint = require('./paint.js');
const construct = require('./construct.js');

// Draws an image on the given canvas by using BFS or DFS algorithms to color
// each pixel.
//
// @param {HTML Canvas} canvas
//   The canvas to draw the image unto
function draw(canvas) {
    const ctx = canvas.getContext('2d');
    const image = construct({
        height: canvas.height,
        width: canvas.width,
    });
    paint(image, {
        color: '#FF0000',
        probs: 0.4,
        delta: 3,
        row: 250,
        col: 250,
    });
    ctx.putImageData(convert(
        image, ctx.createImageData(canvas.width, canvas.height)), 0, 0);
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