
// Set the date we're counting down to
var countDownDate = new Date().getTime();
var dictionary_of_spoilers = {};
var spoiler_title = "";
var distance;
// Update the count down every 1 second
var x = setInterval(function() {
	// Get todays date and time
	var now = new Date().getTime();
	// Find the distance between now an the count down date
	distance = Math.floor((now - countDownDate)/1000);
	// Time calculations for days, hours, minutes and seconds
	var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
	var minutes = Math.floor((distance % (60 * 60)) / 60);
	var seconds = Math.floor((distance % 60));
	// Display the result in the element with id="time"
	document.getElementById("time").innerHTML = hours + "h "
		+ minutes + "m " + seconds + "s ";
}, 1000);
document.getElementById("spoiler").addEventListener("keydown", function(e) {
	if (e.keyCode === 13) {
		sendData(e);
	}
});
function sendData(e) {
	var spoiler =
		document.getElementById("spoiler").value.trim();
	if (spoiler === "") return false;

	console.log(distance + ":" + spoiler);
	if (dictionary_of_spoilers[distance] ==
		undefined) {
		dictionary_of_spoilers[distance]
			= spoiler; 
	}
	else {
		dictionary_of_spoilers[distance]
			+= "\n<br />" + spoiler; 
	}
	document.getElementById("spoiler").value =
		"";
	// Rewrite what messages have been sent with time.
		var new_messages = ""
	for (var key in dictionary_of_spoilers) {
		var hours = Math.floor((key %
			(60 * 60 * 24)) / (60 *
				60));
		var minutes = Math.floor((key
			% (60 * 60)) / 60);
		var seconds = Math.floor((key
			% 60));
		new_messages += hours + ":" +
			minutes + ":" + seconds + " | " +
			dictionary_of_spoilers[key] + "<br />";
	}
	document.getElementById("messages").innerHTML
		= new_messages;
	document.getElementById("spoiler").focus();
	document.getElementById("spoiler").select();
	return false;
}
function setTitle(e) {
    spoiler_title = document.getElementById("title").value.trim();
    document.getElementById("set_title").innerHTML = spoiler_title;
}
function submitSpoilers(e) {
    var full_log = {title : spoiler_title, spoiler : dictionary_of_spoilers}
    console.log(full_log);
    console.log(full_log.spoiler);
    var req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/createlog');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(full_log));
    var ret = req.responseJSON;
    console.log("ret" + ret)
}
