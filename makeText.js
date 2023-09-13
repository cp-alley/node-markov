"use strict";

const { MarkovMachine } = require('./markov')
const fsP = require("fs/promises");


let machine


/** Reads file and logs data */
async function cat(path) {
    let data;
    try {
        data = await fsP.readFile(path, "utf8");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    machine = new MarkovMachine(data)
    console.log(machine.getText());
    console.log(machine.chains);
}

/** Retrieves and logs data from url */
async function webCat(url) {
    let webData;
    try {
        const data = await fetch(url);
        webData = await data.text();
    } catch (err) {
        console.error(`Error fetching ${url}:\n${err.name} : ${err.message} `);
        process.exit(1);
    }
    machine = new MarkovMachine(webData);
    console.log(machine.getText());
    console.log(machine.chains);
}

const arg = process.argv[3];
URL.canParse(arg) ? webCat(arg) : cat(arg);
