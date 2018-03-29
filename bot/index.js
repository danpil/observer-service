process.env['NTBA_FIX_319'] = 1;

const TelegramBot = require('node-telegram-bot-api');
var mongoose = require('mongoose');

// var User = require('../models/User');
var User = mongoose.model('User');

// replace the value below with the Telegram token you receive from @BotFather
const token = '572712312:AAHYLvJkL6GCmsp7bgpCIWDohWLXAMpTRFc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const resp = id => `Перейдите по ссылке: http://localhost:3000. Для авторизации используйте: ${id}`;

bot.onText(/\/start/, (msg, match) => {
  console.log(msg);
  const chatId = msg.chat.id;
  const newUser = new User({
    chatId,
    first_name: msg.chat.first_name,
    last_name: msg.chat.last_name,
  });

  newUser.save(function(err) {
    // if (err) {
    //   bot.sendMessage(chatId, resp(chatId));
    // }
    //res.json({ success: true, msg: 'Successful created new user.' });
    bot.sendMessage(chatId, resp(chatId));
  });
});

module.exports = bot;

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', msg => {
//   console.log(msg);
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, resp(chatId));
// });
