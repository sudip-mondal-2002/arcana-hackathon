# Arcana Hackathon
>This is submission made by Ayush Tiwari, Sudip Mondal, & Sudhan for Arcana Hacakthon.

Deployment Link: https://newbienate-musical-fortnight-5wwxqqvvq9277vp-3000.preview.app.github.dev/

Youtube Walkthrough Link: https://github.com/sudip-mondal-2002/arcana-hackathon/

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
sentiment.py:

The model goes over the json file content, removes stop words, lemmatizes the text. Tf-Idf vectorizer is run over all the keywords. Lougran McDonald master dictionary is used to categorize the words into [positive, negative, constraining, litigious,uncertainty]. The count is used for giving a score for each of the sentiment listed.


Pretrained Financial Roberta-NLP model is used for generating sentiment scores for each of the json file. The model is used in app.py file.
Both of the above model are used for analysing the sentiment of a stock at the particular quarter.

