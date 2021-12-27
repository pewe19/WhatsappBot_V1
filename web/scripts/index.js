const content = document.getElementById("content");
// HOME ROUTE
var pyConfig = {
  browser: "Chrome",
  phone: "+61404558115",
}

var jsConfig = {
  modes: {
    random: false,
    scheduled: false
  },
  randomPhrases: [],
  scheduledPhrases: [],
  times: [],
  every: 36000
}


function modeToggle(mode) {
  if (mode == "random") {
    let random = document.querySelector(".modes__random--toggle");
    jsConfig.modes.random = !jsConfig.modes.random;
    console.log("random: ", jsConfig.modes.random);
    jsConfig.modes.random
      ? addRemClass(random, ["btnOn"])
      : addRemClass(random, [false], ["btnOn"]);
  }

  if (mode == "scheduled") {
    let scheduled = document.querySelector(".modes__scheduled--toggle");
    jsConfig.modes.scheduled = !jsConfig.modes.scheduled;
    console.log("scheduled: ", jsConfig.modes.scheduled);
    jsConfig.modes.scheduled
      ? addRemClass(scheduled, ["btnOn"])
      : addRemClass(scheduled, [false], ["btnOn"]);
  }
}

function addRemClass(element, toAdd, toRemove) {
  if (toRemove) {
    toRemove.forEach((clase) => {
      element.classList.remove(clase);
    });
  }
  if (toAdd) {
    toAdd.forEach((clase) => {
      element.classList.add(clase);
    });
  }
}

function writing(e) {
  if (e.id == "Browser") pyConfig.browser = e.value;
  if (e.id == "Phone") pyConfig.phone = e.value;
}

function startBot() {
  console.log(pyConfig);
  eel.getpythonConfig(JSON.stringify(pyConfig));
  eel.getjsConfig(JSON.stringify(jsConfig));
  eel.startBot();
}

// RANDOM ROUTE

var randomPhrases = ["hola como andas", "Soy una frase", "Soy otra frase"];
var newRandomPhrases = [];

function addInput(type, value) {
  let inputs = document.querySelectorAll(".inputPhrase");
  let values = [];
  if (type == "scheduled") {
    let times = document.querySelectorAll(".inputTime");
    if (value == "") {
      object = { phrase: value, time: value };
    }
    newScheduledPhrases.push(object);
    inputs.forEach((input, index) => {
      values.push({ phrase: input.value, time: times[index].value });
    });
    document.querySelector(".form").innerHTML = "";
    newScheduledPhrases = [...values];
    loadScheduled(true, newScheduledPhrases);
    document.querySelector(".form").innerHTML += phraseInput(
      "scheduled",
      value != "" ? value : object,
      newScheduledPhrases.length - 1
    );
    console.log("Scheduled input added: ", newScheduledPhrases);
  }

  if (type == "random") {
    newRandomPhrases.push(value);
    inputs.forEach((input) => {
      values.push(input.value);
    });
    document.querySelector(".form").innerHTML = "";
    newRandomPhrases = [...values];
    loadRandom(true, newRandomPhrases);
    document.querySelector(".form").innerHTML += phraseInput(
      "random",
      value,
      newRandomPhrases.length - 1
    );
    console.log("Random input added: ", newRandomPhrases);
  }
}

function refreshInput(type) {
  for (let i = 0; i < randomPhrases.length; i++) {
    document.querySelector(".inputPhrase")[i].textContent = randomPhrases[i];
  }
}
function delInput(input, button, index) {
  document.querySelectorAll("." + input + index).forEach((e) => e.remove());
  button.remove();
  if (input == "r") {
    if (index == 0) newRandomPhrases.shift();
    if (index > 0) newRandomPhrases.splice(index, index++);
  }

  if (input == "s") {
    if (index == 0) newScheduledPhrases.shift();
    if (index > 0) newScheduledPhrases.splice(index, index++);
  }
}

function phraseWriting(type, text, index) {
  if (type == "random") newRandomPhrases[index] = text.value;
  if (type == "scheduled") newScheduledPhrases[index] = text.value;
}

function addPhrases(type) {
  
  let values = [];
  let inputs = document.querySelectorAll(".inputPhrase");
  if (type == "random") {
    inputs.forEach((input) => {
      input.value != "" ? values.push(input.value) : null;
    });
    newRandomPhrases = [...values];
    document.querySelector(".form").innerHTML = "";
    jsConfig.randomPhrases = [...newRandomPhrases]
    loadRandom(true, newRandomPhrases);
    console.log("Random phrases saved: ", randomPhrases);
  }
  if (type == "scheduled") {
    let times = document.querySelectorAll(".inputTime");
    inputs.forEach((input, pos) => {
      let index = pos;
      if (
        input.value != "" &&
        times[index].value != (0 || undefined || null || "")
      ) {
        values.push({ phrase: input.value, time: times[index].value });
      } else {
        alert("Messages incompleted deleted");
      }
    });
    newScheduledPhrases = [...values];
    document.querySelector(".form").innerHTML = "";
    jsConfig.scheduledPhrases = [...newScheduledPhrases]
    loadScheduled(true, newScheduledPhrases);
    console.log("Scheduled phrases saved: ", scheduledPhrases);

    jsConfig.scheduledPhrases.forEach(phrase => {
      if (!jsConfig.times.includes(phrase.time)){
        jsConfig.times.push(phrase.time)
      }
    })
  }
}

// SCHEDULED ROUTE

var scheduledPhrases = [
  {
    phrase: "First Phrase",
    time: 12,
  },
  {
    phrase: "Second Phrase",
    time: 20,
  },
  {
    phrase: "Third Phrase",
    time: 1,
  },
  {
    phrase: "Fourth Phrase",
    time: 12,
  },
];

var newScheduledPhrases = [];

