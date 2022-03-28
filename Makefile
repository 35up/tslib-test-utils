.DEFAULT_GOAL := build

.PHONY: github-pkg
github-pkg:
	@if cat ~/.npmrc | grep -q '^//npm\.pkg\.github\.com/:_authToken'; then \
		exit 0; \
	fi; \
	echo '==============================================================='; \
	echo 'Cannot download private packages from the Github package'; \
	echo 'repository. Please go to https://github.com/settings/tokens and'; \
	echo 'generate a personal access token with permissions to read'; \
	echo 'packages. After you generate the token, please type or paste it'; \
	read -a GH_TOKEN -e -p 'here: '; \
	touch ~/.npmrc \
	&& npm config set '//npm.pkg.github.com/:_authToken' "$$GH_TOKEN"

svelte/node_modules:
	cd svelte; \
	npm i

.PHONY: svelte/build
svelte/build: svelte/node_modules
	cd svelte; \
	npm run build

.PHONY: svelte/test-unit
svelte/test-unit: svelte/node_modules
	cd svelte; \
	npm run test

.PHONY: svelte/test
svelte/test: svelte/test-unit

.PHONY: svelte/lint
svelte/lint: svelte/node_modules
	cd svelte; \
	npm run lint

wc/node_modules:
	cd wc; \
	npm i

.PHONY: wc/build
wc/build: wc/node_modules
	cd wc; \
	npm run build

.PHONY: wc/test-unit
wc/test-unit: wc/node_modules
	cd wc; \
	npm run test

.PHONY: wc/test
wc/test: wc/test-unit

.PHONY: wc/lint
wc/lint: wc/node_modules
	cd wc; \
	npm run lint

common/node_modules:
	cd common; \
	npm i

.PHONY: common/build
common/build: common/node_modules
	cd common; \
	npm run build

.PHONY: common/test-unit
common/test-unit: common/node_modules
	cd common; \
	npm run test

.PHONY: common/test
common/test: common/test-unit

.PHONY: common/lint
common/lint: common/node_modules
	cd common; \
	npm run lint

.PHONY: build
build: wc/build common/build svelte/build

.PHONY: test
test: wc/test common/test svelte/test

.PHONY: lint
lint: wc/lint svelte/lint

.PHONY: ci
ci: lint build test
