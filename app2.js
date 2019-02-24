const yargs= require('yargs');
const axios=require('axios');

const argv= yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'address to fetch weather for',
    string: true
  }
})
.help()
.alias('help','h')
.argv;

  var x=encodeURIComponent(argv.address);
  var geocodeURL= `https://maps.googleapis.com/maps/api/geocode/json?address=${x}&key=AIzaSyBxbC-mZalfGPLtT9t6Wzp7nCz2uAqdrEc`;

  axios.get(geocodeURL).then((response)=>{

    if(response.data.status==="ZERO_RESULTS"){
      throw new Error("unable to find location");
    }

    var lat=response.data.results[0].geometry.location.lat;
    var lng=response.data.results[0].geometry.location.lat;
    var weatherURL= `https://api.darksky.net/forecast/083347cf90cfbbc6dff298f696ec5dad/${lat},${lng}`;


    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
  }).then((response)=>{
    var temperature= response.data.currently.apparentTemperature;
    var apparentTemperature= response.data.currently.apparentTemperature;
    console.log(`the temperature is ${temperature} but feels like ${apparentTemperature}`);
  }).catch((e)=>{
    if(e.code==='ENOTFOUND'){
      console.log("unable to connect to server");
  }
  else{
    console.log(e.message);
  }
});
