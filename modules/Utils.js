const fetch = require('node-fetch')

class Utils {
    static async getCategoryCounts() {
        const categories = await fetch('https://opentdb.com/api_count_global.php')
            .then(req => req.json())
            .then(req => req.categories)
     
        for (let key in categories) {
            categories[key] = { questions: categories[key].total_num_of_verified_questions }
        }

        return categories
    }

    static async getQuestionFromCategory(category, difficulty) {
        const question = await fetch(`https://opentdb.com/api.php?amount=1&category=${category}&type=multiple&encode=url3986${difficulty ? `&difficulty=${difficulty}` : ``}`)
            .then(req => req.json())
            .then(req => req.results[0])

        question.category = decodeURIComponent(question.category)
        question.question = decodeURIComponent(question.question)
        question.correct_answer = decodeURIComponent(question.correct_answer)
        question.incorrect_answers = question.incorrect_answers.map(decodeURIComponent)

        return question
    }
}

module.exports = Utils