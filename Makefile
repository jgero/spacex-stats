.PHONY: dev build_dev run_dev clean clean_dev

dev: build_dev run_dev

clean: clean_dev

build_dev:
	docker build -t spacex-stats:dev -f ./container/dev.Dockerfile .

run_dev:
	docker run --rm --tty -v $(PWD)/src/:/app/src/ -v $(PWD)/static/:/app/static/ -v $(PWD)/rollup.config.js:/app/rollup.config.js -p 3000:3000 -p 10000:10000 spacex-stats:dev

clean_dev:
	docker rm --ignore spacex-stats-devcontainer
