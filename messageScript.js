console.log("Runing Program");

// LIST OF EMOJIS ON "emojis.txt"

// MODES: Can be activated together
const onlyScheduled = true;
const onlyRandom = true;

// TIME: An hour or less on Scheduled Mode
const everyS = 3600000; // How much it should wait between messages (in miliseconds)

// Here you add the phrases that you want to send. ** Do not forget the "cuotes" and ,commas, **
const phrases = ["Some Random Phrase", "Another Random Phrase"];

const schePhrases = [
  {
    phrase: "Some Scheduled Phrase", // Well, the phrase
    time: 12, // Here you should put the specific hour that you want to send it from 0 to 23
  },
  {
    phrase: "Another Scheduled Phrase",
    time: 22,
  },
  {
    phrase: "An extra phrase as example of scheTime",
    time: 12,
  },
];

// Just mention the hours that you would like to schedule the messages (One per hour)
const scheTime = [12, 22]; // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15...

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ***** BOT CODE - DO NOT MODIFY ANYTHING UNLESS YOU KNOW WHAT YOU'RE DOING!!! ***** ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var cache = []; // To avoid repeated phrases.
var cacheLimit = 4;
var diff = false;
var chosenPhrase = 0;
var msgInput;
count = 0; // Just to count messages sent. You can see it on Dev tools of chrome, on console tab. (right click and "inspect element")

const eventInput = new InputEvent("input", {
  // "Click" Event
  bubbles: true,
});

const getTime = () => new Date(Date.now()).getHours(); // Get the current time(hour)

function randInt(min, max) {
  // Generate a random number
  return Math.round(Math.random() * max - min);
}

function isDiff(phrase, che) {
  // This function check the cache to avoid repeating phrases. It compare the phrase selected with the phrases saved in cache
  for (i = 0; i <= che.length - 1; i++) {
    if (che[i] == phrase) return false;
  }
  return true;
}

function selectPhrase() {
  // It select a phrase and send it to "isDiff( "phrase selected", cache[string] )" to avoid repeat the phrase, if it isn't on the list, then finish the loop turning diff to true
  diff = false;
  while (!diff) {
    chosenPhrase = randInt(0, phrases.length - 1);
    isDiff(chosenPhrase, cache) ? (diff = true) : (diff = false);
  }
}

function checkcache() {
  // check if the cache is full, if it is full then delete all the content
  if (cache.length < cacheLimit) {
    cache.push(chosenPhrase);
  } else {
    cache = [];
    cache.push(chosenPhrase);
  }
}

function sendMsg(input) {
  // "click" on input to unlock "send button" and "click" on "send button"
  input.dispatchEvent(eventInput);
  document.querySelector("button._4sWnG").click();
}

function writeAndSendMsg(phrase) {
  // Write phrase on input and send message
  msgInput.textContent = phrase;
  sendMsg(msgInput);
}

function sendScheduledMessages(hour) {
  let schePhrase = schePhrases.filter((phrase) => phrase.time == hour);
  schePhrase.forEach((p) => setTimeout(() => writeAndSendMsg(p.phrase), 2000));
}

function whatsappBot() {
  let time = getTime(); // Get current hour
  console.groupCollapsed("Message [" + count + "]");
  console.log("=======================================");
  console.log("\nSelecting Message... \n\n");
  if (onlyRandom) {
    selectPhrase();
    checkcache();
  }
  console.log("\tChosen phrase: " + phrases[chosenPhrase]);
  console.log("\tWriting...");
  if (onlyScheduled && everyS <= 3600000) {
    scheTime.includes(time) // if scheTime include the current time then send scheduled message
      ? sendScheduledMessages(time)
      : writeAndSendMsg(phrases[chosenPhrase]);
  } else {
    onlyRandom ? writeAndSendMsg(phrases[chosenPhrase]) : null; // if not, send Random phrase
  }
  console.log("\n\n Sent!");
  count++;
  console.groupEnd();
}

function stopBot() {
  // an extra function to stop the bot, nothing special, just to stop the interval and reset count
  clearInterval(bot);
  console.log("Bot stoped");
  count = 0;
}
function startBot() {
  if (onlyRandom) {
    console.groupCollapsed("Message [" + count + "]");
    console.log("=======================================");
    console.log("\nSelecting Message... \n\n");
    selectPhrase();
    checkcache();
    console.log("\tChosen phrase: " + phrases[10]);
    console.log("\tWriting...");
    writeAndSendMsg(phrases[chosenPhrase]);
    console.log("\n\n Sent!");
    console.groupEnd();
  }

  if (onlyScheduled) {
    let time = getTime();
    if (everyS <= 3600000) {
      console.log("agendado");
      if (scheTime.includes(time)) sendScheduledMessages(time);
    } else {
      alert(
        "You MUST select less than 1 hour between messages on 'onlyScheduled' mode!"
      );
      alert(
        "The bot wont send scheduled messages until you change the time or disable the onlyschedule mode"
      );
    }
  }
  bot = setInterval(whatsappBot, everyS);
  console.log("Bot Initialized");
}

function checkInput() {
  // Check if the input (message area) is available, if it is then start the bot. else, check again.
  if (typeof msgInput != "undefined") {
    console.groupCollapsed("check Input");
    console.log("Found input");
    console.log(msgInput);
    console.groupEnd();
    startBot();
    clearInterval(isReady);
  } else {
    document
      .querySelectorAll("._13NKt.copyable-text.selectable-text")
      .forEach((e) => {
        e.hasAttribute("spellcheck") ? (msgInput = e) : null;
      });
  }
}

function main() {
  // check every 2 seconds if the input area is available, when it is available finish the interval.
  onlyRandom || onlyScheduled // if no mode selected, then throw an alert
    ? (isReady = setInterval(checkInput, 2000))
    : alert("No mode selected!");
}

main(); // Start program
