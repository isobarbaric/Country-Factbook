
from flask import Flask, redirect, request, url_for, render_template
from country import Country

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template("base.html")

if __name__ == "__main__":
    app.run(debug=True)

