# Arcana Hackathon
>This is submission made by Ayush Tiwari, Sudip Mondal, & Sudhan for Arcana Hacakthon.

Deployment Link: https://newbienate-musical-fortnight-5wwxqqvvq9277vp-3000.preview.app.github.dev/

Youtube Walkthrough Link: https://youtu.be/k5Jrz-wv4Ew

### Folder Structure
```
├── .devcontainer         
├── frontend              [react app]
│   ├── public        
│   ├── src               [Error Classes to throw custom errors(optional)]
│   │   ├── components    [React Components]
│   │   ├── data           
│   │   ├── hooks         [Custom hooks]
│   │   ├── App.tsc
│   │   ├── index.tsx
├── package.json
├── backend               [flask app, with deployed models]
├── src
│   ├── dataset           [contains transcripts]
│   ├── app.py            [falsk endpoints & news sentiment analysis]
│   ├── config.py           
│   ├── requirements.txt    
│   ├── run_sent.py          
│   ├── sentiment.py      [code for sentiment analysis for transcripts]
│   ├── utils.py          
```
NLP Methods used:
1. Analyzing sentiment of quaterly Transcripts: The model goes over the json file content, removes stop words, and lemmatizes the text. After preprocessing, Tf-Idf vectorizer is run over all keywords. Lougran McDonald master dictionary is used to categorize the words into `[positive, negative, constraining, litigious, uncertainty]` with a count associated with each lable for a particular quaterly transcript. This count may be used in variety for ways, the dashboard utilizes the positive and negative sentiments to come up with net sentiment and use min-max scaling to fit with same scale as of stock prices. The smooth line is predicted sentiment based on transcripts. The trends seen in image below signifies some positive correlation between transcript sentiment and stock prices.
![image](https://user-images.githubusercontent.com/74752127/232289009-bf37e0ec-a493-41ee-acb4-681781b37630.png)

2. Sentiment alanysis on market news: Using Yahoo Finance API, we get latest news observed for a particualar ticker. Tokenizing and using Financial Roberta-NLP model the app generates real-time sentiment scores. Aggregating scores and taking weighted average using polynomial function between 0-1 like x^3 or x^5, gives net sentiment of concerned stock which is presented as progress bar in image below. Green shows positive news, red for negative news and yellow for uncertain/neutral.
![image](https://user-images.githubusercontent.com/74752127/232289277-95f7ebc5-2763-4c92-8534-8aae5cce09f5.png)

