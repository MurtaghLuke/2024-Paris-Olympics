//reference: https://derek.comp.dkit.ie/google_maps/examples/marker_fetch_content.html for reading json object from json file

let map = null

function loadMap()
{
    // These constants must start at 0
    // These constants must match the data layout in the 'locations' array below
    const CONTENT = 0,
            LATITUDE = 1,
            LONGITUDE = 2

//    let locations = [
//        ["Stade de France", 48.9245, 2.3601],
//        ["Olympic Aquatics Centre", 48.9237, 2.3554],
//        ["Marie Paradis gymnasium", 48.9382, 2.4197], //rock climbing
//        ["Accor Arena", 48.8389, 2.3785], //Basketball, gymnastics
//        ["Champ de Mars", 48.8559, 2.2984], //judo, wrestling
//        ["Grand Palais", 48.8672, 2.3175], //fencing, taekwondo
//        ["Parc des Princes", 48.8415, 2.2534], //football
//        ["Roland Garros Stadium", 48.8470, 2.2504], //tennis, boxing
//        ["Pont Alexandre III", 48.8640, 2.3136], //triathlon, cycling
//        ["Porte de la Chappelle Arena", 48.8993, 2.3609], //Badminton, gymnastics
//        ["Place de la Concorde", 48.8657, 2.3212]           //3x3 Basketball    Breaking    Cycling BMX Freestyle   Skateboarding
//
//    ]
    
    
    
    let locations = []


    // Read a JSON object from a JSON file
    fetch("./json/venues.json")
            .then(response => response.json())
            .then(jsonMapData =>
            {
                jsonMapData.forEach(item =>
                {
                    // advanced custom content
                    locations.push([
                        `<div id=lm_customContentContainer>
                                 <img class=lm_venueImage src=${item.image_url}>
                                 <div id=lm_text>
                                    <h3>${item.name}</h3>
                                    <p>${item.sports}</p>
                                </div>
                            </div>`,
                        parseFloat(item.latitude),
                        parseFloat(item.longitude)
                    ])
                })

                let services_centre_location = {lat: 48.8566, lng: 2.3522}  // paris
                
                /* Add auto complete to the place names */
                new google.maps.places.Autocomplete(start)
                new google.maps.places.Autocomplete(end)
                
                

                map = new google.maps.Map(document.getElementById("map"), {
                    mapId: "MY_MAP_ID",
                    zoom: 12,
                    center: new google.maps.LatLng(services_centre_location),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControlOptions: {
                        mapTypeIds: ["roadmap", "satellite", "hide_poi"]
                    }
                })
                
                //got {draggable: true} from    view-source:https://derek.comp.dkit.ie/google_maps/examples/google_maps_drag_marker.html     line 58.
                //allows user to drag the route
                directionsRenderer = new google.maps.DirectionsRenderer({draggable: true})
                directionsRenderer.setMap(map)
                directionsRenderer.setPanel(document.getElementById("directions"))
                
                // listen for the "directions_changed" event
                directionsRenderer.addListener("directions_changed", () =>
                {
                    const directions = directionsRenderer.getDirections()
                    const geocoder = new google.maps.Geocoder()

                    // update start address
                    let start = directions.geocoded_waypoints[0].place_id
                    geocoder.geocode({placeId: start}, (results, status) =>
                    {
                        document.getElementById("start").value = results[0].formatted_address
                    })

                    // update end address
                    let end = directions.geocoded_waypoints[1].place_id
                    geocoder.geocode({placeId: end}, (results, status) =>
                    {
                        document.getElementById("end").value = results[0].formatted_address
                    })
                })
                calculateRoute("DRIVING")
                
                
                let infoWindow = null;

                //call hide poi function
                hidePointsOfInterest(map);



                // Add markers for locations
                // used chatGPT for syntax here. Blue pointers were not showing up along with the hotels
                //for custom content, i used code from https://derek.comp.dkit.ie/google_maps/examples/marker_custom_content.html
                locations.forEach(location => {
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(location[1], location[2]),
                        map: map,
                        title: location[0],
                        icon: {
                            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAmCAYAAADTGStiAAAHeklEQVR42t2YeVBUVxrFzahBwQVE1u6GbhYVlU1BFGVXKRgQUYOyBicKRBE0GFTAjdhuCYIGAjORJUiI4jAGamqcWDIRxw0GREplk6aBhm666WYJqCDLme81MVUZSM3UVKX/yKu61a8f3Pd753znu+/CtGm/1WOL6/p3fn3Kkb2anFUOuzyWLM/z45rc8vfYePlXY+lv2jLDytbWdMsy64ILvMWoNDRBiz4XMj0udhsYIrPo+o5fnJyVfmG6j4+f1X9cNpyjrrFk/rtqFsz9f/YTYcP0aQ72nI3WNn7RFlZX84zN0cUywyDbDN1sEwgNzfDcgIfHC9lYvtbxwS+C405finD18JRv8vU5p6O9MKCgoKD8cXV1c03Nk46qikedf7uc0xSmpVtmt0C72J3NuxFnyH6QbsARFLG4ww8J0G5oig4Cy9gTQ8QyQYMBDT1jJC9aJvNOTeFNCU7M+CrKLyBo1MbSCpWVlWCO8fFxjI2NYXR0FENjoxgbHUNt/BFcWaCDvFlzUKqph7s6bFTTzRvJXhHLFFIOo9gMErYpBPT9qT4PxRzT0a3BIZFTgi9cLTUPjohRrFq5EvK+Prw9xt+Ch4YwMDgAxfAQGmtq8Y2jE4o0NHFbl40KAj8j1UJSLSGb36puJXA9XS+nekds8Pw2+/5dtUngfmB6ZPzxF7a2K/DV1u14+WUuRiQSJXyU4MNv3uDVq5fo6e1FZ5cMz2ufotR9A0pmzsU9Aj+hm78g1R0Ek3EmwB2kmrlWq2+MeKsVr6OOJZlMXeczn5etdXZFlBEXEl0jtNGQxB7ESH+/Es6o/oHOpd0yCARCNEqk+PuadSibr4d/0c3rSF0bwbrYE3ApwVsIXG/ARRaFb2dQ6OYpwUnpOSe9/QPgYsyDgGMOMYWlRcsAdaSou/gGhsnywZcvoejpQbtIjPr6RjQ1NqN8nRvuaxuilsACspuZJ+OYKmvN1J2p/11dDvYFBv1jSvC5ops2QRH7sNR8ESppopSevJ3F2MVDrTYbovRMDA0Po48yIOmSoumFAA00BM/qUOHuhUo1TTRSktsJLGX9GDKa30zn9eRe2GpHpnIzp4Tvij82vNhmBf7MWwQF2dVJCpjQNBC8muxUULAGX72CTC5Ha5sIdaS6mWyXjIyiLuYgnpIyoY4RxEy6f0x4GykWULr5HBOEn0oOnxIcm5zy0M7JGbsXLcEITWJsa6OebGJCQje9r8PBD2IJ+gYG0NEpUapubGpGa2sruvr7IK6rh+jUOXTar4PUwgZyrgU6GDCV65amPrwDA7+bEvzR6bRYT28/sG1sMEITmKAwdRLQ+XMaVdS3D5faQFZXB1lfL1qErahvaKLPNnoQMbq65eh+PQz5yAi6nzyBgrIhS8tAW8hOiBYYwsd8sYDsnj4J/PFnma6btofA1s0NJfpG6OdMqBaS6kZla3BJNRvf85ZATLXtkHYrQ8bY3S7qVNZeKpNTKRSQ9/ZAQQ+n6FEoSyNpbsaZ9z/oTTh71noS+MQX+dygiJihNS4u+JjFxWtlW0yobqZaP6XkVtLi/z2F7dvZmqj94+UJu5tblDUXi8WQ0sN0y3sgJyAzFL0T5yJy5LuyMoSGhByYBE7OvqoVeejEc0sKWJTFcgywJ/qRSaeQsZt68jGpvkcpvaXNwjcz1PEXD0+UnT0PIdVeTH3eRepk3QRVKH6C95DybvpeVV0DXx+fi2T3z9/RzIXY5E/THNY6wc/EHH2sCcXMUthGipuY1qKEPiJwGVleoqWLfFo6M2ar42sjI1QeT0b7owpaZAhIrddDq93wG/rs60FVVRWys3Pg77f5XuHXhXMnqT54PiPG09d/fB3HGJ1sc2VbyAjeScqFypXIBI8ppf+ktrlJC8e1edrIInDWLA1cV5uL25q6qORZoNHVEzVZXyI0PHzMzc11IDgoqGN/7P6q03z+viv5+e9OAh/PvOKyLeQPA/Y8WjwIOEA23yFQAb0QMkn5RWMzpBoYI0dLD+WU1LJ5OihUn4ecmWoo1piPHAKf1GcjzsERdrYrboYGByeWlpa6/NcdxaWSu4bh0XHiVUstUcTiwW/pMuzw+f3wR9HRLceOJBQnHz2acjIxMT8yOFjkRS+VIFpi9+gaIlBXD67m5tjk7oG4A/sfHObzrfOvX9P4n7cyTJ33JJ1+ttreAfY2tviEz4+ma7Om+t1HFRWs8xnp7x1KTj6b8Eky/0+Xs72bmhoW/t/7qIOfZf7VfaMX/Ddvri6/c2e2yrak/NzrR/wCQuHj5VWTl5urqTIwWaseFhMPFyfnoQ8jo9gq3YjHnDg3uNphDSJ273ZUKTjuVMopZ9cN2Ltn7z6Vgg/wU309fbZgZ1h4uUrBh1OyLLeG7hrfsH79iErBiZfy9MKi40SOjo4oKS1ZpjLwmcIbc/Ym8cttrFfi8KH4BFW21Dv0p83FNWudsf29ANXWOeHz3A99t+0Yd7Cze0EP8juVgbNKbi8O/GCPwmq5pbzoWiFPZWD70OgZTk4ujTtC3u9PSbvopVK7U1PTHJOOHt125/atmb+J/438G61Ny+R5ttvtAAAAAElFTkSuQmCC"
                        }
                    });

                    if (infoWindow === null)
                    {
                        infoWindow = new google.maps.InfoWindow();
                    }

                    google.maps.event.addListener(marker, "click", () =>
                    {
                        infoWindow.setContent(location[CONTENT])
                        infoWindow.open(map, marker)
                    })
                });



                let service = new google.maps.places.PlacesService(map)

                //hotel markers on map
                service.nearbySearch({
                    location: services_centre_location, // centre of the search
                    radius: 5000, // radius (in metres) of the search
                    type: "lodging"
                }, getNearbyHotelServicesMarkers)
                
                //taxi rank markers on map
                service.nearbySearch({
                    location: services_centre_location, // centre of the search
                    radius: 5000, // radius (in metres) of the search
                    type: "taxi_stand"
                }, getNearbyTaxiServicesMarkers)
                

            })
   
}


