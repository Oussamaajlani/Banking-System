from flask import Flask, request, jsonify
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

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

def preprocess_dataframe(df):
    df = df.fillna(0)
    numeric_df = df.select_dtypes(include='number')
    return numeric_df

def binarize_column(column):
    return (column > 0).astype(int)

def modelbased(user_id, df, model=DecisionTreeClassifier(max_depth=9)):
    mdbs = {}
    numeric_df = preprocess_dataframe(df)
    
    for c in numeric_df.columns:
        if c == 'ncodpers':
            continue
        
        y_train = numeric_df[c]
        x_train = numeric_df.drop([c], axis=1)
        
        if x_train.empty:
            continue
        
        y_train = binarize_column(y_train)
        
        model.fit(x_train, y_train)
        p_train = model.predict_proba(x_train[x_train.index == user_id])[:]
        
        # Map column names using column_mapping
        mapped_column_name = column_mapping.get(c, c)
        mdbs[mapped_column_name] = p_train[0].tolist()
        
    return mdbs

@app.route('/modelbased', methods=['POST'])
def modelbased_api():
    data = request.get_json()
    user_id = data['user_id']
    try:
        total_lines = sum(1 for line in open('C:/Users/Hp/Downloads/train_ver2/train_ver2.csv')) - 1
        num_lines_to_read = int(total_lines * 0.01)  # 1% of total lines
        print(num_lines_to_read)
        df = pd.read_csv('C:/Users/Hp/Downloads/train_ver2/train_ver2.csv', sep=',', skiprows=lambda x: x > 0 and x % 100 != 0, nrows=num_lines_to_read)
        print("File read successfully")
        
        result = modelbased(user_id, df)
        
        return jsonify(result)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
