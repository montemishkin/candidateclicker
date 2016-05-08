// third party imports
import $ from 'jquery'


$('.candidate').click(function (...args) {
    const $this = $(this)
    const name = $this.find('.candidate-name').text()
    // TODO: POST "increment this candidate"

    const span = $this.find('.candidate-clicks')
    const clicks = parseInt(span.text(), 10)

    span.text(clicks + 1)
})
