const request= require('request');

var getWeather=(lat,lng,callback)=>{

  request({
    url: `https://api.darksky.net/forecast/083347cf90cfbbc6dff298f696ec5dad/${lat},${lng}`,
    json: true
  },(error,response,body)=>{
    if(error){
      callback("unable to fetch weather");
    }else if(response.statusCode===200){
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
      });
    }
  });
}

module.exports.getWeather= getWeather;
