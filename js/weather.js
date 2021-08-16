/*
1-2 JavaScript filer för väderhanteringen. 

Väderdata skall hämtas ifrån SMHI’s API:
På en sida skall den aktuella temperaturen för Djupviks hamn (platsen ligga på latitud: 57.3081 och longitud: 18.1489) redovisas.
Generell dokumentation:  http://opendata.smhi.se/apidocs/metfcst/index.html (Länkar till en externa sida.)
Exempel adress för att hämta väder-prognos för en specifik plats:
 https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json (Länkar till en externa sida.)
Exempelvis kan det stå (redovisa temperatur för närmaste timme du har data för):
I Djupvikshamn är det under nästkommande timme 24 grader varmt.

Men du har fria händer vad gäller utseende och text, bara temperaturen går att utläsa för användaren. OBS! siffran 24 i exemplet ovan behöver naturligtvis bytas ut dynamiskt mot aktuell temperatur hämtad ifrån SMHI.

Koden skall finnas i .js filer, ifall du delar upp koden i flera filer skall detta ske med hjälp av moduler (import / export). Alltså skall endast en .js script-tag skall finnas i html k
*/

import { getSymbolDescriptionSE } from "./symbols.js"

let url = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json"

function getWeather()
{
    return fetch(url).then(response => response.json())
}

function ShowWeather()
{
    var d = new Date()
    var nextHour = ((d.getHours() + 1) % 23).toString()

    var month = (d.getMonth() + 1).toString()
    if (month.length == 1)
        month = "0" + month
    
    var day = d.getDate().toString()
    if (nextHour == 0)
        day += 1
    
    day %= 31
    if (day.length == 1)
        day = "0" + day
    
    var dateString = `${d.getFullYear()}-${month}-${day}`
    console.log(dateString)
    var weather = getWeather()
    var temperature = "";
    var description = "";

    var weatherDescription

    weather.then(beans => beans.timeSeries.forEach(element => {
        let tempArr = element.validTime.split('T')
        var date = tempArr[0]
        var time = tempArr[1]

        var hour = time.substr(0, 2)
        if (date === dateString)
        {
            // console.log(nextHour)
            // console.log(hour)
            if (hour === nextHour)
            {
                element.parameters.forEach(parameter => {
                    console.log(parameter)
                    if (parameter.name === "t")
                    {
                        
                        temperature = parameter.values[0].toString()
                        temperature = temperature.replace(".", ",")
                        weatherDescription = "Väder för nästa timme: " + temperature + "\xB0C. "
                        //var p = document.createElement("p")
                        //p.appendChild(document.createTextNode(temperature + " grader, "))
                        //document.getElementById("weather").appendChild(p)
                    }
                        
                    if (parameter.name === "Wsymb2")
                    {
                        //description = 
                        weatherDescription += getSymbolDescriptionSE(parameter.values[0])
                        var p = document.createElement("p")
                        p.appendChild(document.createTextNode(weatherDescription))
                        document.getElementById("weather").appendChild(p)
                    }
                })
            }
        }
        
    }))
}

ShowWeather()