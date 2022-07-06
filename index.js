
class Country {

  constructor(api_response) {
      this.official_name_eng = api_response['name']['official']
      this.official_name_spa = api_response['translations']['spa']['official']
      this.official_name_fre = api_response['translations']['fra']['official']
      this.abbr = api_response['cca3']
      this.currencies = api_response['currencies']

      if ('capital' in api_response)
          this.capital = api_response['capital'][0]

      this.continents = api_response['continents']
      this.region = api_response['subregion']
      this.area = api_response['area']

      if ('borders' in api_response)
          this.borders = api_response['borders']
          
      this.flag = api_response['flags']['png']
      this.flag_icon = api_response['flag']
  
      if ('png' in api_response['coatOfArms'])
          this.coat_of_arms = api_response['coatOfArms']['png']

      this.timezones = api_response['timezones']
      this.population = api_response['population']
  }

}

// have to deal with 404, 500 errors
const userAction = async (userInput) => {
    let response = null;

    try {
        response = await fetch('https://restcountries.com/v3.1/name/' + userInput)
    } catch(error) {
        return "Invalid";
    }

    let jsonified = await response.json()

    // response checking not working
    // console.log(response.status);

    return jsonified
}

const getCountryData = async (countryAbbr) => {
    let response = null;

    try {
        response = await fetch('https://restcountries.com/v3.1/alpha/' + countryAbbr)
    } catch(error) {
        return "Invalid";
    }

    let jsonified = await response.json()

    // response checking not working
    // console.log(response.status);

    return jsonified
}

function init() {
    let textBox = document.getElementById('text-box');    
    textBox.addEventListener('input', function() {
        // clear contents of right div
        let rightDiv = document.getElementById('not-footer');
        rightDiv.innerHTML = "<h3 id='placeholder'> Enter a country to get started!</h3>";

        // prevents empty string from being pushed to the api
        if (textBox.value.length == 0) {
            let table = document.getElementById('search-results');
            table.innerHTML = "";
            return 
        }

        let json_response = userAction(textBox.value);

        Promise.allSettled([json_response]).then(function(countries) {
        
            // cloning the list of relevant countries and sorting them by population
            let clonedCountries = Object.assign([], countries[0]['value']);
            clonedCountries.sort((a, b) => parseInt(b['population']) - parseInt(a['population']));

            // delete existing rows
            let table = document.getElementById('search-results');
            table.innerHTML = '';

            try {
                // add new rows
                for (let i = 0; i < clonedCountries.length; i++) {
                    id_name = clonedCountries[i]['cca3']

                    let tr = "<tbody class='country' id='" + id_name + "'>";
                    tr += "<tr onclick='serveContent(" + id_name + ")'><td rowspan='2'><img src='" + clonedCountries[i]['flags']['png'] + "' alt='flag' class='flag-left'></td><td class='center'><b>" + clonedCountries[i]['cca3'] + "</b></td></tr><tr onclick='serveContent(" + id_name + ")'><td class='center'>" + clonedCountries[i]['name']['official'] + "</td></tr>"
                    tr += '</tbody>';
                  
                    table.innerHTML += tr;
                }
            } catch(error) {
                table.innerHTML = "<h3 id='not-found'> No Countries Found! </h3>";
            }

        });
    });
}

function serveContent(country_name) {
    country_abbr = country_name.id;
    let json_response = getCountryData(country_abbr);

    Promise.allSettled([json_response]).then(function(countries) {
        let clonedCountry = Object.assign([], countries[0]['value'])[0];
        
        let rightDiv = document.getElementById('not-footer');
        
        //  flag
        rightDiv.innerHTML = "<img src=" + clonedCountry['flags']['png'] + " alt='" + clonedCountry['name']['common']  + "' id='flag-right'>";
      
        // name 
        rightDiv.innerHTML += "<b>Name: </b> " + clonedCountry['name']['official'];
        
        // 

    });
}

function clearContent() {
}

// function singleWordify(name) {
//     const words = name.split(' ');
//     if (words.length == 1) {
//         return words[0];
//     }
//     let simplified = '';
//     for (let i = 0; i < words.length; i++) {
//         simplified += words[i];
//         if (i != words.length-1) {
//             simplified += '_';
//         }
//     }
//     return simplified;
// }

// function complexify(name) {
//     const words = name.split('_');
//     if (words.length == 1) {
//         return words[0];
//     }
//     let simplified = '';
//     for (let i = 0; i < words.length; i++) {
//         simplified += words[i];
//         if (i != words.length-1) {
//             simplified += ' ';
//         }
//     }
//     return simplified;
// }

document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
        init();
    }
});

