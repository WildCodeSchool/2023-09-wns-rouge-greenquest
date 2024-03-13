# GreenQuest

## Prérequis

- Clonez le projet

```shell
git clone git@github.com:WildCodeSchool/2023-09-wns-rouge-greenquest.git GreenQuest
```

- Créez un fichier `.env` à la racine du projet et dans le backend

```shell
cp .env.sample .env
cd backend
cp .env.sample .env
```

- Remplissez les variables d'environnement

## Lancement du mode développement

```shell
docker compose -f docker-compose.dev.yml up --build
```
## Lancement des tests du backend

- Si vous êtes sur linux ou mac : cd backend ; npm test
- Si vous êtes sur windows ou wsl : cd backend ; lancer toute la commande : 
```shell
docker stop pgtesting ; docker run --rm --name pgtesting -p 5571:5432 -e POSTGRES_PASSWORD=pgpassword -d postgres && npx jest
```