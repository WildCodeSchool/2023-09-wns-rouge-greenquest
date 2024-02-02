# GreenQuest

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
