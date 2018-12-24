const express = require('express')
const fetch = require('node-fetch')

const Questions = require('./modules/Questions')

const app = express()
const expressWs = require('express-ws')(app)

app.set('view engine', 'pug')
app.use(express.static('public'))

const questions = new Questions()
const games = {}

app.get('/', (req, res) => res.render('index'))

app.get('/game/:code', (req, res) => {
    res.render('game')
})

app.get('/host/:code', (req, res) => {
    res.render('host')
})

app.get('/play/:code', (req, res) => {
    res.render('play')
})

app.get('/api/questions/:group', async (req, res) => {
    const category = await questions.categoryFromGroup(req.params.group)

    res.json(await questions.questionFromCategory(category))
})

app.get('/question/:group', async (req, res) => {
    console.time('getting question')
    const category = await questions.categoryFromGroup(req.params.group)
    const question = await questions.questionFromCategory(category)
    console.timeEnd('getting question')

    res.render('question', {
        question
    })
})

app.ws('/game/:code', function(ws, req) {
    games[req.params.code] = ws

    ws.on('message', function(msg) {
        console.log(msg)
    })
})

app.ws('/host/:code', function(ws, req) {
    ws.on('message', async function(msg) {
        msg = JSON.parse(msg)

        if (msg.type === 'group') {
            const category = await questions.categoryFromGroup(msg.group)
            const question = await questions.questionFromCategory(category)

            const response = JSON.stringify({
                type: 'question',
                question: question
            })
            games[req.params.code].send(response)
            ws.send(response)
        }

        if (msg.type === 'answer') {
            games[req.params.code].send(JSON.stringify(msg))
        }
    })
})

questions.init().then(() =>
    app.listen(9050, () => console.log('Listening on port 9050'))
)