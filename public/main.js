function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayQuestion(question) {
    $('#category').text(question.category + ' (' + question.difficulty + ')')
    $('#question').text(question.question)
    
    window.answer = question.correct_answer

    var choices = shuffle(question.incorrect_answers.concat([question.correct_answer]))
    var choicesHtml = ''

    for (var i = 0; i < choices.length; i++) {
        //  .column #[#entertainment.button Entertainment]
        if (window.answer === choices[i]) {
            window.correct_position = i
        }

        choicesHtml += 
            "<div class='column'>\
                <div class='button answer' id='answer" + i + "'>" + choices[i] + "</div>\
            </div>"
    }

    choicesHtml += "<div style='clear: both'></div>"

    $('#choices').html(choicesHtml)

    $('.answer').click(function(e) {
        ws.send(JSON.stringify({
            type: 'answer',
            answer: e.currentTarget.textContent
        }))
        if (e.currentTarget.id === 'answer' + window.correct_position) {
            // correct
            $('#answer' + window.correct_position).addClass('right')
        } else {
            // wrong
            $('#answer' + window.correct_position).addClass('right')
            $('#' + e.currentTarget.id).addClass('wrong')
        }
    })
}


function toggle_fullscreen() {
    var doc = window.document
    var docEl = doc.documentElement

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl)
    } else {
        // cancelFullScreen.call(doc)
    }
}

if (document.getElementById('fullscreen')) {
    document.getElementById('fullscreen').onclick = function() {
        toggle_fullscreen()
        $('#fullscreen').html('')
    }
}