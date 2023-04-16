from flask import Flask
import yfinance as yf
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/company/<ticker>')
def getCompanyDetails(ticker: str)->dict:
    """
    Returns a dictionary of company details and historical close prices
    """
    company = yf.Ticker(ticker)
    info = {
        "name": company.info["longName"],
        "country": company.info["country"],
        "sector": company.info["sector"],
        "summary": company.info["longBusinessSummary"]
    }
    officers = {}
    for i in company.info["companyOfficers"]:
        officers[i["title"]] = i["name"]
    history = company.history(period="max").to_dict("list")["Close"]

    return {
        "info": info,
        "officers": officers,
        "history": history
    }


if __name__ == '__main__':
    app.run()
