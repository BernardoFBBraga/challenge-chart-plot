
function prettyPrintName(str){
	var frags = str.split('_');
  for (let i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}
const groupNameReducer = (name,groupName) => name += (prettyPrintName(groupName) + " ")
const generateLineName = (element,groupNames,selectName)=> groupNames.map(g=>element[g]).reduce(groupNameReducer,"")+prettyPrintName(selectName)

function formattedXAxisLabel(timestamp){
	let date = new Date(timestamp)
	return `${String(date.getMinutes()).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`
}

const generateChartState = (JSONcode) => {
	let code
	try{
		code = JSON.parse(JSONcode)
	}catch(e){
		throw Error("Invalid JSON")
	}
	if(! (code instanceof Array) ) throw Error("Input is expected to be an array of events")
	let select, group, begin, end, chartDataArr, dataMap

	//we start reading the data backwards to find the last start event
	let i; //we will use the same index in the two loops below. We will first find the start event backwards, then keep moving forward to consumer the rest of the data
	for (i = code.length - 1; i >= 0; i--) {
		if (code[i].type === 'start') {
			select = code[i].select
			group = code[i].group
			chartDataArr = []
			dataMap = {}
			break;
		}
	}
	if (i < 0) throw Error("There is no start event")
	for (; i < code.length; i++) {
		if(!code[i].type)	throw Error("Invalid event detected: " + JSON.stringify(code[i]) )
		switch (code[i].type) {
			case 'start':
				if(!code[i].select) throw Error('Start events should have a select array. Example: {"type":"start","timestamp":123,"select":["a","b"],"group":["x","y"]}')
				if(!code[i].group) throw Error('Start events should have a group array. Example: {"type":"start","timestamp":123,"select":["a","b"],"group":["x","y"]}')
				select = code[i].select
				group = code[i].group
				chartDataArr = []
				dataMap = {}
				break;
			case 'span':
				if(!code[i].end) throw Error("Span events should have an end value, and it should be larger than zero")
				if(!code[i].begin && code[i].begin!==0 ) throw Error("Span events should have a begin value")
				if(code[i].end <= code[i].begin) throw Error("Span event defines invalid boundaries (end value is smaller or equal to begin value)")
				begin = code[i].begin
				end = code[i].end
				break;
			case 'data':
				if (code[i].timestamp >= begin && code[i].timestamp <= end) {
					select.forEach(s => { // eslint-disable-line no-loop-func
						let lineName = generateLineName(code[i],group,s)
						if (!dataMap[lineName]) {
							dataMap[lineName] = { name: lineName, data: {} }
							chartDataArr.push(dataMap[lineName])
						}
						//add new data point to the existing object

						dataMap[lineName].data[formattedXAxisLabel(code[i].timestamp - begin)] = code[i][s]
					})
				}
				break;
			case 'stop':
				i = code.length;//stop parsing
				break;
			default:
				throw Error("Invalid event detected: "+ JSON.stringify(code[i]))
		}
	}

	if(chartDataArr.length===0)throw Error("No valid data events were found after the last start event")

	let dataLength = chartDataArr[0].data.length
	if(chartDataArr.find(event=>event.data.length!==dataLength))throw Error("To generate the graph, all lines must have the same amount of data points")

	return {
		code: JSONcode,
		data: chartDataArr,
		dataMap: dataMap,
		begin,
		end,
	}
}

export {generateChartState}