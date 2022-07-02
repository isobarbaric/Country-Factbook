
from flask import Flask, redirect, request, url_for, render_template
from country import Country

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        return redirect(url_for('country_finder', country = request.form.get('query')))
    else:
        return render_template("base.html")

@app.route('/<country>/')
def country_finder(country):
    current_country = Country(country, None)
    if not current_country.valid_country:
        return render_template('error.html')
    else:
        return render_template('result.html', search_query = current_country)

if __name__ == "__main__":
    app.run(debug=True)

