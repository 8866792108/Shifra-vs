const voice = document.querySelector("#voice")
const content = document.querySelector("#content")
const btn = document.querySelector("#btn")

function spoke(text) {
    let speach = new SpeechSynthesisUtterance(text)
    speach.rate = 1
    speach.pitch = 1
    speach.volume = 1
    speach.lang="hi-GB"
    window.speechSynthesis.speak(speach)
}

function wish() {
    let dt = new Date()
    let Hours = dt.getHours()
    if (Hours >= 0 && Hours < 12) {
        spoke("Good Morning Sir")
    } else if (Hours >= 12 && Hours < 16) {
        spoke("Good Afternoon Sir")
    } else if (Hours >= 16 && Hours < 19) {
        spoke("Good Evening Sir")
    } else {
        spoke("Good Night Sir")
    }
}

// window.addEventListener("load",()=>{
//     wish()
// })

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onstart = function () {
    console.log('voice is activated');
};
recognition.onresult = (event) => {
    let currentindex = event.resultIndex
    let transcript = event.results[currentindex][0].transcript
    content.innerText = transcript
    console.log(event)
    takecommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"

})
voice.addEventListener("click", () => {
    btn.style.display = "flex";
    voice.style.display = "none";

})

function takecommand(transcript) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (transcript.includes("hello") || transcript.includes("hay")) {
        spoke("Hello Sir, What can i help you?")
    } else if (transcript.includes("who are you")) {
        spoke("i am virtual assistant,created by sanjay")
    } else if (transcript.includes("open google")) {
        window.open("https://www.google.com/", "_blank")
    } else if (transcript.includes("open youtube")) {
        window.open("https://www.youtube.com/", "_blank")
    } else if (transcript.includes("open facebook")) {
        spoke("opening facebook")
        window.open("https://www.facebook.com/", "_blank")
    } else if (transcript.includes("open instagram")) {
        spoke("opening instagram")
        window.open("https://www.instagram.com/", "_blank")
    }else if(transcript.includes("open calculator")){
        spoke("opening calculator")
        window.open("calculator://")
    }else if(transcript.includes("open whatsapp")){
        spoke("opening whatsapp")
        window.open("whatsapp://")
    }
    else {
        let msg = transcript.replace("shifra", "") && transcript.replace("shipra", "")
        spoke(`this is what i found on internet regarding ${msg}`)
        window.open(`https://www.google.com/search?q=${msg}`, "_blank")
    }
}