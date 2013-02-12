var Q = require('kew')
var http = require('http')

var getAvailabilityZone = exports.getAvailabilityZone = function getAvailabilityZone(callback, callbackScope) {
  var defer = Q.defer()
  var options = {
    host: '169.254.169.254',
    port: 80,
    path: '/latest/meta-data/placement/availability-zone'
  }

  var req = http.get(options, function (res) {
    var data = ''
    res.on('data', function (chunk) {
      data += chunk
    })
    res.on('end', function () {
      defer.resolve(data)
    })
  }).on('error', function (e) {
    defer.reject(e)
  }).on('socket', function (socket) {
    socket.setTimeout(2000);
    socket.on('timeout', function() {
        req.abort();
    });
  })

  var promise = defer.promise

  if (callback) {
    promise = promise
      .then(callback.bind(callbackScope, null))
      .fail(callback.bind(callbackScope))
  }

  return promise
}

var getRegion = exports.getRegion = function getRegion(callback, callbackScope) {
  var promise = getAvailabilityZone()
    .then(function (zone) {
      return zone.replace(/([0-9][0-9]*)[a-z]*$/, "$1")
    })

  if (callback) {
    promise = promise
      .then(callback.bind(callbackScope, null))
      .fail(callback.bind(callbackScope))
  }

  return promise
}
