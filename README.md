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

## 1er lancement : Créer le bon user dans le container postgres

```shell
docker exec -it greenquest_postgres_1 psql -U postgres
```

```sql
CREATE USER username WITH PASSWORD 'password';
ALTER USER user WITH SUPERUSER;
```
