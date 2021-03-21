

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

/* == test
fetch("https://datausa.io/api/data?drilldowns=State&measures=Population")
	.then(res => res.text())
	.then(text => console.log(text))

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
*/

let selectedStateData = {};
console.log(selectedStateData);

router.get("/", function (req, res) {
	res.status(200).json(selectedStateData);
});

// proxy server; server is a proxy for datausa
router.post("/", function(req, res) {

	const stateToCheck = req.body.name;
	console.log(stateToCheck);

	(async () => {
		try {
			const population = await fetch("https://datausa.io/api/data?drilldowns=State&measures=Population")
				.then(res => res.json())

			const byState = (data) => data
				.filter(data => data.State === stateToCheck)
				.map(data => { return { name: data.State, year: data.Year, population: data.Population } });

			let results = byState(population.data);
			console.log(results);
			console.log(`Population results for ${stateToCheck} are above.`);

			selectedStateData = results;
			res.status(201).json(results);

			// chart config, initial
			const add_X_Values = (arr) => {
			  	return arr.map( (obj, index) => {
			    	return Object.assign({}, obj, { x: index });
			  	});
			};

			const chartDataInput = 
				results
					.sort((a, b) => (a.year > b.year) ? 1 : -1)
					.map(item => { return { label: item.year.toString(), y: item.population } });
			const chartDataOutput = add_X_Values(chartDataInput);
			console.log(chartDataOutput);
			console.log(`Chart config for ${stateToCheck} is above.`);


		}
		catch(error) {
			console.log(error)
		}
		/*
		const population = await fetch("https://datausa.io/api/data?drilldowns=State&measures=Population")
			.then(res => res.json())

		const byState = (data) => data
			.filter(data => data.State === stateToCheck)
			.map(data => { return { name: data.State, year: data.Year, population: data.Population } });

		let results = byState(population.data);
		console.log(results);
		console.log(`Population results for ${stateToCheck} are above.`);

		selectedStateData = results;
		res.status(201).json(results);
		*/
	})();

	// check
	/*
	let newItem = {
		name: req.body.name, 
	};

	selectedStateData.push(newItem);
	res.status(201).json(newItem);
	*/

});


module.exports = router;



