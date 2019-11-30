const paint = require('./paint.js');

onmessage = (params) => {
    paint(params.data.image, params.data, () => postMessage(params.data.image));
    postMessage(params.data.image);
};