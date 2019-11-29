function id(state) {
    // convert a state to a unique identifier
    return state.x + 1000 * state.y;
};

function bfs(problem, fringe) { // See https://bit.ly/34wjnGY
    const closed = new Set();

    fringe.push({
        state: problem.startState(),
        path: [],
        cost: 0
    });

    while (fringe.length) {
        let node = fringe.pop();
        let {
            state,
            path,
            cost
        } = node;

        if (problem.isGoal(state)) {
            return path;
        }

        if (!closed.has(key(state.x, state.y))) {
            closed.add(key(state.x, state.y));

            problem.successors(state).forEach(
                (successor) => fringe.push({
                    state: successor.state,
                    path: path.concat([successor]),
                    cost: cost + 1
                })
            );
        }
    }

    return [];
};

module.exports = bfs;