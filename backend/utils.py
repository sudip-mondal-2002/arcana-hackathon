import json
import yfinance as yf
def getCompanyDetails(ticker: str)->dict:
    """
    Returns a dictionary of company details
    """
    company = yf.Ticker(ticker)
    return company.info

def get_all_transcript_sentiments(TICKERS_LIST):
    