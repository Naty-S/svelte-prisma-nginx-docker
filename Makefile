APP_VERSION = $(shell jq -r ".version" package.json)
ENV         = APP_VERSION=$(APP_VERSION)
COMPOSE     = docker compose -f docker-compose.yml
COMPOSE_DEV = docker compose -f docker-compose.dev.yml
UP_CMD      = up -d --build ${ARGS}
DOWN_CMD    = down ${ARGS}
BUILD_CMD   = build --force ${ARGS}
SH_CMD      = exec ${ARGS}


image: ## Build docker image with current version of package.json (image-dev available)
	- @echo "Bulding docker image v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) $(BUILD_CMD)

image-dev:
	- @echo "Bulding docker image v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE_DEV) $(BUILD_CMD)

run: ## Run and up project (run-dev available)
	- @echo "Running project v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) $(UP_CMD)

run-dev:
	- @echo "Running project v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE_DEV) $(UP_CMD)

sh: ## Enter inside container sh (sh-dev available)
	- $(ENV) $(COMPOSE) $(SH_CMD)

sh-dev:
	- $(ENV) $(COMPOSE_DEV) $(SH_CMD)

down: ## Down docker-compose project (down-dev available)
	- @echo "Downing project v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) $(DOWN_CMD)

down-dev:
	- @echo "Downing project v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE_DEV) $(DOWN_CMD)

restart: ## Downand Up docker-compose project (down-dev available)
	- @echo "Restarting project v$(APP_VERSION) (prod)"
	- $(COMPOSE) $(DOWN_CMD) && $(COMPOSE) $(UP_CMD)

restart-dev:
	- @echo "Restarting project v$(APP_VERSION) (dev)"
	- $(COMPOSE_DEV) $(DOWN_CMD) && $(COMPOSE_DEV) $(UP_CMD)

dbinit: ## Enter interactive shell for postgres container for seed db data. Then su - postgres, then gunzip -c ${PG_DUMP}.gz | psql ${PG_DB}
	- $(COMPOSE) $(SH_CMD) -it postgres sh

dbinit-dev:
	- $(COMPOSE_DEV) $(SH_CMD) -it postgres-dev sh

reload-nginx-conf



help: ## Show makefile helper
	- @printf '\e[1;33m%-6s\e[m' "Makefile available commands"
	- @echo ''
	- @grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	- @printf '\e[1;32m%-6s\e[m' "> Commands with -dev available use docker-compose.dev.yml as the configuration file."
	- @echo -e '\n'
	- @printf '\e[1;33m%-6s\e[m' "Passing arguments"
	- @echo -e '\nmake image-dev ARGS="--no-cache"'
	- @echo -e 'make run ARGS="-d"'
	- @echo -e '\nenvironment: \n $(ENV)'

.DEFAULT_GOAL := help
.PHONY: help
