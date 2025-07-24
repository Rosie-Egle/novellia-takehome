DOCKER_COMPOSE_DEV=docker compose -p takehome-senior-swe-technical-test-dev -f ./docker-compose.development.yaml
DOCKER_COMPOSE_TEST=docker compose -p takehome-senior-swe-technical-test-dev -f ./docker-compose.test.yaml 

db-start:
	$(DOCKER_COMPOSE_DEV) up -d

db-generate-migrations:
	./node_modules/.bin/drizzle-kit generate:pg

db-migrate:
	npm run db:migrate

db-stop:
	$(DOCKER_COMPOSE_DEV) down

test-infra-start:
	$(DOCKER_COMPOSE_TEST) up -d --wait
	npm run db:migrate:test

test-infra-stop:
	$(DOCKER_COMPOSE_TEST) down

test: 
	$(MAKE) test-infra-start
	npm run test
	$(MAKE) test-infra-stop

test-watch: 
	$(MAKE) test-infra-start
	npm run test:watch
	$(MAKE) test-infra-stop

init:
	docker volume create takehome-pgdata
	docker volume create takehome-test-pgdata
	docker-compose -f docker-compose.development.yaml up -d db
	npm install
	npm run db:migrate

start: 
	$(MAKE) db-start || true
	npm run dev

sql:
	docker exec -it takehome-db psql postgres://takehome:takehome@localhost:5432/takehome