const { readFileSync, promises: { writeFile } } = require('fs')
const glossary = JSON.parse(readFileSync('./glossary.json', 'utf8'))

module.exports = {glossary, updateGlossary}

async function updateGlossary(glossary) {
  await writeFile('./glossary.json', JSON.stringify(glossary, null, 2))
}
