function id(node) {
    // convert a state to a unique identifier
    return node.row + 1000 * node.col;
};

function dfs(problem, params, refresh) { // See https://bit.ly/34wjnGY
    const closed = new Set();
    const probs = params.probs || 0.5;
    const delta = params.delta || 3;
    const speed = params.speed || 1e-1000;
    const fringe = [problem.startState()];
    var times = 0;

    while (fringe.length > 0) {
        var node = fringe[Math.floor(Math.random() * fringe.length)];
        fringe.splice(fringe.indexOf(node), 1);
        if (closed.has(id(node)) || node.colored) continue;
        var redTotal, greenTotal, blueTotal, count;
        redTotal = greenTotal = blueTotal = count = 0;

        // add all successor states to the list of unchecked states
        problem.successors(node).forEach((successor) => {
            // calculate color of new node based on surrounding colors
            if (successor.colored) {
                redTotal += successor.red;
                greenTotal += successor.green;
                blueTotal += successor.blue;
                count++;
            }
            fringe.push(successor);
        });

        // color the node by averaging the colors of neighboring nodes
        if (count > 0) {
            var rand = (Math.random() < probs) ? delta : -delta;
            node.red = (redTotal / count) + rand;
            node.green = (greenTotal / count) + rand;
            node.blue = (blueTotal / count) + rand;
        }
        node.colored = true;

        // mark the state as visited
        closed.add(id(node));
        if (times % 10000 == 0) refresh();
        times++;
    }
}

module.exports = dfs;