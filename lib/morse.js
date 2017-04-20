const mappings = {
	'A': '.-',
	'B': '-...',
	'C': '-.-.',
	'D': '-..',
	'E': '.',
	'F': '..-.',
	'G': '--.',
	'H': '....',
	'I': '..',
	'J': '.---',
	'K': '-.-',
	'L': '.-..',
	'M': '--',
	'N': '-.',
	'O': '---',
	'P': '.--.',
	'Q': '--.-',
	'R': '.-.',
	'S': '...',
	'T': '-',
	'U': '..-',
	'V': '...-',
	'W': '.--',
	'X': '-..-',
	'Y': '-.--',
	'Z': '--..',
	'0': '-----',
	'1': '.----',
	'2': '..---',
	'3': '...--',
	'4': '....-',
	'5': '.....',
	'6': '-....',
	'7': '--...',
	'8': '---..',
	'9': '----.',
	'.': '.-.-.-',
	',': '--..--'
};



const toMorseArray = ( input ) => {
	
	if( typeof input !== 'string' ){
		throw new Error('Input should be a string, passed ' + typeof input )
	}

	if( ! /^[A-Z\.\,]*$/.test( input ) ){
		throw new Error('Invalid characters were found in the passed argument')
	}

	return [ ...input ].map( char => mappings[ char ] );
}


const getSeparation = ( input ) => {
	
	if( typeof input !== 'string' ){
		throw new Error('Input should be a string, passed ' + typeof input )
	}

	var newString = input
		.split(' ')
		.map( word => new Array( Math.max( word.length -1, 0 ) )
			.fill('|')
			.join('')
		)
		.join('/')
	
	return [ ...newString ]
}

const obfuscate = ( input = '' ) => {
	
	if( typeof input !== 'string' ){
		throw new Error('Input should be a string, passed ' + typeof input )
	}

	let singleChars = [ ...input ];
	let conv = [];
	let isDot = false, isDash = false;
	
	for( var i = 0; i < singleChars.length; i++ ){
		
		if( singleChars[i] === '.' ){
			isDash = false;
			if( isDot )
				conv[ conv.length -1 ] ++;
			else{
				conv.push(1);
				isDot = true;
			}
			continue
		}
		isDot = false;

		if( singleChars[i] === '-' ){
			isDot = false;
			if( isDash ){				
				conv[ conv.length -1 ] = String.fromCharCode( conv[ conv.length -1 ].charCodeAt(0) + 1 );
			}
			else{
				conv.push('A');
				isDash = true;
			}
			continue
		}
		isDash = false

		conv.push( singleChars[i] )

	}	
	return conv.join('')
}

// Main conversion method 
// 
const convert = ( input ) => {
	
	if( typeof input !== 'string' ){
		throw new Error('Input should be a string, passed ' + typeof input );
	}

	input = input.toUpperCase();

	if( ! /^[A-Z\.\,\ ]*$/.test( input ) ){
		throw new Error('Invalid characters were found in the passed argument');
	}
	if( input.length === 0 ){
		return ''
	}
	
	// Begin conversion 
	const inputLetters = input.replace(/\ /g,'');
	const separators = getSeparation( input );
	const morse = toMorseArray( inputLetters );
	
	let mergedMorse = '';
	
	for( var i=0, j=0; i< inputLetters.length -1 ; i++ ){		
		mergedMorse += morse[ i ];
		mergedMorse += separators[ i ];
	}
	mergedMorse += morse[ i ];	

	return obfuscate( mergedMorse );
}


module.exports = {
	toMorseArray: toMorseArray,
	obfuscate: obfuscate,
	getSeparation: getSeparation,
	convert: convert
};