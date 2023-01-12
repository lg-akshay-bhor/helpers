/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
const allSettled = (promises) => {
    return Promise.all(
        promises.map((p) =>
            Promise.resolve(p).then(
                (v) => ({
                    state: "fulfilled",
                    value: v,
                }),
                (r) => ({
                    state: "rejected",
                    reason: r,
                })
            )
        )
    );
};

module.exports = allSettled;
