const fs = require('fs');
const axios = require('axios').default;
const tableToJson = require('tabletojson').Tabletojson;

async function main() {
	var ores = fs.readFileSync('oresv2.json', (err) => {
		if (err) throw err;
	});
	ores = JSON.parse(ores);

	var request = await axios.get(
		'https://ore.cerlestes.de/data/overview/ore-10000002.json'
	);

	var orePrices = request.data.prices;

	ores.forEach((ore) => {
		var rawPrice = orePrices[ore.types_raw[0]]['sp98'];
		console.log(rawPrice);
		var compressedPrice = orePrices[ore.types_compressed[0]]['sp98'];
		var vol = ore.volume;
		var pricem3 = (ore.batch / ore.volume) * rawPrice;
		console.log(ore.id + pricem3);
	});
	//console.log(request.data.prices);
	//write to file
	// var js = JSON.stringify(oresjson);
	// fs.writeFile('oredata.json', js, (err) => {
	// 	if (err) {
	// 		throw err;
	// 	}
	// });
	//console.log(tableJsons[1]);
}

main();
