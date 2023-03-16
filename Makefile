# APP_VERSION = $(shell jq -r ".version" package.json)
ENV         = APP_VERSION=$(APP_VERSION)
COMPOSE     = docker compose -f docker-compose.yml
COMPOSE_DEV = docker compose -f docker-compose.dev.yml
UP_CMD      = up -d --build ${ARGS}
DOWN_CMD    = down ${ARGS}
BUILD_CMD   = build --force ${ARGS}
SH_CMD      = exec $1 sh ${ARGS}

default_text = "\033[0m"
yellow_text = "\e[1;33m%-6s\e[m"
green_text  = "\e[1;32m%-6s\e[m"
blue_text   = "\033[36m%-20s\033[0m %s\n"


update: ## Updates de project from Git and restart (update-dev available)
	- @echo "Updating project - v$(APP_VERSION) (prod)"
	- $(ENV) git checkout production && git pull && make restart

update-dev:
	- @echo "Updating project - v$(APP_VERSION) (dev)"
	- $(ENV) git checkout develop && git pull && make restart-dev


build: ## Build docker image with current version of package.json (build-dev available)
	- @echo "Bulding docker image - v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) $(BUILD_CMD)

build-dev:
	- @echo "Bulding docker image - v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE_DEV) $(BUILD_CMD)


up: ## Run and up project (up-dev available)
	- @echo "Running project - v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) $(UP_CMD)

up-dev:
	- @echo "Running project - v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE_DEV) $(UP_CMD)


down: ## Down docker-compose project (down-dev available)
	- @echo "Downing project - v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) $(DOWN_CMD)

down-dev:
	- @echo "Downing project - v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE_DEV) $(DOWN_CMD)


restart: ## Down and Up docker-compose project (restart-dev available)
	- @echo "Restarting project - v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) $(DOWN_CMD) && $(COMPOSE) $(UP_CMD)

restart-dev:
	- @echo "Restarting project - v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE_DEV) $(DOWN_CMD) && $(COMPOSE_DEV) $(UP_CMD)


sh: ## Enter inside container shell (sh-dev available). Usage: make sh <container name>\
   	Enter interactive shell for postgres container for seed db data.\
		Then su - postgres, then gunzip -c ${PG_DUMP}.gz | psql ${PG_DB}
	- @echo "Entering container $1 shell - v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) $(SH_CMD)

sh-dev:
	- @echo "Entering container $1 shell - v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE_DEV) $(SH_CMD)


exec:
	- $(ENV) $(COMPOSE) exec $1 $(ARGS)

exec-dev:
	- $(ENV) $(COMPOSE_DEV) exec $1 $(ARGS)


reload: ## Stop, build and start single container (reload-dev available). Usage: make reload <container name>
	- @echo "Reloading container $1 - v$(APP_VERSION) (prod)"
	- $(ENV) $(COMPOSE) stop $1 && $(COMPOSE) build $1 && $(COMPOSE) start $1

reload-dev:
	- @echo "Reloading container $1 - v$(APP_VERSION) (dev)"
	- $(ENV) $(COMPOSE) stop $1 && $(COMPOSE) build $1 && $(COMPOSE) start $1


help: ## Show makefile helper
	- @printf ${yellow_text} "Makefile available commands"
	- @echo ''
	- @grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf ${blue_text}, $$1, $$2}'
	- @printf ${green_text} "> Commands with -dev available use docker-compose.dev.yml as the configuration file."
	- @echo -e '\n'
	- @printf ${yellow_text} "Passing arguments"
	- @echo -e '\nmake image-dev ARGS="--no-cache"'
	- @echo -e 'make run ARGS="-d"'
	- @echo -e '\nenvironment: \n $(ENV)'


.DEFAULT_GOAL := help
.PHONY: help
