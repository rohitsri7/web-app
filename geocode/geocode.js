const request= require('request');

var geocodeaddress=(address, callback)=>{
  var x=encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${x}&key=AIzaSyBxbC-mZalfGPLtT9t6Wzp7nCz2uAqdrEc`,
    json: true
  },(error,response,body)=>{
    if(error){
      callback('unable to connect to server');
    }else if(body.status==='ZERO_RESULTS'){
      callback('unable to find address');
    }else if(body.status==="OK"){
      callback(undefined,{
      address: body.results[0].formatted_address,
      latitude:body.results[0].geometry.location.lat,
      longitude:body.results[0].geometry.location.lng
    });
  }
});
};


module.exports.geocodeaddress= geocodeaddress;
