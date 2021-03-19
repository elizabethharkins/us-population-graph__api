

const router = require("express").Router();
const fetch = require("node-fetch");

/*	== message, received
router.get("/", function(req, res) {
    res.send("States Info");
});
*/

// == fake data test, checks out
/*
let data = [
    { id: 1, name: "Virginia", order: 1, population: 8517685, year: 2018, createdOn: new Date() },
    { id: 2, name: "California", order: 2, population: 39557045, year: 2018, createdOn: new Date() },
    { id: 3, name: "Montana", order: 3, population: 1062305, year: 2018, createdOn: new Date() },
];
console.log(data);

// HTTP methods, test re: fake data ...

// READ
// returns JSON data array
router.get("/", function (req, res) {
    res.status(200).json(data);
});
*/

/*
fetch("https://datausa.io/api/data?drilldowns=State&measures=Population")
	.then(res => res.text())
	.then(text => console.log(text))
*/

let data = [];
console.log(data);

router.get("/", function (req, res) {
    res.status(200).json(data);
});

const apiCall = () => fetch("https://datausa.io/api/data?drilldowns=State&measures=Population")
	.then(res => {
  		if (res.ok) {
    		return res.json();
  		}
  			throw new Error(res);
		})
	.catch(console.err);

async function byState(searchterm) {
	const filterStates = (data) => data.filter((data) => data.State === searchterm);
	let results = await apiCall();
	filterStates(results.data);
	console.log(filterStates(results.data));
}

// proxy server; server is a proxy for datausa
router.post("/", async function(req, res) {

    let newState = req.body.name;
    byState(newState);
    console.log(newState);

  	// check
    let newItem = {
        name: req.body.name, 
    };

    data.push(newItem);
    res.status(201).json(newItem);

});


module.exports = router;



