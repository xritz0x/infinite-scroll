const imgContainer = document.querySelector('.imgs-container');
const key =  'EZm5SNCY7bqtR1qeIRIKwzRyezfwfDHhmyEbSMBmgBU';
const count = 10 ;
const reqUrl = `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;
var arrayImgs = [];
var ready = false;
var totalImgs = 0;
var loadedImgs = 0;
const loader = document.querySelector('.loader');

const setAttrs = (element,obj) => {
    for (const key in obj){
        element.setAttribute(key,obj[key])
    }
}
const onLoadImgs = () => {
    loadedImgs++;
    if (loadedImgs === totalImgs){
        ready = true;
        loader.hidden = true;
    }

}


const displayImgs = () => {
    loader.hidden = false;
    totalImgs += arrayImgs.length;       // assigning total imgs before looping
    arrayImgs.forEach((img) => {        // Loping into imgs
        let link = document.createElement('a');     // Setting attributes for <a>
        setAttrs(link,{
            href:img.links.html,
            target:"_blank"
        });
        link.classList.add('img-link');             // Setting attributes for the <img>
        let imgLink = document.createElement('img');
        setAttrs(imgLink,{
            src:img.urls.regular,
            alt:img.alt_description,
            title:img.alt_description
        })
        imgContainer.appendChild(link);         // inserting the <a> element inside the imgContainer
        link.appendChild(imgLink);              // inserting the <img> in the <a> element
        imgLink.addEventListener('load',onLoadImgs);
    })
}
async function req(){
    const ftch = await fetch(reqUrl);
    arrayImgs = await ftch.json();
    displayImgs()
}
const loadMore = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 && ready){
        ready = false;
        req();

    }
}
window.addEventListener('scroll',loadMore);
// On Load
req();
