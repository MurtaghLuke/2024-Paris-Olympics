/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

//reference: view-source:https://derek.comp.dkit.ie/google_maps/examples/route_planner_text_input.html
//combined loadMap() with loadMap() in map.js
//reference: view-source:https://derek.comp.dkit.ie/google_maps/examples/google_maps_drag_marker.html


function calculateRoute(travelMode = "DRIVING")
{
    document.getElementById("transport-mode").innerHTML = travelMode
    let start = document.getElementById("start").value
    let end = document.getElementById("end").value

    let request = {origin: start,
        destination: end,
        travelMode: travelMode
    }
    directionsService = new google.maps.DirectionsService()
    directionsService.route(request, (route, status) =>
    {
        if (status === google.maps.DirectionsStatus.OK)
        {
            directionsRenderer.setDirections(route)
        }
    })
}