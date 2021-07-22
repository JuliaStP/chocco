function init() {
    const myMap = new ymaps.Map('map', {
      center: [55.749410, 37.601060],
      zoom: 14,
      controls: []
        });
    
        myCollection = new ymaps.GeoObjectCollection({}, {
          draggable: false,
          iconLayout: 'default#image',
          iconImageHref: './img/icons/marker.svg',
          iconImageSize: [46, 57],
          iconImageOffset: [-35, -52]
        });
    
        myPoints = [
            { coords: [55.749798, 37.605695], text: 'CHOCCO First store' },
            { coords: [55.758729, 37.583145], text: 'CHOCCO Second store' },
            { coords: [55.742804, 37.580576], text: 'CHOCCO Third store' },
            { coords: [55.757064, 37.622157], text: 'CHOCCO Forth store'} 
        ];
  
    for (let i = 0, l = myPoints.length; i < l; i++) {
        let point = myPoints[i];
        myCollection.add(new ymaps.Placemark(
            point.coords, {
                balloonContentBody: point.text
            }
        ));
    }
  
    myMap.geoObjects.add(myCollection);
  
    const mySearchControl = new ymaps.control.SearchControl({
        options: {
            provider: new CustomSearchProvider(myPoints),
            noPlacemark: true,
            resultsPerPage: 4
        }});
    }
  
  function CustomSearchProvider(points) {
    this.points = points;
  }
  
  
  CustomSearchProvider.prototype.geocode = function (request, options) {
    const deferred = new ymaps.vow.defer(),
        geoObjects = new ymaps.GeoObjectCollection(),
        offset = options.skip || 0,
        limit = options.results || 4;
        
    const points = [];
    for (let i = 0, l = this.points.length; i < l; i++) {
        let point = this.points[i];
        if (point.text.toLowerCase().indexOf(request.toLowerCase()) != -1) {
            points.push(point);
        }
    }
    points = points.splice(offset, limit);
    for (let i = 0, l = points.length; i < l; i++) {
        let point = points[i],
            coords = point.coords,
                    text = point.text;
  
        geoObjects.add(new ymaps.Placemark(coords, {
            name: text + ' name',
            description: text + ' description',
            balloonContentBody: '<p>' + text + '</p>',
            boundedBy: [coords, coords]
        }));
    }
  
    deferred.resolve({
        geoObjects: geoObjects,
        metaData: {
            geocoder: {
                request: request,
                found: geoObjects.getLength(),
                results: limit,
                skip: offset
            }
        }
    });
  
    return deferred.promise();
  };
  
  ymaps.ready(init);