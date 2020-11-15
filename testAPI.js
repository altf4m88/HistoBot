const fetch = require("node-fetch");

const BASEURL = "http://history.muffinlabs.com";

const getInfo = () => {
    fetch(`${BASEURL}/date`)
    .then(response => {
        return response.json();
    })
    .then(object => {
        let data = object.data.Events;
        renderMessage(data);
    })
    .catch(e => {
        console.log(e);
    })
}

const renderMessage = (items) => {
    console.log("TODAY EVENTS");
    for(let item of items){
        console.log(`year: ${item.year}`);
        console.log(`info: ${item.text}`);
        console.log(`related links:`)
        for(let links of item.links){
            console.log(`${links.title}, ${links.link}`);
        }
    }
}
getInfo();


