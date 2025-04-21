# CI/CD avec Docker et GitHub Actions – Déploiement automatique d'une application Node.js

Ce projet démontre la mise en place d’un pipeline CI/CD complet et robuste, destiné au déploiement automatisé d'une application backend conteneurisée.

Il inclut :
- Build d’image Docker
- Tests unitaires automatisés
- Push de l’image sur Docker Hub
- Déploiement automatique sur un serveur distant (VPS)
- Rollback automatique en cas d’échec de déploiement


## Objectifs du projet

- Mettre en place un pipeline CI/CD automatisé
- Déployer une application conteneurisée sans intervention manuelle
- Garantir la stabilité grâce à un système de rollback
- Montrer une maîtrise concrète des outils DevOps modernes

## Structure du projet

ci-cd-docker-app/
├── app/
│   ├── index.js
│   ├── package.json
│   └── tests/
│       └── app.test.js
├── Dockerfile
├── .dockerignore
├── .github/
│   └── workflows/
│       └── ci-cd.yml
└── README.md

## Fonctionnement du pipeline CI/CD

A chaque push sur la branche main, GitHub Actions :

1. Récupère le code
2. Installe les dépendances Node.js
3. Lance les tests unitaires
4. Construit une image Docker avec deux tags :
   - latest
   - sha-<commit_id>
5. Envoie l’image sur Docker Hub
6. Se connecte au VPS distant via SSH
7. Déploie la nouvelle version de l’application
8. Si le déploiement échoue, rollback vers la version précédente

## Lancer l'application en local

Build et exécution de l'app :

docker build -t ci-cd-app .
docker run -p 3000:3000 ci-cd-app

Accès : http://localhost:3000

## Lancer les tests

cd app
npm install
npm test

## Secrets GitHub requis

A configurer dans Paramètres > Secrets and Variables > Actions :

| Nom du secret        | Description                                      |
|----------------------|--------------------------------------------------|
| DOCKERHUB_USERNAME   | Nom d’utilisateur Docker Hub                     |
| DOCKERHUB_TOKEN      | Token Docker Hub (pas le mot de passe)           |
| VPS_HOST             | Adresse IP publique de votre VPS                 |
| VPS_USER             | Utilisateur SSH (ex: ubuntu ou root)             |
| VPS_SSH_KEY          | Clé privée SSH (format OpenSSH, sans passphrase) |

## Préparation du VPS 

1. Choisir un VPS (Hetzner, OVH, DigitalOcean, etc.)
2. Installer Docker sur le serveur :

sudo apt update && sudo apt install -y docker.io

3. Ouvrir le port 80 si nécessaire :

sudo ufw allow 80

4. Ajouter la clé publique SSH dans ~/.ssh/authorized_keys

## Rollback automatique 

Si l’image déployée échoue au lancement :

- Le pipeline stoppe le container en erreur
- Restaure et relance automatiquement le container précédent
- Résultat : aucun downtime, la version précédente reste active


