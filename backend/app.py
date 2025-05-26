""" 
La prédiction des calories brûlées vise à estimer l'énergie dépensée lors d'une activité physique
 à partir de caractéristiques comme le genre, l'âge, la taille, le poids,
   la durée, la fréquence cardiaque et la température corporelle.
En utilisant un modèle de régression linéaire, ce projet fulstack développe on utilisent rest api avec Flask pour fournir des prédictions 
précises et react js pour le front end .L'objectif est d'offrir un outil fiable pour les applications de fitness, avec des performances validées 
par des métriques comme le MAE et le R²
 
 """


# Importation des bibliothèques nécessaires
import pandas as pd  # Pour manipuler les données (comme des tableaux Excel)
import numpy as np  # Pour des calculs mathématiques
import warnings  # Pour gérer les messages d'avertissement
import os  # Pour travailler avec les fichiers et dossiers
warnings.filterwarnings('ignore')  # Ignore les avertissements pour garder la sortie propre
from sklearn.preprocessing import StandardScaler, OrdinalEncoder  # Pour préparer les données avant l'entraînement
from sklearn.metrics import mean_absolute_error, r2_score  # Pour évaluer la qualité du modèle
from sklearn.model_selection import train_test_split, KFold, cross_val_score  # Pour diviser les données et tester le modèle
from sklearn.pipeline import Pipeline  # Pour combiner préparation et entraînement en une seule étape
from sklearn.compose import ColumnTransformer  # Pour appliquer différentes transformations à différentes colonnes
from sklearn.linear_model import LinearRegression  # Modèle pour prédire les calories
import pickle  # Pour sauvegarder le modèle entraîné
from flask import Flask, request, jsonify  # Pour créer une API web
from flask_cors import CORS  # Pour permettre au frontend (React) de communiquer avec l'API
import math  # Pour des calculs mathématiques (peu utilisé ici)

# Initialisation de l'application Flask (serveur web pour l'API)
app = Flask(__name__)  # Crée une application Flask avec le nom du module
CORS(app)  # Active CORS pour permettre à un frontend (comme React) d'envoyer des requêtes à l'API

# Liste des caractéristiques utilisées pour prédire les calories
FEATURE_NAMES = ['Gender', 'Age', 'Height', 'Weight', 'Duration', 'Heart_Rate', 'Body_Temp']
# Ces colonnes doivent correspondre exactement aux données ; elles sont utilisées pour l'entraînement et les prédictions

# Création du dossier pour sauvegarder le modèle
MODEL_DIR = 'model'  # Nom du dossier où le modèle sera sauvegardé
if not os.path.exists(MODEL_DIR):  # Vérifie si le dossier existe
    os.makedirs(MODEL_DIR)  # Crée le dossier s'il n'existe pas

# Fonction pour charger et fusionner les données
def load_and_merge_data():
    """
    Charge deux fichiers CSV et les fusionne pour créer un dataset complet.
    Supprime la colonne User_ID car elle n'est pas utile pour la prédiction.
    """
    try:
        # Charge les fichiers CSV
        calories = pd.read_csv('data/calories.csv')  # Contient User_ID et Calories (la cible)
        exercise = pd.read_csv('data/exercise.csv')  # Contient User_ID et les caractéristiques (Gender, Age, etc.)
        
        # Fusionne les deux datasets sur User_ID (garde seulement les lignes communes)
        df = pd.merge(calories, exercise, on='User_ID', how='inner').drop('User_ID', axis=1)
        # Supprime User_ID car il n'aide pas à prédire les calories
        
        return df  # Retourne le dataset fusionné
    except Exception as e:
        print(f"Erreur dans load_and_merge_data: {e}")  # Affiche l'erreur pour débogage
        raise  # Arrête le programme si une erreur se produit

# Fonction pour entraîner et sauvegarder le modèle
def train_model():
    """
    Charge les données, entraîne un modèle de régression linéaire, évalue sa performance,
    et sauvegarde le modèle pour une utilisation future.
    """
    try:
        # Charge les données
        df = load_and_merge_data()  # Obtient le dataset fusionné
        
        # Sépare les caractéristiques (X) et la cible (y)
        X = df[FEATURE_NAMES]  # Sélectionne les colonnes définies dans FEATURE_NAMES
        y = df['Calories'].values  # Extrait les calories (cible) comme tableau
        
        # Divise les données en entraînement (80%) et validation (20%)
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        # test_size=0.2 : 20% pour la validation
        # random_state=42 : Assure que la division est toujours la même
        
        # Définit le prétraitement des données
        preprocessor = ColumnTransformer(transformers=[
            ('ordinal', OrdinalEncoder(), ['Gender']),  # Transforme Gender (male/female) en 0/1
            ('num', StandardScaler(), ['Age', 'Height', 'Weight', 'Duration', 'Heart_Rate', 'Body_Temp'])
            # Normalise les colonnes numériques (moyenne=0, écart-type=1)
        ], remainder='passthrough')  # Laisse passer les colonnes non transformées (aucune ici)
        
        # Crée une pipeline pour combiner prétraitement et modèle
        pipeline = Pipeline([
            ('preprocessor', preprocessor),  # Étape 1 : Prétraitement
            ('model', LinearRegression())   # Étape 2 : Modèle de régression linéaire
        ])
        
        # Entraîne le modèle
        pipeline.fit(X_train, y_train)  # Applique le prétraitement et entraîne le modèle
        
        # Évalue le modèle
        train_preds = pipeline.predict(X_train)  # Prédictions sur les données d'entraînement
        val_preds = pipeline.predict(X_val)     # Prédictions sur les données de validation
        train_mae = mean_absolute_error(y_train, train_preds)  # Erreur moyenne sur l'entraînement
        val_mae = mean_absolute_error(y_val, val_preds)        # Erreur moyenne sur la validation
        val_r2 = r2_score(y_val, val_preds)                    # Score R² (qualité du modèle)
        
        # Effectue une validation croisée (5-fold)
        kfold = KFold(n_splits=5, shuffle=True, random_state=42)
        # Divise les données en 5 parties pour tester la robustesse
        cv_results = cross_val_score(pipeline, X, y, cv=kfold, scoring='r2')
        # Calcule le R² pour chaque partie
        cv_r2_mean = cv_results.mean()  # Moyenne des R² pour évaluer la généralisation
        
        # Affiche les résultats
        print(f"LinearRegression:")
        print(f"Training MAE: {train_mae:.2f}")  # Erreur moyenne sur l'entraînement
        print(f"Validation MAE: {val_mae:.2f}")  # Erreur moyenne sur la validation
        print(f"Validation R²: {val_r2:.4f}")   # Proportion de la variance expliquée
        print(f"Cross-Validation R² (mean): {cv_r2_mean:.4f}")  # R² moyen de la validation croisée
        
        # Sauvegarde le modèle
        with open(os.path.join(MODEL_DIR, "pipeline.pkl"), "wb") as f:
            pickle.dump(pipeline, f)  # Sauvegarde la pipeline pour une réutilisation
        
        return pipeline  # Retourne la pipeline entraînée
    except Exception as e:
        print(f"Erreur dans train_model: {e}")  # Affiche l'erreur pour débogage
        raise  # Arrête le programme si une erreur se produit

# Charge un modèle existant ou en entraîne un nouveau
try:
    with open(os.path.join(MODEL_DIR, "pipeline.pkl"), "rb") as f:
        pipeline = pickle.load(f)  # Charge la pipeline sauvegardée
except FileNotFoundError:
    print("Training new model...")  # Indique qu'un nouveau modèle va être entraîné
    pipeline = train_model()  # Entraîne un nouveau modèle

# Endpoint API pour les prédictions
@app.route('/predict', methods=['POST'])
def predict():
    """
    Reçoit des données JSON via une requête POST, fait une prédiction,
    et renvoie le résultat en JSON.
    """
    try:
        # Récupère les données JSON envoyées par le frontend
        data = request.get_json()
        
        # Vérifie que toutes les données nécessaires sont présentes
        required_fields = ['gender', 'age', 'height', 'weight', 'duration', 'heart_rate', 'body_temp']
        if not all(field in data for field in required_fields):
            missing = [field for field in required_fields if field not in data]
            return jsonify({
                'status': 'error',
                'message': f"Champs manquants: {missing}"
            }), 400  # Retourne une erreur 400 si des champs manquent
        
        # Crée un DataFrame avec les données d'entrée dans le bon ordre
        features = pd.DataFrame([[
            data['gender'],  # male ou female
            float(data['age']),  # Convertit en float pour les calculs
            float(data['height']),
            float(data['weight']),
            float(data['duration']),
            float(data['heart_rate']),
            float(data['body_temp'])
        ]], columns=FEATURE_NAMES)  # Utilise les noms définis dans FEATURE_NAMES
        
        # Affiche les données d'entrée pour débogage
        print("Données d'entrée pour la prédiction:")
        print(features)
        
        # Fait la prédiction
        prediction = float(pipeline.predict(features)[0])  # Convertit en float standard
        
        # Retourne la prédiction en JSON
        return jsonify({
            'status': 'success',
            'prediction': round(prediction, 2)  # Arrondi à 2 décimales
        })
    except ValueError as ve:
        # Gère les erreurs de type (par exemple, age="trente" au lieu de 30)
        return jsonify({
            'status': 'error',
            'message': f"Entrée invalide: {str(ve)}"
        }), 400  # Erreur 400 pour les données mal formatées
    except Exception as e:
        # Gère les erreurs inattendues
        return jsonify({
            'status': 'error',
            'message': f"Erreur serveur: {str(e)}"
        }), 500  # Erreur 500 pour les problèmes internes

# --- ENDPOINTS STATISTIQUES POUR LE TABLEAU DE BORD ---

# Fonction pour charger les données fraîches
def get_df():
    """
    Recharge les données pour les statistiques, assurant des données à jour.
    """
    return load_and_merge_data()  # Retourne le dataset fusionné

# Fonction pour nettoyer les listes (remplace NaN/None par 0)
def clean_list(lst):
    """
    Remplace les valeurs NaN ou None par 0 pour éviter des erreurs dans les réponses JSON.
    """
    return [x if (x is not None and not (isinstance(x, float) and math.isnan(x))) else 0 for x in lst]

# Endpoint pour un résumé statistique
@app.route('/stats/summary')
def stats_summary():
    """
    Retourne des statistiques de base (moyennes, min, max) pour le tableau de bord.
    """
    df = get_df()  # Charge les données
    summary = {
        'total_records': int(len(df)),  # Nombre total de lignes
        'avg_calories': float(df['Calories'].mean()),  # Moyenne des calories
        'avg_age': float(df['Age'].mean()),  # Moyenne de l'âge
        'avg_weight': float(df['Weight'].mean()),  # Moyenne du poids
        'avg_duration': float(df['Duration'].mean()),  # Moyenne de la durée
        'avg_heart_rate': float(df['Heart_Rate'].mean()),  # Moyenne de la fréquence cardiaque
        'avg_body_temp': float(df['Body_Temp'].mean()),  # Moyenne de la température corporelle
        'min_calories': float(df['Calories'].min()),  # Minimum des calories
        'max_calories': float(df['Calories'].max()),  # Maximum des calories
        'min_age': int(df['Age'].min()),  # Âge minimum
        'max_age': int(df['Age'].max()),  # Âge maximum
        'min_weight': float(df['Weight'].min()),  # Poids minimum
        'max_weight': float(df['Weight'].max()),  # Poids maximum
        'min_duration': float(df['Duration'].min()),  # Durée minimum
        'max_duration': float(df['Duration'].max()),  # Durée maximum
    }
    return jsonify(summary)  # Retourne les statistiques en JSON

# Endpoint pour la distribution d'une colonne
@app.route('/stats/distribution/<field>')
def stats_distribution(field):
    """
    Retourne un histogramme (distribution) pour une colonne spécifiée (par exemple, Age).
    """
    df = get_df()  # Charge les données
    if field not in df.columns:  # Vérifie si la colonne existe
        return jsonify({'error': 'Colonne invalide', 'bins': [], 'counts': []}), 400
    values = df[field].dropna().values  # Extrait les valeurs non nulles
    if len(values) == 0:  # Si aucune donnée, retourne une réponse vide
        return jsonify({'field': field, 'bins': [], 'counts': []})
    counts, bin_edges = np.histogram(values, bins=20)  # Crée un histogramme avec 20 intervalles
    bins = [float(b) for b in bin_edges]  # Convertit les limites en float
    counts = [int(c) for c in counts]  # Convertit les comptes en int
    return jsonify({
        'field': field,
        'bins': bins,  # Limites des intervalles
        'counts': counts  # Nombre de valeurs dans chaque intervalle
    })

# Endpoint pour la corrélation entre deux colonnes
@app.route('/stats/correlation/<x>_vs_<y>')
def stats_correlation(x, y):
    """
    Retourne les points pour un graphique de dispersion entre deux colonnes (par exemple, Duration vs Calories).
    """
    df = get_df()  # Charge les données
    if x not in df.columns or y not in df.columns:  # Vérifie si les colonnes existent
        return jsonify({'error': 'Colonne invalide', 'points': []}), 400
    points_df = df[[x, y]].dropna()  # Extrait les données non nulles pour x et y
    n_points = len(points_df)
    if n_points > 200:  # Si trop de points, prend un échantillon de 200
        points_df = points_df.sample(n=200, random_state=42)
    points = [
        {'x': float(row[x]), 'y': float(row[y])}  # Crée une liste de points (x, y)
        for _, row in points_df.iterrows()
    ]
    return jsonify({
        'x': x,
        'y': y,
        'points': points  # Points pour le graphique de dispersion
    })

# Endpoint pour la moyenne des calories par genre
@app.route('/stats/average_by_gender')
def stats_avg_by_gender():
    """
    Calcule la moyenne des calories brûlées par genre (male/female).
    """
    df = get_df()  # Charge les données
    grouped = df.groupby('Gender')['Calories'].mean().reset_index()  # Calcule la moyenne par genre
    result = [
        {'gender': row['Gender'], 'avg_calories': float(row['Calories']) if not pd.isnull(row['Calories']) else 0}
        for _, row in grouped.iterrows()  # Convertit en liste de dictionnaires
    ]
    return jsonify(result)  # Retourne les moyennes en JSON

# Endpoint pour la moyenne des calories par groupe d'âge
@app.route('/stats/average_by_age_group')
def stats_avg_by_age_group():
    """
    Calcule la moyenne des calories brûlées par groupe d'âge (par exemple, 20-29, 30-39).
    """
    df = get_df()  # Charge les données
    bins = list(range(10, 90, 10))  # Crée des intervalles d'âge (10-19, 20-29, etc.)
    labels = [f"{b}-{b+9}" for b in bins[:-1]]  # Noms des intervalles
    df['age_group'] = pd.cut(df['Age'], bins=bins, labels=labels, right=False)  # Classe les âges en groupes
    grouped = df.groupby('age_group')['Calories'].mean().reset_index()  # Calcule la moyenne par groupe
    result = [
        {'age_group': str(row['age_group']), 'avg_calories': float(row['Calories']) if not pd.isnull(row['Calories']) else 0}
        for _, row in grouped.iterrows() if pd.notnull(row['age_group'])  # Exclut les groupes nuls
    ]
    return jsonify(result)  # Retourne les moyennes en JSON

# Endpoint pour la moyenne des calories par intervalle de durée
@app.route('/stats/average_by_duration_bin')
def stats_avg_by_duration_bin():
    """
    Calcule la moyenne des calories brûlées par intervalle de durée (par exemple, 0-4 min, 5-9 min).
    """
    df = get_df()  # Charge les données
    bins = list(range(0, 35, 5))  # Crée des intervalles de durée (0-4, 5-9, etc.)
    labels = [f"{b}-{b+4}" for b in bins[:-1]]  # Noms des intervalles
    df['duration_bin'] = pd.cut(df['Duration'], bins=bins, labels=labels, right=False)  # Classe les durées en groupes
    grouped = df.groupby('duration_bin')['Calories'].mean().reset_index()  # Calcule la moyenne par groupe
    return jsonify([
        {'duration_bin': str(row['duration_bin']), 'avg_calories': float(row['Calories'])}
        for _, row in grouped.iterrows() if pd.notnull(row['duration_bin'])  # Exclut les groupes nuls
    ])

# Endpoint pour les durées les plus fréquentes
@app.route('/stats/top_durations')
def stats_top_durations():
    """
    Retourne les 7 durées d'exercice les plus fréquentes.
    """
    df = get_df()  # Charge les données
    top = df['Duration'].value_counts().head(7).reset_index()  # Compte les durées et prend les 7 premières
    top.columns = ['duration', 'count']  # Renomme les colonnes
    return jsonify([
        {'duration': float(row['duration']), 'count': int(row['count'])}
        for _, row in top.iterrows()  # Convertit en liste de dictionnaires
    ])

# Endpoint pour les fréquences cardiaques les plus fréquentes
@app.route('/stats/top_heart_rates')
def stats_top_heart_rates():
    """
    Retourne les 7 fréquences cardiaques les plus fréquentes.
    """
    df = get_df()  # Charge les données
    top = df['Heart_Rate'].value_counts().head(7).reset_index()  # Compte les fréquences et prend les 7 premières
    top.columns = ['heart_rate', 'count']  # Renomme les colonnes
    return jsonify([
        {'heart_rate': float(row['heart_rate']), 'count': int(row['count'])}
        for _, row in top.iterrows()  # Convertit en liste de dictionnaires
    ])

# Lance l'application Flask
if __name__ == '__main__':
    """
    Démarre le serveur Flask en mode débogage sur le port 5000.
    Le mode débogage affiche des erreurs détaillées et recharge automatiquement le code si modifié.
    """
    app.run(debug=True, port=5000)  # Lance le serveur