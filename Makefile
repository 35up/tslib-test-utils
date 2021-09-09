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

.PHONY: svelte/node_modules
svelte/node_modules:
	cd tslib-test-utils-svelte; \
	npm i

.PHONY: svelte/build
svelte/build: svelte/node_modules
	cd tslib-test-utils-svelte; \
	npm run build

.PHONY: svelte/test-unit
svelte/test-unit: svelte/node_modules
	cd tslib-test-utils-svelte; \
	npm run test

.PHONY: svelte/test
svelte/test: svelte/test-unit

.PHONY: svelte/lint
svelte/lint: svelte/node_modules
	cd tslib-test-utils-svelte; \
	npm run lint

.PHONY: wc/node_modules
wc/node_modules:
	cd tslib-test-utils-wc; \
	npm i

.PHONY: wc/build
wc/build: wc/node_modules
	cd tslib-test-utils-wc; \
	npm run build

.PHONY: wc/test-unit
wc/test-unit: wc/node_modules
	cd tslib-test-utils-wc; \
	npm run test

.PHONY: wc/test
wc/test: wc/test-unit

.PHONY: wc/lint
wc/lint: wc/node_modules
	cd tslib-test-utils-wc; \
	npm run lint

.PHONY: general/node_modules
general/node_modules:
	cd tslib-test-utils; \
	npm i

.PHONY: general/build
general/build: general/node_modules
	cd tslib-test-utils; \
	npm run build

.PHONY: general/test-unit
general/test-unit: general/node_modules
	cd tslib-test-utils; \
	npm run test

.PHONY: general/test
general/test: general/test-unit

.PHONY: general/lint
general/lint: general/node_modules
	cd tslib-test-utils; \
	npm run lint

.PHONY: build
build: wc/build general/build svelte/build

.PHONY: test
test: wc/test general/test svelte/test

.PHONY: lint
lint: wc/lint svelte/lint

.PHONY: ci
ci: lint build test
