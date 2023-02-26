module.exports = runBot

const TelegramBot = require('node-telegram-bot-api')
const token = process.env.YOUR_TELEGRAM_BOT_TOKEN

async function runBot(glossary, updateGlossary) {
  const bot = new TelegramBot(token, { polling: true })


  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello, world!");
  });

  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, "This is a help message.");
  });

  bot.onText(/\/glossary/, (msg) => {
    const terms = Object.keys(glossary);
    const text = `There are ${terms.length} terms in the glossary. Here is the list:
    \n${terms.join('\n')}
    \nTo get the definition of a term, send me the term from the list above in a message.`
    
    bot.sendMessage(msg.chat.id, text);
  });

  bot.onText(/\/add (\S+) (.+)/, (msg, match) => {
    const term = match[1];
    const definition = match[2];

    if (glossary[term]) {
      bot.sendMessage(msg.chat.id, `Sorry, ${term} is already in the glossary.`);
    } else {
      glossary[term] = [{ definition }];
      updateGlossary(glossary);
      bot.sendMessage(msg.chat.id, `Added ${term} to the glossary.`);
    }
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (glossary[text]) {
      bot.sendMessage(chatId, glossary[text][0].definition);
    } else {
      bot.sendMessage(chatId, `Sorry, I don't know what ${text} means.`);
    }
  });
}
