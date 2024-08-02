from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import PCA

app = Flask(__name__)

# Load the dataset (modify the path as needed)
total_lines = sum(1 for line in open('C:/Users/Hp/Downloads/train_ver2/train_ver2.csv')) - 1
num_lines_to_read = int(total_lines * 0.001)  # Reduce the size further to avoid memory issues
df = pd.read_csv('C:/Users/Hp/Downloads/train_ver2/train_ver2.csv', sep=',', skiprows=lambda x: x > 0 and x % 100 != 0, nrows=num_lines_to_read)

# Fill missing values and convert categorical data to numeric
df.fillna(0, inplace=True)
df = pd.get_dummies(df)

# Apply PCA for dimensionality reduction
pca = PCA(n_components=50)
df_reduced = pca.fit_transform(df)

# Compute similarity matrix using cosine similarity on the reduced dataset
sim_matrix = cosine_similarity(df_reduced)

def calculate_recommendations(user_id, df, sim_matrix):
    try:
        cos_id = list(df.index).index(user_id)
    except ValueError:
        return {"error": "User ID not found in dataset"}

    k = 0
    sim_min = 0.79
    user_sim_k = []

    while k < 20:
        for user in range(len(df)):
            if sim_min < sim_matrix[cos_id, user] < 0.99:
                user_sim_k.append((user, sim_matrix[cos_id, user]))
                print(user)
                k += 1

        sim_min -= 0.025
        if sim_min < 0.65:
            break

    user_sim_k.sort(key=lambda x: x[1], reverse=True)
    user_id_k = [user_id for user_id, similarity in user_sim_k]
    df_user_k = df.iloc[user_id_k]
    df_user_k_T = df_user_k.T
    df_user_k_T.columns = user_id_k

    usit = {}
    for row_name, row in df_user_k_T.iterrows():
        ownership = []
        for indx, own in row.items():
            ownership.append(own)

        mean_ownership = np.mean(ownership)
        usit[row_name] = 0 if np.isnan(mean_ownership) else mean_ownership

    sorted_usit = {k: v for k, v in sorted(usit.items(), key=lambda item: item[1], reverse=True)}
    return sorted_usit

@app.route('/recommendations', methods=['POST'])
def recommendations():

    data = request.get_json()
    user_id = data.get('user_id', type=int)
    if user_id is None:
        return jsonify({"error": "user_id is required"}), 400

    try:
        result = calculate_recommendations(user_id, df, sim_matrix)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
