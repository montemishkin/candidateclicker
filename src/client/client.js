// third party imports
import $ from 'jquery'
// local imports
import commafy from 'util/commafy'


$('.candidate').click(function () {
    const $this = $(this)
    const name = $this.find('.candidate-name').text()
    // TODO: POST "increment this candidate"

    const span = $this.find('.candidate-clicks')
    const clicks = parseInt(span.text().replace(/\,/g, ''), 10)

    span.text(commafy(clicks + 1))
})
