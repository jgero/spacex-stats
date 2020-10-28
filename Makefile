.PHONY: dev build_dev run_dev clean clean_dev

dev: build_dev run_dev

clean: clean_dev

build_dev:
	podman build -t spacex-stats:dev -f ./container/dev.Dockerfile .

run_dev:
	podman run --tty --name=spacex-stats-devcontainer -v ./src/:/app/src/ -v ./static/:/app/static/ -v ./rollup.config.js:/app/rollup.config.js -p 3000:3000 spacex-stats:dev

clean_dev:
	podman rm --ignore spacex-stats-devcontainer