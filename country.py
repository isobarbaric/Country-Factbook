
import requests
import json

class Country:

    country_repo = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json'
    name_search = "https://restcountries.com/v3.1/name/"

    def __init__(self, name, API_data=None):
        self.name = name
        self.valid_country = True
     
        api_response = None

        if name != "N/A":
            api_response = json.loads(requests.get(Country.name_search + self.name).text)
            
            if 'message' in api_response:
                self.valid_country = False
                return 
            
            # sorting by population for relevancy
            api_response = sorted(api_response, key=lambda d: int(d['population']), reverse=True) 

            api_response = api_response[0]
        else:
            api_response = API_data

        self.official_name_eng = api_response['name']['official']
        self.official_name_spa = api_response['translations']['spa']['official']
        self.official_name_fre = api_response['translations']['fra']['official']
        self.abbr = api_response['cca3']
        self.currencies = api_response['currencies']

        if 'capital' in api_response:
            self.capital = api_response['capital'][0]

        self.continents = api_response['continents']
        self.region = api_response['subregion']
        self.area = api_response['area']

        if 'borders' in api_response:
            self.borders = api_response['borders']
            
        self.flag = api_response['flags']['png']
        self.flag_icon = api_response['flag']
    
        if 'png' in api_response['coatOfArms']:
            self.coat_of_arms = api_response['coatOfArms']['png']

        self.timezones = api_response['timezones']
        self.population = api_response['population']

    def __repr__(self):
        return "Country - name: " + self.official_name_eng

# print(Country.getCountryByName('China'))
