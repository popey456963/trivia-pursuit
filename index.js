const express = require('express')
const fetch = require('node-fetch')

const Questions = require('./modules/Questions')

const app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))

const questions = new Questions()

app.get('/', (req, res) => res.redirect('/question/general'))

app.get('/api/questions/:group', async (req, res) => {
    const category = await questions.categoryFromGroup(req.params.group)

    res.json(await questions.questionFromCategory(category))
})

app.get('/question/:group', async (req, res) => {
    console.time('getting question')
    const category = await questions.categoryFromGroup(req.params.group)
    const question = await questions.questionFromCategory(category)
    console.timeEnd('getting question')

    res.render('index', {
        question
    })
})

questions.init().then(() =>
    app.listen(9050, () => console.log('Listening on port 3000'))
)