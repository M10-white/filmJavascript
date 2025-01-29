# 🎬 Recherche de Films avec l'API OMDB

## 📌 Description
Ce projet est une application web permettant de rechercher des films en utilisant l'API OMDB. Il affiche :
- Une **section de films populaires** sous forme de **carrousel scrollable** avec des flèches.
- Une **barre de recherche** pour trouver des films spécifiques.
- Une **section de films aléatoires** avec un **scroll infini** qui charge de nouveaux films dynamiquement.
- Un **loader** qui apparaît lorsqu'on charge de nouveaux films.

## 🚀 Fonctionnalités
✅ Recherche dynamique de films via l'API OMDB.  
✅ Carrousel horizontal avec défilement fluide et flèches (`◀` et `▶`).  
✅ Affichage des **films populaires** (Batman, Inception, etc.).  
✅ Affichage d'une **liste de films aléatoires**.  
✅ **Scroll infini** pour charger automatiquement plus de films en bas de page.  
✅ **Loader animé** pour indiquer le chargement des films.  

---

## 📦 Installation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/M10-white/filmJavascript.git
cd filmJavascript
```

### 2️⃣ Remplacer la clé API
Obtiens une clé gratuite sur [OMDB API](https://www.omdbapi.com/) et remplace `TA_CLE_API` dans `script.js` :
```js
const API_KEY = "TA_CLE_API";
```

### 3️⃣ Ouvrir le fichier `index.html`
Lance simplement `index.html` dans ton navigateur ! 🎥

---

## 📜 Structure du projet
📁 **/projet-film/**
- `index.html` → Structure HTML de l'application.
- `style.css` → Styles et mise en page.
- `script.js` → Logique JavaScript pour gérer l'API, le carrousel et le scroll infini.

---

## 🎨 Technologies utilisées
- **HTML5** → Structure de la page
- **CSS3** → Styles et animations
- **JavaScript (ES6)** → API OMDB, DOM, événements, scroll infini
- **OMDB API** → Recherche et affichage des films

---

## 📷 Aperçu

### BIENTÔT

---

## ✨ Améliorations possibles
- 🎭 Ajout des genres et notes IMDb des films.
- 🎞️ Affichage des bandes-annonces en cliquant sur un film.
- 🔥 Ajout d'une **base de données** pour enregistrer les films favoris.

---
