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
        let links=[]
        fetch(`https://api.shrtco.de/v2/shorten?url=${text}`)
            .then(res => res.json())
            .then(result => {
                links.push(result.result["full_short_link"])
                links.push(result.result["short_link"])
                displayURLs(links)
            })
        input.value = ""

    }
})
//map or forEach only works on array
function displayURLs(links) {
    container.innerHTML = ""; // clear the container before adding new links
    links.forEach((shortLink, index) => {
        let linkContainer = document.createElement("div");
        linkContainer.innerHTML =
        `<div>
            <h4>${shortLink}</h4>
            <button id="copy-btn-${index}" class="copy-btn">Copy</button>
        </div>`;
        container.appendChild(linkContainer);

        const copyButton = document.querySelector(`#copy-btn-${index}`);

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(shortLink).then(() => {
                alert('Link copied to clipboard!');
            }).catch(err => {
                alert('Something went wrong');
                console.error('Failed to copy text: ', err);
            });
        });
    });
}