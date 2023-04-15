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
    history = company.history(period="max").to_dict("list")["Close"]

    news_url = f"https://feeds.finance.yahoo.com/rss/2.0/headline?s={ticker}&region=US&lang=en-US"
    news_feed = feedparser.parse(news_url)
    news = []
    for i in news_feed.entries:
        if "summary" in i:
            news.append([i["title"],i["summary"]])

    sentiment_score_nom = 0
    sentiment_score_denom = 0
    news_to_return = []
    positives = 0
    negatives = 0
    neutrals = 0
    for n in news:
        result = classifier(n[1])[0]
        news_to_return.append({
            "title": n[0], 
            "summary": n[1], 
            "sentiment": result["label"]
        })
        if result['label'] == 'positive':
            positives +=1
        elif result['label'] == 'negative':
            negatives +=1
        else:
            neutrals +=1
    for n in news:
        result = classifier(n[1])[0]
        if result['label'] == 'positive':
            sentiment_score_nom += result['score']*positives
            sentiment_score_denom += positives
        elif result['label'] == 'negative':
            sentiment_score_nom -= result['score']*negatives
            sentiment_score_denom += negatives
        else:
            sentiment_score_denom += neutrals
    
    sentiment_score = (sentiment_score_nom/sentiment_score_denom)
    sentiment_score = abs(sentiment_score)
    return {
        "info": info,
        "officers": officers,
        "history": history,
        "sentiment": sentiment_score,
        "news": news_to_return
    }




if __name__ == '__main__':
    app.run()
