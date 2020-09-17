const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    callback('Invalid latitude and longitude')
    return false;
  }

  const url = 'http://api.weatherstack.com/current?access_key=3f1f748c33aa52ad4bf627f16250e1d5&query=' + latitude + ',' + longitude + '}&units=m'

  request({
    url,
    json: true
  }, (error, {
    body
  } = {}) => {
    if (error) {
      callback('Unable to connect to weather service.')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out and it feels like ${body.current.feelslike}. There is a ${body.current.precip}% chance of rain.`)
    }
  })
}

module.exports = forecast