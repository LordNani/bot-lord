/* eslint-disable new-cap */
const tmi = require('tmi.js')
const axios = require('axios');
// Define configuration options
const opts = {
  identity: {
    username: 'BotLord',
    password: 's5w5yitijwbrwhnd24zaqg6rf5odda'
  },
  channels: [
    'lord_painkiller'
  ]
}

// Create a client with our options
const client = new tmi.client(opts)

// Register our event handlers (defined below)
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

// Connect to Twitch:
client.connect()

// Called every time a message comes in
async function onMessageHandler (target, context, msg, self) {
  if (self) { return } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandArray = msg.trim().split(' ')
  console.log('The executed command is: ' + commandArray)

  // If the command is known, let's execute it
  if (commandArray[0] === '!duel') {
    const opponent = await startDuel(commandArray[1])
    client.say(target, opponent)
    console.log(`* Executed ${commandArray} command`)
  } else {
    console.log(`* Unknown command ${commandArray}`)
  }
}
// Function called when the 'dice' command is issued
async function startDuel (userName) {
   return axios.get('https://api.twitch.tv/kraken/users?login=' + userName).then(
    response => response.json()
  ).then(
    json => {
      if (json.users._id != null) {
        return 'User Exists'
      } else {
        return "User Doesn't Exist"
      }
    }
  ).catch(
    reason => {
        // console.log(reason)
        return "User Doesn't Exist"
    }
  )
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}
