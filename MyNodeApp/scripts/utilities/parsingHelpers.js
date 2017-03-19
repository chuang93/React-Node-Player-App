module.exports.getTupleArrayProperties= function getTupleArrayProperties(object){
	const fields = new Array();
	const arr = new Array();
	for(var property in object){
			if (object.hasOwnProperty(property)){
				fields.push(property);
				arr.push(object[property]);
			}
		}
		const tupleArray=[];
		for(var i=0; i<arr.length;i++){
			tupleArray.push([fields[i],arr[i]]);
		}
		return tupleArray;
}
