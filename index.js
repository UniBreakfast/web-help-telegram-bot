require('dotenv').config()

const runBot = require('./bot.js')
const {glossary, updateGlossary} = require('./glossary.js')

runBot(glossary, updateGlossary)
