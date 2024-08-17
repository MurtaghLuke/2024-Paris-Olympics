/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let infoWindow = null
function getNearbyTaxiServicesMarkers(results, status)
{
    if (status === google.maps.places.PlacesServiceStatus.OK)
    {
        results.forEach(result =>
        {
            createTaxiMarker(result)
        })
    }
}



function createTaxiMarker(place)
{
    let icon = document.createElement("img")
    icon.src = "http://maps.gstatic.com/mapfiles/ms2/micons/cabs.png"
    icon.style.width = "20px"
    icon.style.height = "20px"

    let marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: place.geometry.location,
        content: icon
    });

    if (infoWindow === null)
    {
        infoWindow = new google.maps.InfoWindow()
    }

    google.maps.event.addListener(marker, "click", () =>
    {
        infoWindow.setContent(place.name)
        infoWindow.open(map, marker)
    })
}
