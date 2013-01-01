var Q = require('kew')
var http = require('http')

var getAvailabilityZone = exports.getAvailabilityZone = function getAvailabilityZone() {
  var defer = Q.defer()
  var options = {
    host: '169.254.169.254',
    port: 80,
    path: '/latest/meta-data/placement/availability-zone'
  }

  http.get(options, function (res) {
    var data = ''
    res.on('data', function (chunk) {
      data += chunk
    })
    res.on('end', function () {
      defer.resolve(data)
    })
  }).on('error', function (e) {
    defer.reject(e)
  })

  return defer.promise
}

var getRegion = exports.getRegion = function getRegion() {
  return getAvailabilityZone()
    .then(function (zone) {
      return zone.replace(/([0-9][0-9]*)[a-z]*$/, "$1")
    })
}
