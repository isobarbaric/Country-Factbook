
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
    let response = await fetch('https://restcountries.com/v3.1/name/' + userInput)
    let jsonified = await response.json()

    // response checking not working
    // console.log(response.status);

    if (response.status == 404 || response.status == 500) {
        return "Invalid"
    }
    return jsonified
}

function init() {
    let textBox = document.getElementById('text-box');    
    textBox.addEventListener('input', function() {

        // prevents empty string from being pushed to the api
        if (textBox.value.length == 0) {
            return 
        }

        let json_response = userAction(textBox.value);

        Promise.allSettled([json_response]).then(function(countries) {
            if (json_response == "Invalid") {
                return
            }
        
            let clonedCountries = Object.assign([], countries[0]['value']);

            // sorting doesn't show up properly on Chrome for some reason (works on Safari)
            clonedCountries.sort((a, b) => parseInt(a['population']) < parseInt(b['population']));
            console.log(clonedCountries);

            let tbody = document.getElementById('tbody');

            // delete existing rows
            while (tbody.hasChildNodes()) {
              tbody.removeChild(tbody.lastChild);
            }

            // add new rows
            for (let i = 0; i < clonedCountries.length; i++) {
                let tr = "<tr>";
                tr += "<td>" + clonedCountries[i]['name']['official'] + "</td>" + "<td>$" + clonedCountries[i]['cca3'] + "</td></tr>";
                tbody.innerHTML += tr;
            }

        });
    });
}

document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
        init();
    }
});

