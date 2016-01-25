$(document).ready(function(){
	$("#NETToJSForSetFieldValueFromFieldValueButton").click(function(){
		var netCode = $("#NETToJSForSetFieldValueFromFieldValue_NET")[0].value;
		var jsCode = netToJSForSetFieldValueFromFieldValue(netCode);
		$("#NETToJSForSetFieldValueFromFieldValue_JS")[0].value = jsCode;
	});

	var netToJSForSetFieldValueFromFieldValue = function(str){
		var result = "";
		var startTo = 0;
		var endTo = 0;
		var startFrom = 0;
		var endFrom = 0;
		var inProcessTo = false;
		var inProcessFrom = false;
		var fromSide = false;
		for (var i = 0; i < str.length; i++) {
			if (str[i] === "_"){
				if (!inProcessTo){
					startTo = i+1;
					inProcessTo = true;
				}
				else if (fromSide && !inProcessFrom){
					startFrom = i+1;
					inProcessFrom = true;
				}
			} 
			else if (str[i] === "="){
				fromSide = true;
			}
			else if (str[i] === "."){
				if (!fromSide){
					endTo = i;
				}
				else {
					endFrom = i;
					inProcessTo = false;
					inProcessFrom = false;
					fromSide = false;
					if ((startTo < endTo) && (endTo < startFrom) && (startFrom < endFrom)) {
						result = result + "_form.setValue(\"iOS_" + str.substring(startTo, endTo) + "\", _form.getValue(\"iOS_" + str.substring(startFrom, endFrom) + "\"));\r\n";
					}
					else {
						return "Something went wrong with the code conversion. Current result is: " + result;
					}
				}
			}
		}
		return result;
	};
});





