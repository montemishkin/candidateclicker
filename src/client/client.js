// third party imports
import $ from 'jquery'
// local imports
import commafy from 'util/commafy'
import uncommafy from 'util/uncommafy'
import candidates from 'candidates'


const POLL_PERIOD = 2000
const $candidate = $('.candidate')
const nameTo$Span = candidates.reduce((state, candidate) => {
    return {
        ...state,
        [candidate.name]: $candidate
            .filter((_, el) => {
                return $(el).find('.candidate-name').text() === candidate.name
            })
            .map((_, el) => {
                return $(el).find('.candidate-clicks')
            }).get(0),
    }
}, {})
window.nameTo$Span = nameTo$Span

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
            // TODO: handle this
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
            // TODO: handle this
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
