const fetch = require('node-fetch')

const Utils = require('./Utils')

const categories = require('../data/categories')

class Questions {
    constructor() {}

    async init() {
        this.categories = categories

        // we have to populate categories data with usage data
        const counts = await Utils.getCategoryCounts()

        this.categories = this.categories.map(category => {
            category.questions = counts[category.id].questions
            return category
        })

        this.groups = {}
        this.categories.forEach(category => {
            if (category.category in this.groups) {
                this.groups[category.category].questions += category.questions
                this.groups[category.category].categories.push(category)
            } else {
                this.groups[category.category] = {
                    questions: category.questions,
                    categories: [category]
                }
            }
        })
    }

    async categoryFromGroup(groupName) {
        const group = this.groups[groupName]
        let random = Math.floor(Math.random() * (group.questions + 1))

        const category = group.categories.find(function(category) {
            random -= category.questions
            return random <= 0
        })

        return category
    }

    async questionFromCategory(category) {
        return Utils.getQuestionFromCategory(category.id)
    }
}

module.exports = Questions