const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 


app.get("/", function (req, res) {
  res.sendFile(__dirname+"/wreport.html");   //__dirname is used for entire path of file
});



app.post("/",function(req,res){
	const query = req.body.cityName;
	const apikey = "6bf66f6737e961151d7e31dd8f5d04cb";
	const units = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units+"";


	https.get(url,function(response){
		console.log(response.statusCode);


		response.on("data",function(data){ 
	 	const weatherData = JSON.parse(data);
	 	//console.log(weatherData);         Gives You the complete fucking Data
	 	const temp = weatherData.main.temp;  //This will give you temperature
        const feels = weatherData.main.feels_like; 
        const weatherDesc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";

        res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius,</h1>");
        res.write("<h3>The weather is currently "+weatherDesc+"</h3>");
        res.write("<h3>And it feels like "+feels+" degree celcius</h3>");
        res.write("<img src="+imageURL+">");

        res.send();
	 })

	})


})


app.listen(process.env.PORT || 3000,function(){
	console.log("Server is running on port 3000");

}) 