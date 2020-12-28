var lat = 33.063034
var lng = -16.354469

navigator.geolocation.getCurrentPosition(function success(position) {
  // lat = position.coords.latitude
  // lng = position.coords.longitude
  // let sceneEl = document.querySelector('a-scene')

  // Calculate new lat and lng method
  // new_latitude = latitude + (dy / r_earth) * (180 / pi)
  // new_longitude = longitude + ((dx / r_earth) * (180 / pi)) / cos((latitude * pi) / 180)

  var newLat = lat + (-0.0009 / 111) * (180 / 3.14159265)
  var newLng = lng + ((-0.0009 / 111) * (180 / 3.14159265)) / Math.cos((lat * 3.14159265) / 180)

  // let markerEl = document.createElement('a-link')

  // markerEl.setAttribute('color', 'red')

  // markerEl.setAttribute('title', 'Ponto 1')
  // markerEl.setAttribute('scale', '3 3 3')

  // markerEl.addEventListener('loaded', () => {
  //   window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
  // })

  // markerEl.setAttribute('gps-projected-entity-place', `latitude: ${newLat};longitude: ${newLng}`)

  // sceneEl.appendChild(markerEl)

  let instructionsEl = document.getElementById('info')
  instructionsEl.innerHTML = `lat: ${newLat.toFixed(4)}; lng:${newLng.toFixed(4)}`
})
