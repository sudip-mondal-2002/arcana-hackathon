import yfinance as yf
from config import *
from sentiment import *
import pickle

def getCompanyDetails(ticker: str)->dict:
    """
    Returns a dictionary of company details
    """
    company = yf.Ticker(ticker)
    return company.info

# DO NOT RUN: It dumps all parsed data sentiments to an object & saves as file
def save_all_transcript_sentiments():
    """
        Saves all scrapped trsncript sentiments to a file
    """
    result = {}
    for ticker in TICKERS_LIST:
        result[ticker] = get_sent_from_ticker(ticker)
        print("Done results for ", ticker, result[ticker], end='\n*************************')
        
    with open(TICKER_SENTIMENT_DICT_PATH, 'wb') as output:
        pickle.dump(result, output, pickle.HIGHEST_PROTOCOL)

save_all_transcript_sentiments()