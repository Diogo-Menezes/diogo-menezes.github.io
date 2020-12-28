let route = [
  [-16.3544, 33.063],
  [-16.354024, 33.062737],
  [-16.354003, 33.062655],
  [-16.353231, 33.062697],
  [-16.352619, 33.062612],
  [-16.352819, 33.062172],
  [-16.352834, 33.061828],
  [-16.352827, 33.061446],
  [-16.352659, 33.060491]
]

function addRoute() {
  map.on('load', function () {
    addUserInitialPositionMarker()

    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      }
    })
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 8
      }
    })
  })
}

function addARPoints() {
  const sceneEl = document.getElementById('scene')
  let text = document.createElement('a-text')
  text.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${lng}`)
  text.setAttribute('color', 'yellow')
  text.setAttribute('value', 'latlng')

  sceneEl.appendChild(text)
  
  text.addEventListener('loaded', () => {
    model.dispatchEvent(new CustomEvent('gps-projected-entity-place-loaded'))
  })

  route.map(([lng, lat], index) => {
    let model = document.createElement('a-link')
    // model.setAttribute('color', 'yellow')
    model.setAttribute('title', `Step ${index}`)

    model.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${lng}`)

    model.setAttribute('scale', '2 2 2')

    model.addEventListener('loaded', () => {
      model.dispatchEvent(new CustomEvent('gps-projected-entity-place-loaded'))
    })

    sceneEl.appendChild(model)
  })
}

var marker = null
var previousDate = new Date().getTime()

function addUserInitialPositionMarker() {
  marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)
}

if (marker) {
  navigator.geolocation.getCurrentPosition((position) => {

    if (previousDate - position.timestamp >= 10000) {
      window.alert(position.timestamp)
      lng = position.coords.longitude
      lat = position.coords.latitude

      previousDate = position.timestamp
      marker.setLngLat([position.coords.longitude, position.coords.latitude])
    }
  })
}
