import {generateChartState} from './codeParser'

	const validEventSequence = [
		{ type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['x', 'browser'] },
		{ type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201 },
		{ type: 'data', timestamp: 1519780251000, x: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3 },
		{ type: 'data', timestamp: 1519780260201, x: 'linux', browser: 'chrome', min_response_time: 0.5, max_response_time: 1.5 },
		{ type: 'stop', timestamp: 1519780251293 },
		{ type: 'start', timestamp: 1519780251000, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser'] },
		{ type: 'span', timestamp: 1519780251000, begin: 1519780251000, end: 1519780260201 },
		{ type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3 },
		{ type: 'data', timestamp: 1519780260201, os: 'linux', browser: 'chrome', min_response_time: 0.5, max_response_time: 1.5 },
		{ type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'opera', min_response_time: 0.2, max_response_time: 1.7 },
		{ type: 'data', timestamp: 1519780260201, os: 'linux', browser: 'opera', min_response_time: 0.7, max_response_time: 1.8 },
		{ type: 'data', timestamp: 1519780251000, os: 'windows', browser: 'opera', min_response_time: 0.9, max_response_time: 1.3 },
		{ type: 'data', timestamp: 1519780260201, os: 'windows', browser: 'opera', min_response_time: 0.8, max_response_time: 1.2 },
		{ type: 'data', timestamp: 1519780251000, os: 'windows', browser: 'chrome', min_response_time: 0.3, max_response_time: 1.0 },
		{ type: 'data', timestamp: 1519780260201, os: 'windows', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.9 },
		{ type: 'stop', timestamp: 1519780260201 },
	]

it('parses valid JSON', () => {
  generateChartState(JSON.stringify(validEventSequence))
});

describe("Fail gracefully when events don't have the required properties", function() {
	const illDefinedStartEvent1 =[
		{ type: 'start', timestamp: 1519780251293, group: ['x', 'browser'] }
	]
	it('fails to parse start events without select',() => {
		expect(()=>generateChartState(JSON.stringify(illDefinedStartEvent1))).toThrowError('Start events should have a select array. Example: {"type":"start","timestamp":123,"select":["a","b"],"group":["x","y"]}')
	});

	const illDefinedStartEvent2 =[
		{ type: 'start', timestamp: 1519780251293,  select: ['min_response_time', 'max_response_time'] }
	]
	it('fails to parse start events without group',() => {
		expect(()=>generateChartState(JSON.stringify(illDefinedStartEvent2))).toThrowError('Start events should have a group array. Example: {"type":"start","timestamp":123,"select":["a","b"],"group":["x","y"]}')
	});

	const illDefinedSpanEvent =[
		{ type: 'start', timestamp: 1,  select: ['x', 'y'], group: ['a', 'b'] },
		{ type: 'span', timestamp: 1, begin: 2, end: 1 },
	]
	it('fails to parse span events with end smaller than begin',() => {
		expect(()=>generateChartState(JSON.stringify(illDefinedSpanEvent))).toThrowError("Span event defines invalid boundaries (end value is smaller or equal to begin value)")
	});

	const illDefinedSpanEvent2 =[
		{ type: 'start', timestamp: 1,  select: ['x', 'y'], group: ['a', 'b'] },
		{ type: 'span', timestamp: 1, end: 1 },
	]
	it('fails to parse span events without a start property',() => {
		expect(()=>generateChartState(JSON.stringify(illDefinedSpanEvent2))).toThrowError("Span events should have a begin value")
	});

	const illDefinedSpanEvent3 =[
		{ type: 'start', timestamp: 1,  select: ['x', 'y'], group: ['a', 'b'] },
		{ type: 'span', timestamp: 1, begin: 2 },
	]
	it('fails to parse span events without an end property',() => {
		expect(()=>generateChartState(JSON.stringify(illDefinedSpanEvent3))).toThrowError("Span events should have an end value, and it should be larger than zero")
	});

	const noType =[
		{ timestamp: 1,  select: ['x', 'y'], group: ['a', 'b'] }
	]
	it('fails to parse events without a type',() => {
		expect(()=>generateChartState(JSON.stringify(noType))).toThrowError()
	});

	const invalidType =[
		{ type: 'x', timestamp: 1, begin: 2 },
	]
	it('fails to parse events with invalid types',() => {
		expect(()=>generateChartState(JSON.stringify(invalidType))).toThrowError()
	});

})


it('fails on JSON with no data', () => {
	expect(()=>generateChartState("")).toThrowError()
});

it('fails on empty object JSON', () => {
	expect(()=>generateChartState("{}")).toThrowError("Input is expected to be an array of events")
});

it('fails on empty array JSON', () => {
	expect(()=>generateChartState("[]")).toThrowError("There is no start event")
});
it('fails on array without a start event', () => {
	expect(()=>generateChartState("[{}]")).toThrowError("There is no start event")
});

it('fails on JSON with invalid data', () => {
	expect(()=>generateChartState('[{"foo":"bar"}]')).toThrowError("There is no start event")
});
