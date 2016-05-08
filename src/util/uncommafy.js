export default function uncommafy(str) {
    return parseFloat(str.replace(/\,/g, ''))
}
