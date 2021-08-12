var rootGifUrl = "https://api.giphy.com/v1/gifs/search";
var jsonData;
let url2 = "https://github.com/mcnaveen/Random-Words-API";
let btn = document.getElementById('search');
let index = 0;
let leftBtn = document.getElementById('left');
let rightBtn = document.getElementById('right');


fetch("https://random-words-api.vercel.app/word")
    .then((results) => {
        console.log(results);
        return results.json();
    })
    .then((myJson) => {
        let p = document.createElement("p");
        p.id = "wordId";
        let word = myJson[0].word;
        document.querySelector('title').innerText = word;
        p.innerText = word;
        console.log(myJson[0].word);
        document.body.prepend(p);
        console.log(myJson);
        gifUrl = rootGifUrl + `?api_key=wY9A40D4WsCROS59MY9CR4EhL3XRVr9Y&q=${word}`;
        console.log('hey')

        return fetch(gifUrl)
    })
    .then((results) => {
        console.log(results);
        return results.json();
    })
    .then((myJson) => {
        console.log(myJson)
        jsonData = myJson;
        let img = document.createElement('img');
        img.id = "image";
        img.src = myJson.data.length != 0 ? myJson.data[0].images.original.url : "noImage.png";
        document.body.prepend(img);
        console.log(myJson);
    })


const newWord = (e) => {
    e.preventDefault();
    let word = document.getElementById('word').value;
    let pWord = document.getElementById('wordId');
    pWord.innerText = word;
    document.querySelector('title').innerText = word;
    document.getElementById('word').value = "";
    let gifUrl = rootGifUrl + `?api_key=wY9A40D4WsCROS59MY9CR4EhL3XRVr9Y&q=${word.replace(" ", "&20")}`;

    fetch(gifUrl)
        .then((results) => {
            console.log(results);
            return results.json();
        })
        .then((myJson) => {
            console.log(myJson, "hey")
            jsonData = myJson;
            let img = document.getElementById('image');
            img.src = myJson.data.length != 0 ? myJson.data[0].images.original.url : "noImage.png";
            console.log(myJson);
        })
}

const changeImg = (direction) => {

    let img = document.getElementById('image');
    if (direction > 0) {
        index += index < (jsonData.data.length) ? 1 : 0;
        img.src = jsonData.data[index].images.original.url;
    } else {
        index -= index != 0 ? 1 : 0;
        img.src = jsonData.data[index].images.original.url;
    }
}


leftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    changeImg(-1);
})
rightBtn.addEventListener('click', (e) => {
    e.preventDefault();
    changeImg(1);
})
btn.addEventListener('click', newWord);