import yfinance as yf
def getCompanyDetails(ticker: str)->dict:
    """
    Returns a dictionary of company details
    """
    company = yf.Ticker(ticker)
    return company.info

def run_sentiment_analysis(ticker: str)->dict:
    """
    Returns a map of of sentiment scores
    """
    