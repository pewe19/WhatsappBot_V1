const onlyScheduled=true;const onlyRandom=true;const everyS=['12', '20', '1'];const scheTime=36000;const phrases=['hola como andas', 'Soy una frase', 'Soy otra frase'];const schePhrases=[{phrase:'First Phrase', time:'12'}, {phrase:'Second Phrase', time:'20'}, {phrase:'Third Phrase', time:'1'}, {phrase:'Fourth Phrase', time:'12'}];console.log("Runing Program");var cache=[];var cacheLimit=4;var diff=false;var chosenPhrase=0;var msgInput;count=0;const eventInput=new InputEvent("input",{bubbles:true,});const getTime=()=>new Date(Date.now()).getHours();function randInt(min,max){return Math.round(Math.random()*max-min)}function isDiff(phrase,che){for(i=0;i<=che.length-1;i++){if(che[i]==phrase)return false}return true}function selectPhrase(){diff=false;while(!diff){chosenPhrase=randInt(0,phrases.length-1);isDiff(chosenPhrase,cache)?(diff=true):(diff=false)}}function checkcache(){if(cache.length<cacheLimit){cache.push(chosenPhrase)}else{cache=[];cache.push(chosenPhrase)}}function sendMsg(input){input.dispatchEvent(eventInput);document.querySelector("button._4sWnG").click()}function writeAndSendMsg(phrase){msgInput.textContent=phrase;sendMsg(msgInput)}function sendScheduledMessages(hour){let schePhrase=schePhrases.filter((phrase)=>phrase.time==hour);schePhrase.forEach((p)=>setTimeout(()=>writeAndSendMsg(p.phrase),2000))}function whatsappBot(){let time=getTime();console.groupCollapsed("Message ["+count+"]");console.log("=======================================");console.log("\nSelecting Message... \n\n");if(onlyRandom){selectPhrase();checkcache()}console.log("\tChosen phrase: "+phrases[chosenPhrase]);console.log("\tWriting...");if(onlyScheduled&&everyS<=3600000){scheTime.includes(time)?sendScheduledMessages(time):writeAndSendMsg(phrases[chosenPhrase])}else{onlyRandom?writeAndSendMsg(phrases[chosenPhrase]):null}console.log("\n\n Sent!");count++;console.groupEnd()}function stopBot(){clearInterval(bot);console.log("Bot stoped");count=0}function startBot(){if(onlyRandom){console.groupCollapsed("Message ["+count+"]");console.log("=======================================");console.log("\nSelecting Message... \n\n");selectPhrase();checkcache();console.log("\tChosen phrase: "+phrases[chosenPhrase]);console.log("\tWriting...");writeAndSendMsg(phrases[chosenPhrase]);console.log("\n\n Sent!");console.groupEnd()}if(onlyScheduled){let time=getTime();if(everyS<=3600000){console.log("agendado");if(scheTime.includes(time))sendScheduledMessages(time)}else{alert("You MUST select less than 1 hour between messages on 'onlyScheduled' mode!");alert("The bot wont send scheduled messages until you change the time or disable the onlyschedule mode")}}bot=setInterval(whatsappBot,everyS);console.log("Bot Initialized")}function checkInput(){if(typeof msgInput!="undefined"){console.groupCollapsed("check Input");console.log("Found input");console.log(msgInput);console.groupEnd();startBot();clearInterval(isReady)}else{document.querySelectorAll("._13NKt.copyable-text.selectable-text").forEach((e)=>{e.hasAttribute("spellcheck")?(msgInput=e):null})}}function main(){onlyRandom||onlyScheduled?(isReady=setInterval(checkInput,2000)):alert("No mode selected!")}main();