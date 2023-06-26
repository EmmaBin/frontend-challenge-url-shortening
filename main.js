// get the input from user -> input.value
// if not exsit, alert Message
// else loop over long and short url, each with a copy btn and functionality

const form = document.querySelector("#form")
const input = document.querySelector("#input")
const container = document.querySelector("#url-container")
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value) {
        alert("Please type your URL!");
    } else {
        let text = input.value;
        fetch(`https://api.shrtco.de/v2/shorten?url=${text}`)
            .then(res => res.json())
            .then(result => console.log(result.result))
        input.value=""

    }
})