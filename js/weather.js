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
    var temperature = ""

    var weatherDescription

    weather.then(beans => beans.timeSeries.forEach(element => {
        let tempArr = element.validTime.split('T')
        var date = tempArr[0]
        var time = tempArr[1]

        var hour = time.substr(0, 2)
        if (date === dateString)
        {
            if (hour === nextHour)
            {
                element.parameters.forEach(parameter => {
                    //temperaturen
                    if (parameter.name === "t")
                    {
                        temperature = parameter.values[0].toString()
                        temperature = temperature.replace(".", ",")
                        weatherDescription = "Väder för nästa timme: " + temperature + "\xB0C. "
                    }
                    //symbol för vädret, används för att hämta t.ex. "Lätt molnighet" från array i symbols.js
                    if (parameter.name === "Wsymb2")
                    {
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