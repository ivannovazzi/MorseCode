// the flatte recursive algorithm
function flatten( nestedArray ){
	var tmp = [];
	for( var i = 0; i< nestedArray.length; i++ ){
		var element = nestedArray[ i ];
		if( Array.isArray(element) ){
			tmp = [...tmp, ...flatten(element) ];
		}
		else{
			if( typeof element != 'number' ){
				throw new Error(`${element} is not a number, passed ${typeof element}`)
			}
			tmp = [...tmp, element ];
		}
	}	
	return tmp
}

module.exports = flatten