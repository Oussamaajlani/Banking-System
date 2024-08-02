from flask import Flask, request, jsonify
from stable_baselines3 import DQN
import gym
from recommender_env import RecommenderEnv
from stable_baselines3.common import save_util
import warnings
from flask_cors import CORS
# Register the custom environment
from gym.envs.registration import register
register(
    id='CustomRecommenderEnv-v0',
    entry_point='recommender_env:RecommenderEnv',
)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
# Custom objects dictionary for deserialization
custom_objects = {
    "RecommenderEnv": RecommenderEnv,
    "lr_schedule": None,  # Add the actual lr_schedule function/class if you have it
    "exploration_schedule": None,  # Add the actual exploration_schedule function/class if you have it
}

# Load the trained DQN model with custom objects


def create_env(user_id):
    print(f"Creating environment for user_id: {user_id}")
    env = gym.make('CustomRecommenderEnv-v0', user_id=user_id)
    return env

# Load your service data column names
service_data_columns = [
    'Current Accounts', 'Derivada Account', 'Payroll Account', 'Junior Account', 
    'Más particular Account', 'particular Account', 'particular Plus Account', 
    'Short-term deposits', 'Medium-term deposits', 'Long-term deposits', 
    'e-account', 'Funds', 'Mortgage', 'PensionsOne', 'Loans', 'Taxes', 
    'Credit Card', 'Securities', 'Home Account', 'Payroll', 'PensionsTwo', 'Direct Debit'
]

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        model = DQN.load("dqn_recommender", custom_objects=custom_objects)
        print('loaded')
    except Exception as e:
        print(f"Error loading model: {e}")
    print("hhh")
    try:
        data = request.get_json()
        user_id = data['user_id']
        print(f"Received user_id: {user_id}")

        # Create environment and reset with the given user ID
        env = create_env(user_id)
        obs = env.reset()

        # Get the action from the model
        action, _states = model.predict(obs)
        action_index = int(action)
        print(f"Action predicted: {action_index}")

        # Return the recommended service
        recommended_service = service_data_columns[action_index]
        return jsonify({'recommended_service': recommended_service})

    except Exception as e:
        print(f"Error during recommendation: {e}")
        return jsonify({'error': str(e)}), 400

if '__main__' ==__name__:
    
    app.run(debug=True, host='0.0.0.0', port=5000)
