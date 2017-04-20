var expect    = require("chai").expect;
var morse = require('../lib/morse.js')

describe('Testing toMorseArray function', function() {
	
	it('Should throw an error if converting unsupported characters', function(){
		expect(morse.toMorseArray.bind(morse, '*')).to.throw('Invalid characters were found in the passed argument');		
	});

	it('Should throw an error if converting an undefined value', function(){
		expect(morse.toMorseArray.bind(morse, undefined)).to.throw('Input should be a string, passed undefined');
	});

	it('Should throw an error if converting an integer value', function(){
		expect(morse.toMorseArray.bind(morse, 4)).to.throw('Input should be a string, passed number');
	});
	
	it('Should throw an error if passing string with spaces "I AM IN TROUBLE"', function() {
		
		expect(morse.toMorseArray.bind(morse, 'I AM IN TROUBLE') ).to.throw('Invalid characters were found in the passed argument');		
	});
	it('Should convert correcly "IAMINTROUBLE"', function() {
		expect(morse.toMorseArray('IAMINTROUBLE') ).to.deep.equal([ '..','.-','--','..','-.','-','.-.','---','..-','-...','.-..','.' ]);
	});

});

describe('Testing getSeparation function', function() {
	
	
	it('Should throw an error if separating an undefined value', function(){
		expect(morse.getSeparation.bind(morse, undefined)).to.throw('Input should be a string, passed undefined');
	});

	it('Should throw an error if converting an integer value', function(){
		expect(morse.getSeparation.bind(morse, 4)).to.throw('Input should be a string, passed number');
	});
	
	it('Should convert correcly "I AM IN TROUBLE"', function() {
		expect(morse.getSeparation('I AM IN TROUBLE') ).to.deep.equal([ '/', '|', '/', '|', '/', '|', '|', '|', '|', '|', '|' ]);
	});

});

describe('Testing morse obfuscated conversion', function() {
	
	it('Should throw an error if converting unsupported characters', function(){
		expect(morse.convert.bind(morse, '*')).to.throw('Invalid characters were found in the passed argument');		
	});
	
	it('Should throw an error if converting an undefined value', function(){
		expect(morse.convert.bind(morse, undefined)).to.throw('Input should be a string, passed undefined');
	});
	
	it('Should throw an error if converting an integer value', function(){
		expect(morse.convert.bind(morse, 4)).to.throw('Input should be a string, passed number');
	});
	
	it('Should convert correcly "I AM IN TROUBLE"', function() {
		expect(morse.convert('I AM IN TROUBLE')).to.equal('2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1')
	});

});
