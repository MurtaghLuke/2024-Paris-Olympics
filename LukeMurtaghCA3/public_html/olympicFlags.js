/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */



window.addEventListener('load', listCountries)            
function listCountries()
{
    fetch("json/countries.json")
        .then(response => response.json())
        .then(countries =>
        {
            let htmlString = ``;

            countries.forEach(country =>
            {
                htmlString += `<label><input type=radio name=countriesList class=countryListItem value=${country.alpha2Code} onclick='showFlag("${country.alpha2Code}","${country.name}")'>${country.name}</label><br>`
            })
            document.getElementById("lm_countriesList").innerHTML = htmlString
        });
}


function showFlag(alpha2Code, countryName)
{
    document.getElementById("lm_flagContainer").style.display = "block"
    document.getElementById("lm_countryName").innerHTML = countryName
    document.getElementById("lm_flag").src = `https://flagsapi.com/${alpha2Code}/shiny/64.png`   // from https://flagsapi.com/
}
