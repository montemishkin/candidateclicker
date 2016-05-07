export default function randomPermutation(xs) {
    if (xs.length <= 1) {
        return xs
    }
    const i = Math.floor(xs.length * Math.random())
    const x = xs[i]
    const rest = [...xs.slice(0, i), ...xs.slice(i + 1)]

    return [x, ...randomPermutation(rest)]
}
