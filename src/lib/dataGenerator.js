var fs = require('fs');

let os_types = ["mac", "linux", "windows", "chromeOS"]
let browser_types = ["chrome", "opera"]

let combinations = os_types.length * browser_types.length

let number_of_data_points = process.argv[2] ? process.argv[2] : 100

let arraySize = combinations * number_of_data_points + 3 //+3 for start, span, end

let testData = Array(arraySize)

testData[0] = { "type": "start", "timestamp": 0, "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"] }
testData[1] = { "type": "span", "timestamp": 0, "begin": 0, "end": number_of_data_points }
for (let i = 0; i < number_of_data_points; i++) {
	for (let j = 0; j < os_types.length; j++) {
		for (let k = 0; k < browser_types.length; k++) {
			testData[2 + i * combinations + (j * browser_types.length) + k] = { "type": "data", "timestamp": i, "os": os_types[j], "browser": browser_types[k], "min_response_time": Math.random(0, 1), "max_response_time": Math.random(1, 2) }
		}
	}
}
testData[arraySize - 1] = { "type": "stop", "timestamp": number_of_data_points }

var fileContent = JSON.stringify(testData)


// The absolute path of the new file with its name
var filepath = `testData${number_of_data_points} ${os_types.length}x${browser_types.length}.json`;
console.log(`Generating test data for ${number_of_data_points} with 2 groups: ${os_types.length} types on the first group and ${browser_types.length} on the second group`)
console.log(`Array will be ${arraySize} elements long`)
fs.writeFile(filepath, fileContent, (err) => {
	if (err) throw err;

	console.log("The file was succesfully saved!");
});