const groupNameReducer = (name,groupName) => name += (groupName + " ")
const generateLineName = (element,groupNames,selectName)=> groupNames.map(g=>element[g]).reduce(groupNameReducer,"")+selectName


const generateChartState = (JSONcode) => {
	let code = JSON.parse(JSONcode)
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
		switch (code[i].type) {
			case 'start':
				select = code[i].select
				group = code[i].group
				chartDataArr = []
				dataMap = {}
				break;
			case 'span':
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
						dataMap[lineName].data[code[i].timestamp] = code[i][s]
					})
				}
				break;
			case 'stop':
				i = code.length;//stop parsing
				break;
			default:
				break;
		}

	}
	return {
		code: JSONcode,
		data: chartDataArr,
		dataMap: dataMap,
		begin,
		end,
	}
}

export {generateChartState}