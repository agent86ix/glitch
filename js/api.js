var access_token = null;

function do_footer() {
	var license = '<p><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">'+
		'<img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png" />'+
		'</a><br />This <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" rel="dct:type">work</span>'+
		' is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">'+
		' Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>.</p>';
		
	var breadcrumbs = '<br><p><a id="pagefooter-mainmenu" href="/glitch/">Main Menu</a></p><br>';
	
	$("#pagefooter").html('<div style="text-align:center; font-size:12px; clear:both;">'+breadcrumbs+license+'</div>');
	
	$("#pagefooter-mainmenu").button();
	
}

$(document).ready(function() {
	do_footer();
});

function get_num(jquery_input_id)
{
	var result = parseInt($(jquery_input_id).val());
	if(!isFinite(result)) result = 0;
	return result;
}

function secondsToString(seconds)
{

	var numdays = Math.floor(seconds / 86400);
	var numhours = Math.floor((seconds % 86400) / 3600);
	var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
	var numseconds = Math.floor(((seconds % 86400) % 3600) % 60);
	var output = "";
	
	if(numdays == 1) output += numdays + " day ";
	else output += numdays + " days ";
	if(numhours == 1) output += numhours + " hour ";
	else output += numhours + " hours ";
	if(numminutes == 1) output += numminutes + " minute ";
	else output += numminutes + " minutes ";
	if(numseconds == 1) output += numseconds + " second ";
	else output += numseconds + " seconds ";
	
	return output;

}

function glitch_api_get_access_token() {
	/* Code stolen from the demo */
	var bits = window.location.href.split('#');
	var fragment = bits[1];

	if (!fragment){
		return;
	}

	// parse fragment into k=v pairs
	var obj = {};
	var pairs = fragment.split('&');
	for (var i=0; i<pairs.length; i++){
		var pair = pairs[i].split('=');
		var k = decodeURIComponent(pair[0]);
		var v = decodeURIComponent(pair[1]);
		obj[k] = v;
	}
	
	if (obj.access_token){
		return obj.access_token;
	}
	
}

function glitch_api_make_call(glitch_api_access_token, api_call, on_success, on_error) {
	$.ajax({
		type: "GET",
		url: "http://api.glitch.com/simple/"+api_call, 
		data: {oauth_token:glitch_api_access_token, simple:1, pretty:1}, 
		success: on_success,
		dataType:"json",
		error: on_error
	});

}
