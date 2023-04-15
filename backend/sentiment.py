import sys
from bs4 import BeautifulSoup
from datetime import datetime
import requests
import pandas as pd
import numpy as np
import re
from pathlib import Path
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
import gensim
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from pandas_datareader import data as pdr
from datetime import timedelta