// Creates an array representing an image's pixels.
// 
// @param {String} color
//   Initial color of image's pixels. Default is white.
// @param {int} width
//   The width (number of columns) of the image.
// @param {int} height
//   The height (number of rows) of the image.
//
// @return {2D Array} image
//   A two-dimensional array representation of the image's pixels.
//   [['#FFF', '#FFF', '#FFF'],
//    ['#FFF', '#FFF', '#FFF'],
//    ['#FFF', '#FFF', '#FFF'],
//    ['#FFF', '#FFF', '#FFF']]
function construct(params) {
    if (!params.width || !params.height) throw new Error('Construct() needs ' +
        'a valid height and width.');
    const color = params.color || '#FFFFFF';
    const width = params.width;
    const height = params.height;
    const image = [];
    for (var row = 0; row < height; row++) {
        image.push([]);
        for (var col = 0; col < width; col++) {
            image[row].push(new Pixel(combineMaps(hexToRGB(color), {
                row: row,
                col: col
            })));
        }
    }
    return image;
};

module.exports = construct;

class Pixel {
    constructor(params) {
        this.row = params.row;
        this.col = params.col;
        this.red = params.red;
        this.blue = params.blue;
        this.green = params.green;
        this.alpha = params.alpha || 255;
        this.colored = false;
    }

    toString() {
        return 'Pixel at (' + this.row + ', ' + this.col + ') colored ' +
            RGBToHex(this);
    }
}

function RGBToHex(color) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(color.red) + componentToHex(color.green) +
        componentToHex(color.blue);
};

function combineMaps(mapA, mapB) {
    // NOTE: This function gives priority to mapB over mapA
    var result = {};
    for (var i in mapA) {
        result[i] = mapA[i];
    }
    for (var i in mapB) {
        result[i] = mapB[i];
    }
    return result;
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