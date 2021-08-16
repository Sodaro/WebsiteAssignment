var symbolsEN = ["Clear sky",
"Nearly clear sky",
"Variable cloudiness",
"Halfclear sky",
"Cloudy sky",
"Overcast",
"Fog",
"Light rain showers",
"Moderate rain showers",
"Heavy rain showers",
"Thunderstorm",
"Light sleet showers",
"Moderate sleet showers",
"Heavy sleet showers",
"Light snow showers",
"Moderate snow showers",
"Heavy snow showers",
"Light rain",
"Moderate rain",
"Heavy rain",
"Thunder",
"Light sleet",
"Moderate sleet",
"Heavy sleet",
"Light snowfall",
"Moderate snowfall",
"Heavy snowfall"]

var symbolsSE = ["Klart",
"Lätt molnighet",
"Halvklart",
"Molnigt",
"Mycket moln",
"Mulet",
"Dimma",
"Lätt regnskur",
"Regnskur",
"Kraftig regnskur",
"Åskskur",
"Lätt by av regn och snö",
"By av regn och snö",
"Kraftig by av regn och snö",
"Lätt snöby",
"Snöby",
"Kraftig snöby",
"Lätt regn",
"Regn",
"Kraftigt regn",
"Åska",
"Lätt snöblandat regn",
"Snöblandat regn",
"Kraftigt snöblandat regn",
"Lätt snöfall",
"Snöfall",
"Ymnigt snöfall"]


export function getSymbolDescriptionSE(value)
{
    return symbolsSE[value-1]
}