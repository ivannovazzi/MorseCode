const fs = require('fs');
const convert = require('./lib/morse.js').convert;

// Get CLI arguments 
const cli = process.argv.slice( 2 );
const [ argument, argumentValue ] = cli;

// Detect file input or CLI parameters
if( argument != '-f' && argument != '-s' ){
	console.log('Please use parameters -f [filename] or -s [string] to run this program');
	process.exit();
}


const decodeString = ( decodingValues ) => {
	if( Array.isArray(decodingValues) === false ){
		decodingValues = [ decodingValues ];
	}
	var decodedValues = [], errors = [];
	decodingValues.forEach( ( words, index ) => {
		try{
			decodedValues.push( morse(words) );
		}
		catch(e){
			errors.push({line: index + 1 , message: e.message })		
		}
	})

	if( errors.length ){
		decodedValues = -1;
	}
	return decodedValues, errors.map( error => `${error.line}: ${error.message}` );

}

var output = [], errors = [];
if( argument === '-f' ){
	
	if( ! fs.existsSync( argumentValue ) ){
		console.error( 'File', argumentValue, 'doesn\'t exist' );
		process.exit();
	}	
	
	fs.readFileSync( argumentValue ).toString().split('\n').forEach( (words, index) => {
		try{
			output.push( convert( words ) )
		}
		catch(e){
			errors.push(`Line ${index }: ${e.message}`)
		}
	})
	
}
else{
		
	try{
		output.push( convert( argumentValue ) );		
	}
	catch(e){
		errors.push( e.message )
	}
}

if( errors.length ){
	console.log( errors.join('\n') );
}
else{
	console.log( output.join('\n') );
}
