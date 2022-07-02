
import requests
import json

class Country:

    country_repo = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-abbreviation.json'
    name_search = "https://restcountries.com/v3.1/name/"
    # countries = []

    # @staticmethod
    # def loadCountries():
    #     retrieved_info = str(requests.get(Country.country_repo).text)
    #     country_data = json.loads(retrieved_info)
    #     for country_obj in country_data:
    #         current = Country(country_obj['country'], country_obj['abbreviation'])
    #         Country.countries.append(current)

    def __init__(self, name):
        self.name = name
        self.valid_country = True

        api_response = json.loads(requests.get(Country.name_search + self.name).text)
        
        if 'message' in api_response:
            self.valid_country = False
            return 

        self.official_name_eng = api_response['name']['official']
        self.official_name_spa = api_response['translations']['spa']['official']
        self.official_name_fre = api_response['translations']['fra']['official']
        self.cca3 = api_response['cca3']
        self.currencies = api_response['currencies']
        self.capital = api_response['capital'][0]
        self.continents = api_response['continents']
        self.region = api_response['region']
        self.subregion = api_response['subregion']
        self.area = api_response['area']
        self.borders = api_response['borders']
        self.flag = api_response['flags']['png']
        self.coat_of_arms = api_response['coatOfArms']['png']
        self.timezones = api_response['timezones']
        self.population = api_response['population']

    def __repr__(self):
        return "Country - name: " + self.name + ", abbr: " + self.abbr
