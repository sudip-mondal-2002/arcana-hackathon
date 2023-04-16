import yfinance as yf
from sentiment import *
import pickle
from config import *

transcript_sent_dict = {}
with open(TICKER_SENTIMENT_DICT_PATH, 'rb') as input:
    transcript_sent_dict = pickle.load(input)
print(transcript_sent_dict)

def getCompanyDetails(ticker: str)->dict:
    """
    Returns a dictionary of company details
    """
    company = yf.Ticker(ticker)
    return company.info

def get_transcript_sent(ticker):
    print(ticker)
    if ticker not in transcript_sent_dict:
        return get_sent_from_ticker(ticker)
    return transcript_sent_dict[ticker]