import pandas as pd
from pymongo import MongoClient

# Connexion à MongoDB
client = MongoClient('mongodb://mongodb:27017/')
db = client['testt']
collection = db['bank']

# Lire les données par morceaux et insérer dans MongoDB
mylist = []

for chunk in pd.read_csv('C:/Users/Hp/Downloads/train_ver2/train_ver2.csv', sep=';', chunksize=20000):
    mylist.append(chunk)
    print("20000 lines added")

big_data = pd.concat(mylist, axis=0)
del mylist
print("inserting 1")
# Convert DataFrame to list of dictionaries
data = big_data.to_dict(orient='records')
print("inserting 2")
# Insert the list of dictionaries into MongoDB
collection.insert_many(data)

print("Toutes les lignes ont été insérées avec succès dans MongoDB")
