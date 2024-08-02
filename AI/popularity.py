from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

column_mapping = {
    
    "ind_ahor_fin_ult1": "Saving Account",
    "ind_aval_fin_ult1": "Guarantees",
    "ind_cco_fin_ult1": "Current Accounts",
    "ind_cder_fin_ult1": "Derivada Account",
    "ind_cno_fin_ult1": "Payroll Account",
    "ind_ctju_fin_ult1": "Junior Account",
    "ind_ctma_fin_ult1": "Más particular Account",
    "ind_ctop_fin_ult1": "particular Account",
    "ind_ctpp_fin_ult1": "particular Plus Account",
    "ind_deco_fin_ult1": "Short-term deposits",
    "ind_deme_fin_ult1": "Medium-term deposits",
    "ind_dela_fin_ult1": "Long-term deposits",
    "ind_ecue_fin_ult1": "e-account",
    "ind_fond_fin_ult1": "Funds",
    "ind_hip_fin_ult1": "Mortgage",
    "ind_plan_fin_ult1": "PensionsOne",
    "ind_pres_fin_ult1": "Loans",
    "ind_reca_fin_ult1": "Taxes",
    "ind_tjcr_fin_ult1": "Credit Card",
    "ind_valo_fin_ult1": "Securities",
    "ind_viv_fin_ult1": "Home Account",
    "ind_recibo_ult1": "Direct Debit",
    "ind_nomina_ult1": "Payroll",
    "ind_nom_pens_ult1": "PensionsTwo"
}

def popularity_based(df):
    # Renommer les colonnes du DataFrame selon le column_mapping
    print("entred")
    df = df.rename(columns=column_mapping)
    print("renamed")
    # Calculer les fréquences des services
    service_frequencies = df[list(column_mapping.values())].sum()
    print("frequencie")
    total_frequency = service_frequencies.sum()
    service_percentages = (service_frequencies / total_frequency)
    return service_percentages

@app.route('/popularity', methods=['GET'])
def calculate_frequency():
    # Déterminer le nombre total de lignes
    total_lines = sum(1 for line in open('C:/Users/Hp/Downloads/train_ver2/train_ver2.csv')) - 1
    
    # Déterminer le nombre de lignes à lire (0,5%)
    num_lines_to_read = int(total_lines * 0.005)
    print("num")
    print(num_lines_to_read)
    # Lire aléatoirement 0,5% du dataset
    df = pd.read_csv('C:/Users/Hp/Downloads/train_ver2/train_ver2.csv', sep=',', skiprows=lambda x: x > 0 and x % 200 != 0, nrows=num_lines_to_read)
    first_two_rows = df.head(2).to_dict(orient='records')
    print(first_two_rows)
    # Imprimer les colonnes du DataFrame et le nombre de colonnes
    print("Columns in DataFrame:", len(df.columns))
    print(df.columns)
    
    # Imprimer le nombre de colonnes dans le column_mapping
    print("Columns in column_mapping:", len(column_mapping))
    
    # Calculer les fréquences
    frequencies = popularity_based(df)
    
    # Retourner les fréquences et les informations de comptage en format JSON
    return jsonify({
        "frequencies": frequencies.to_dict(),
    })

if __name__ == '__main__':
    app.run(debug=True)
