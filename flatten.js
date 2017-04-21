var flatten = require('./lib/flatten.js');
var nestedArray = [ 1, [2, [3]], 4, [[[5]]] ];
var final = []

console.log( 'flattening', nestedArray );
console.log( '\n\n' );


try {
	final = flatten( nestedArray );
	console.log( 'result:', final );
}
catch(e){
	console.log(e.message);
}
