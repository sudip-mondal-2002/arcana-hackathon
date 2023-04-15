from flask import Flask
import yfinance as yf
from flask_cors import CORS
from transformers import pipeline
import feedparser

app = Flask(__name__)
CORS(app)
classifier = pipeline("sentiment-analysis",model="soleimanian/financial-roberta-large-sentiment")

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
    # history = company.history(period="max").to_dict("list")["Close"]

    news_url = f"https://feeds.finance.yahoo.com/rss/2.0/headline?s={ticker}&region=US&lang=en-US"
    news_feed = feedparser.parse(news_url)
    news = []
    for i in news_feed.entries:
        if "summary" in i:
            news.append(i["summary"])

    sentiment_scores = []
    for n in news:
        result = classifier(n)[0]
        sentiment_scores.append(result['score'])

    # return {
    #     "info": info,
    #     "officers": officers,
    #     "history": history
    # }

    return sentiment_scores



if __name__ == '__main__':
    app.run()
