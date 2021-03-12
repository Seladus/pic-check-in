
# PIC check in

Un système de check-in adapté à des projets en petites équipes pour garder une trace des temps de travail de chaque membre.

## Installation

Tout d'abord il faut installer `sqlite3` et `nodejs` :

```bash
apt-get install sqlite3
apt-get install nodejs npm
```

Ensuite il faut installer les dépendances du projet :

```bash
npm install
```

Pour lancer le serveur :

```bash
npm start
```

## Référence de l'API

Pour effectuer des requêtes à l'API il faut passer par la route `/api`. La réponse obtenue dépendra des paramètres de la requêtes.
Toute requête à l'API doit fournir un paramètre `type` dont la valeur indique le type de requête :

* `sessions_info` : permet d'obtenir toutes les sessions de tous les utilisateurs.
  * `timestamp [optional]` : timestamp Unix auquel toutes les informations seront antérieures.
* `user_sessions_info` : permet d'obtenir les sessions d'un utilisateur en particulier.
  * `name` : nom de l'utilisateur.
  * `timestamp [optinal]` : timestamp Unix auquel toutes les informations seront antérieures.
* `user_info` : permet d'obtenir les informations relatives à un utilisateur.
* `users_info` : permet d'obtenir les informations relatives à tous les utilisateurs.

### Exemple de requête

* Sélection de toutes les sessions utilisateurs :
  * `http://url.du.serveur/api?type=sessions_info`
* Sélection de toutes les sessions d'un utilisateur antérieures à un timestamp :
  * `http://url.du.serveur/api?type=user_sessions_info&name=Username&timestamp=X`
