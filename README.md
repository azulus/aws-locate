aws-locate
==========

Locate the region and/or availability zone for a node process running on EC2

```javascript

// to get the availability zone:
require('aws-locate').getAvailabilityZone(function (err, zone) {
  console.log(zone)
})

// to get the region
require ('aws-locate').getRegion(function (err, region) {
  console.log(region)
})

```