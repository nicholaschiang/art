const dfs = require('./dfs.js');
const bfs = require('./bfs.js');

// Paints the given two-dimensional array using BFS or DFS algorithms to color
// each pixel.
//
// @param {2D Array} image
//   A two-dimensional array representation of the pixels of the image.
function paint(image, params) {
    const color = hexToRGB(params.color || '#FFFFFF');
    class Problem {
        // define where we are drawing initially
        startState() {
            image[params.row || 0][params.col || 0].red = color.red;
            image[params.row || 0][params.col || 0].green = color.green;
            image[params.row || 0][params.col || 0].blue = color.blue;
            return image[params.row || 0][params.col || 0];
        }

        // define where the robot can go next, from a given state
        successors(node) {
            return getAdjacent(node.row, node.col, image);
        }

        toString() {
            return 'paint problem with initial color (' + params.color + ')';
        }
    }
    dfs(new Problem(), params);
};

module.exports = paint;

function getAdjacent(row, col, image) {
    const adjacent = [];
    if (image.length > row + 1) adjacent.push(image[row + 1][col]);
    if (image[row].length > col + 1) adjacent.push(image[row][col + 1]);
    if (row != 0) adjacent.push(image[row - 1][col]);
    if (col != 0) adjacent.push(image[row][col - 1]);
    return adjacent;
};

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return {
        red: r,
        green: g,
        blue: b,
        alpha: alpha || 255,
    };
};