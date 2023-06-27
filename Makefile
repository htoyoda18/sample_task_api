.PHONY: docker-build
docker-build:
	source .env.develop && docker-compose -f docker-compose.yaml up -d --build || exit 1

.PHONY: docker-build-test
docker-build-test:
	source .env.test && docker-compose -f docker-compose.yaml up -d --build || exit 1

.PHONY: setup
setup:
	$(MAKE) docker-build

.PHONY: setup-test
setup-test:
	$(MAKE) docker-build-test

.PHONY: down
down:
	source .env.develop && docker-compose down -v || exit 1

.PHONY: down-test
down-test:
	source .env.test && docker-compose down -v || exit 1

.PHONY: log-api
log-api:
	docker logs -f task-api || exit 1

.PHONY: log-api-test
log-api-test:
	docker logs -f task-api-test || exit 1

.PHONY: restart
restart:
	$(MAKE) down
	$(MAKE) docker-build

.PHONY: restart-test
restart-test:
	$(MAKE) down-test
	$(MAKE) docker-build-test

.PHONY: ps
ps:
	docker-compose ps