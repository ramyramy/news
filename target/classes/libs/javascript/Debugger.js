var Debugger = function() { };

Debugger.log = function(message) {
	try
	{
		console.log(message);	
	}
	catch (exception)
	{
		 return;
	}
};

Debugger.dir = function(obj) {
	try
	{
		console.log(obj);	
	}
	catch (exception)
	{
		 return;
	}
}

Debugger.trace = function(key, value) {
	try
	{
		console.log(key + ': [' + value + ']');	
	}
	catch (exception)
	{
		 return;
	}
}

