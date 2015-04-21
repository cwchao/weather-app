var wind;
var clickWind = 1;
var clickForecast = 1;
var cond;
var forecast;
var defaultImage;
var zipcode = 95014;

function process() {
    var input = document.getElementById("zip");
    zipcode = input.value;
    var script = document.createElement('script');
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+zipcode+", United States') &format=json &callback=callbackFunction";
    document.getElementsByTagName('head')[0].appendChild(script);
}

$(document).ready(function(){
    $("#forecast_button").click(function(){
    	if ($(this).text() == "forecast"){ 
     		$(this).text("today"); 
  		} else { 
     		$(this).text("forecast"); 
     	}
    	$("this").text("forecast");
        $("#main").toggle("slow");
        $(".forecast").toggle("slow");
    });
});

$(document).ready(function(){
	$("#enter_button").click(function(){
		$("#main").show("slow");
		$(".forecast").hide("slow");
		if ($("#forecast_button").text() == "today") {
			$("#forecast_button").text("forecast"); 
		}
	});
});

function assignImages(forecast) {
	var state = forecast;
	for (var i = 0; i < 5; i++) {
		console.log(state[i].code);
	    if ((state[i].code == 3)  || (state[i].code <= 4) || (state[i].code == 45) || (state[i].code == 47) || ((state[i].code >= 37) && (state[i].code <= 39))) {
	    	document.getElementById("weather_img_" + i).src = "stormy.png";
	    	defaultImage = "stormy.png";
	    }
	    else if ((state[i].code >= 31) && (state[i].code <= 34)) {
	    	document.getElementById("weather_img_" + i).src = "sun.jpg";
	    	defaultImage = "sun.jpg";
		}
		else if (((state[i].code >= 27) && (state[i].code <= 30)) || (state[i].code == 44)) {
			document.getElementById("weather_img_" + i).src = "partly_cloudy.png";
			defaultImage = "partly_cloudy.png";
		}
		else if (((state[i].code >= 9) && (state[i].code <= 12)) || (state[i].code == 40)) {
			document.getElementById("weather_img_" + i).src = "rain.ico";
			defaultImage = "rain.ico";
		}
		else if ((state[i].code >= 26) && (state[i].code <= 30)) {
			document.getElementById("weather_img_" + i).src = "cloudy.png";
			defaultImage = "cloudy.png";
		}
		else if (((state[i].code >= 41) && (state[i].code <= 43)) || ((state[i].code >= 13) && (state[i].code <= 16)) || (state[i].code ==46) || (state[i].code == 7)) {
			document.getElementById("weather_img_" + i).src = "snowy.ico";
			defaultImage = "snowy.ico";
		}
	}
}

function forecastFunction() {
	assignImages(forecast);
	document.getElementById("condition_0").innerHTML = forecast[0].day.toLowerCase() + ": " + forecast[0].text.toLowerCase();
	document.getElementById("temp_0").innerHTML = forecast[0].high + " &nbsp; " + forecast[0].low;
	// document.getElementById("weather_img_0").src = defaultImage;
    document.getElementById("condition_1").innerHTML = forecast[1].day.toLowerCase() + ": " + forecast[1].text.toLowerCase();
    document.getElementById("temp_1").innerHTML = forecast[1].high + " &nbsp; " + forecast[1].low;
    // document.getElementById("weather_img_1").src = defaultImage;
    document.getElementById("condition_2").innerHTML = forecast[2].day.toLowerCase() + ": " + forecast[2].text.toLowerCase();
    document.getElementById("temp_2").innerHTML = forecast[2].high + " &nbsp; " + forecast[2].low;
    // document.getElementById("weather_img_2").src = defaultImage;
	document.getElementById("condition_3").innerHTML = forecast[3].day.toLowerCase() + ": " + forecast[3].text.toLowerCase();
	document.getElementById("temp_3").innerHTML = forecast[3].high + " &nbsp; " + forecast[3].low;
	// document.getElementById("weather_img_3").src = defaultImage;
	document.getElementById("condition_4").innerHTML = forecast[4].day.toLowerCase() + ": " + forecast[4].text.toLowerCase();
	document.getElementById("temp_4").innerHTML = forecast[4].high + " &nbsp; " + forecast[4].low;
	// document.getElementById("weather_img_4").src = defaultImage;
	clickForecast = 0;
}
function displayWind() {
	if (clickWind != 0) {
		document.getElementById("weather_img").src = "wind.png";
		document.getElementById("wind").innerHTML = "wind speed: " + wind.speed + " mph";
		clickWind = 0;
	}
	else {
		document.getElementById("weather_img").src = defaultImage;
		document.getElementById("wind").innerHTML = "";
		clickWind = 1;
	}
}

var callbackFunction = function(data) {
	forecast = data.query.results.channel.item.forecast;
    cond = data.query.results.channel.item.condition;
    wind = data.query.results.channel.wind;
    area = data.query.results.channel.location;

    if (area.region != "") {
    	 document.getElementById("location").innerHTML = area.city + ", " + area.region;
    }
    else {
    	 document.getElementById("location").innerHTML = area.city + ", " + area.country;
    }
   
    var temp = cond.temp;
    document.getElementById("condition").innerHTML = "today: " + cond.text;
    document.getElementById("temp").innerHTML = temp + "° F";

    if ((cond.code == 1) || (cond.code == 3)  || (cond.code == 4) || (cond.code == 45) || ((cond.code >= 37) && (cond.code <= 39))) {
    	document.getElementById("weather_img").src = "stormy.png";
    	defaultImage = "stormy.png";
    }
    else if ((cond.code >= 31) && (cond.code <= 34)) {
    	document.getElementById("weather_img").src = "sun.jpg";
    	defaultImage = "sun.jpg";
	}
	else if (((cond.code >= 27) && (cond.code <= 30)) || (cond.code == 44)) {
		document.getElementById("weather_img").src = "partly_cloudy.png";
		defaultImage = "partly_cloudy.png";
	}
	else if (((cond.code >= 8) && (cond.code <= 12)) || (cond.code == 40)) {
		document.getElementById("weather_img").src = "rain.ico";
		defaultImage = "rain.ico";
	}
	else if ((cond.code >= 26) && (cond.code <= 30)) {
		document.getElementById("weather_img").src = "cloudy.png";
		defaultImage = "cloudy.png";
	}
	else if (((cond.code >= 41) && (cond.code <= 43)) || ((cond.code >= 13) && (cond.code <= 16)) || (cond.code ==46) || (cond.code == 7)) {
		document.getElementById("weather_img").src = "snowy.ico";
		defaultImage = "snowy.png";
	}




}