// third party imports
import $ from 'jquery'
// local imports
import commafy from 'util/commafy'
import uncommafy from 'util/uncommafy'


const POLL_PERIOD = 2000
const $candidate = $('.candidate')
const nameTo$Span = $candidate
    .map((_, el) => {
        return {
            name: $(el).find('.candidate-name').text(),
            $span: $(el).find('.candidate-clicks'),
        }
    })
    .get()
    .reduce((state, next) => {
        return {
            ...state,
            [next.name]: next.$span,
        }
    }, {})

let lastUpdateTime = (new Date()).getTime()


$candidate.click(function () {
    const $this = $(this)
    const name = $this.find('.candidate-name').text()

    $.post({
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({name}),
        url: '/api/increment',
        success: updateClicks,
        error(_, __, error) {
            // TODO: improve error handling
            throw error
        },
    })

    const span = $this.find('.candidate-clicks')
    const clicks = uncommafy(span.text())

    span.text(commafy(clicks + 1))
})


pollIfTimeWaited(function pollCallback() {
    setTimeout(function () {
        pollIfTimeWaited(pollCallback)
    }, POLL_PERIOD)
})


/* ************************************************************************** */

function pollIfTimeWaited(then) {
    if ((new Date()).getTime() - lastUpdateTime > POLL_PERIOD) {
        poll(then)
    } else {
        then()
    }
}


function poll(then) {
    $.get({
        dataType: 'json',
        url: '/api/poll',
        success(data) {
            updateClicks(data)
            then()
        },
        error(_, __, error) {
            // TODO: improve error handling
            throw error
        },
    })
}


function updateClicks(data) {
    lastUpdateTime = (new Date()).getTime()

    for (const name in data) {
        if (data.hasOwnProperty(name)) {
            nameTo$Span[name].text(commafy(data[name]))
        }
    }
}
