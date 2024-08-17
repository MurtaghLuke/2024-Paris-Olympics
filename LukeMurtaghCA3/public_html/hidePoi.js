/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


//hide poi option on map
function hidePointsOfInterest(map)
{
    let styles = [
        {
            "featureType": "poi",
            "stylers": [{"visibility": "off"}]
        }
    ]

    let styledMapType = new google.maps.StyledMapType(styles, {name: "POI Hidden", alt: "Hide Points of Interest"})
    map.mapTypes.set("hide_poi", styledMapType)

    map.setMapTypeId("hide_poi")
}