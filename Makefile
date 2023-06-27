.PHONY: docker-build
docker-build:
	export ENV_FILE=.env
	docker-compose -f docker-compose.yaml up -d --build || exit 1

.PHONY: setup
setup:
	$(MAKE) docker-build