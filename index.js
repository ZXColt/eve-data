const fs = require('fs');
const axios = require('axios').default;
const regions = {
	'The Forge': 10000002,
	Domain: 10000043,
	Heimatar: 10000030,
	'Sinq Laison': 10000032,
	Metropolis: 10000042,
};

async function main() {
	var ores = fs.readFileSync('oredata.json', (err) => {
		if (err) throw err;
	});
	ores = JSON.parse(ores);

	var request = await axios.get(
		'https://ore.cerlestes.de/data/overview/ore-10000002.json'
	);

	var orePrices = request.data.prices;
	let orem3Prices = [];

	ores.forEach((ore) => {
		//console.log(ore);
		var rawPrice = orePrices[ore.types_raw[0]].sp98;

		var compressedPricem3 = undefined;
		if (ore.types_compressed[0] != undefined) {
			var compressedPrice = orePrices[ore.types_compressed[0]].sp98;
			compressedPricem3 = compressedPrice / ore.volume;
		}
		var pricem3 = rawPrice / ore.volume;

		var prices = {
			name: ore.id,
			'isk/m3': pricem3.toLocaleString(),
			'compressed isk/m3':
				compressedPricem3 != undefined
					? compressedPricem3.toLocaleString()
					: '0.00',
		};
		orem3Prices.push(prices);
	});
	console.log(orem3Prices);
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
