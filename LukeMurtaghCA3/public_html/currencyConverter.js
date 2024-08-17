/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

//reference: view-source:https://derek.comp.dkit.ie/api/example_code/currency_converter.html



window.addEventListener('load', generateCurrenciesList)
let currentCurrency = ''

function generateCurrenciesList()
{
    const url = `https://api.frankfurter.app/currencies`
    fetch(url)
            .then(response => response.json())
            .then(jsonData => {
//                const currencies = Object.keys(jsonData).filter(key => key !== 'EUR')
//                let htmlString = `<ul id="selectedCurrencyList">`
//                currencies.forEach(currency => htmlString += `<li><input type='radio' name='selectedCurrency' value="${currency}" onchange="setCurrency('${currency}','${jsonData[currency]}')"/>&nbsp;${jsonData[currency]}</li>`)
//                htmlString += `</ul>`
//                document.getElementById('currenciesListContainer').innerHTML = htmlString

//Used chatgpt to edit the above code to make sure only usd and gbp are used as options from the api
                
                const usdDescription = jsonData['USD']
                const gbpDescription = jsonData['GBP']
                let htmlString = `<ul id="selectedCurrencyList">`
                htmlString += `<li><input type='radio' name='selectedCurrency' value="USD" onchange="setCurrency('USD','${usdDescription}')"/>&nbsp;${usdDescription}</li>`
                htmlString += `<li><input type='radio' name='selectedCurrency' value="GBP" onchange="setCurrency('GBP','${gbpDescription}')"/>&nbsp;${gbpDescription}</li>`
                htmlString += `</ul>`
                document.getElementById('lm_currenciesListContainer').innerHTML = htmlString
            })
}

function convertIntoEuro()
{
    const fromCurrencyAmount = encodeURI(document.getElementById('lm_currencyToConvertFromAmount').value)
    const from = currentCurrency
    const url = `https://api.frankfurter.app/latest?amount=${fromCurrencyAmount}&from=${from}&to=EUR`

    fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                document.getElementById('lm_euroContainer').style.display = 'block'
                document.getElementById('euro').value = jsonData.rates.EUR
            })
}

function setCurrency(currency, currencyDescription)
{
    currentCurrency = currency
    document.getElementById('lm_currencyToConvertFromAmount').value = ''

    document.getElementById('lm_euroContainer').style.display = 'none'
    document.getElementById('lm_convertToEuroContainer').style.display = 'block'

    document.getElementById('lm_selectedCurrencyDescription').innerHTML = currencyDescription + " "
    document.getElementById("lm_currencyToConvertFromAmount").focus()
}
