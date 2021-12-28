const content = document.getElementById("content");
// HOME ROUTE



var pyConfig = {
  browser: "",
  phone: "",
}


var jsConfig = {
  modes: {
    random: false,
    scheduled: false
  },
  randomPhrases: [],
  scheduledPhrases: [],
  times: [],
  every: 36000,
}


var randomPhrases = [];
var newRandomPhrases = [];

var scheduledPhrases = [];
var newScheduledPhrases = [];

function asignarJsConfig(obj) {
  jsConfig.modes.random = obj.modes[0];
  jsConfig.modes.scheduled = obj.modes[1];
  jsConfig.randomPhrases = [...obj.randomPhrases];
  jsConfig.scheduledPhrases = [...obj.scheduledPhrases];
  jsConfig.times = [...obj.time];
  jsConfig.every = obj.every;
}

function asignarPyConfig(obj) {
  pyConfig.browser = obj.browser;
  pyConfig.phone = obj.phone;
  document.getElementById("Phone").value = pyConfig.phone
  document.getElementById("Browser").value = pyConfig.browser
}

eel.expose(getSavedData)
function getSavedData(jsData, pyData) {
  savedJsData = JSON.parse(jsData);
  savedPyData = JSON.parse(pyData);
  console.log(savedPyData)
  if (savedJsData != (undefined || null || "")) asignarJsConfig(savedJsData)
  if (savedPyData != (undefined || null || "")) asignarPyConfig(savedPyData)
  console.log("Valores guardados asigandos a js COnfig", jsConfig)
  console.log("Valores guardados asigandos a py COnfig", pyConfig)
  randomPhrases = [...jsConfig.randomPhrases]
  scheduledPhrases = [...jsConfig.scheduledPhrases]
}

function checkLocalData() {
  console.log(jsConfig)
  eel.checkSavedData()
}

checkLocalData();

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
  if (e.id == "Every") jsConfig.every = Number(e.value) * 60000;
}

function saveBot() {
    eel.getpythonConfig(JSON.stringify(pyConfig));
    eel.getjsConfig(JSON.stringify(jsConfig));
}

function startBot() {
  saveBot()
  eel.startBot();
}

// RANDOM ROUTE



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
    jsConfig.times = []
    jsConfig.scheduledPhrases.forEach(phrase => {
      if (!jsConfig.times.includes(phrase.time)){
        jsConfig.times.push(phrase.time)
      }
      
    })

  }
  saveBot()
}

// SCHEDULED ROUTE



