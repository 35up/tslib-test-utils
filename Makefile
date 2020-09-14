.DEFAULT_GOAL := build

.PHONY: github-pkg
github-pkg:
	@if cat ~/.npmrc | grep -q '^//npm\.pkg\.github\.com/:_authToken'; then \
		exit 0; \
	fi; \
	echo '======================================================================='; \
	echo 'Cannot download @caseable packages from the Github package repository'; \
	echo 'Please go to https://github.com/settings/tokens and generate a personal'; \
	echo 'access token with permissions to read packages. After you generate the '; \
	read -a GH_TOKEN -e -p 'token, please type or paste it here: '; \
	touch ~/.npmrc \
	&& npm config set '//npm.pkg.github.com/:_authToken' "$$GH_TOKEN"

.PHONY: wc/node_modules
wc/node_modules:
	cd js-test-utils-wc; \
	npm i

.PHONY: wc/build
wc/build: wc/node_modules
	cd js-test-utils-wc; \
	npm run build

.PHONY: wc/test-unit
wc/test-unit: wc/node_modules
	cd js-test-utils-wc; \
	npm run test

.PHONY: wc/test
wc/test: wc/test-unit

.PHONY: wc/lint
wc/lint: wc/node_modules
	cd js-test-utils-wc; \
	npm run lint

.PHONY: general/node_modules
general/node_modules:
	cd js-test-utils; \
	npm i

.PHONY: general/build
general/build: general/node_modules
	cd js-test-utils; \
	npm run build

.PHONY: general/test-unit
general/test-unit: general/node_modules
	cd js-test-utils; \
	npm run test

.PHONY: general/test
general/test: general/test-unit

.PHONY: general/lint
general/lint: general/node_modules
	cd js-test-utils; \
	npm run lint

.PHONY: build
build: wc/build general/build

.PHONY: test
test: wc/test general/test

.PHONY: lint
lint: wc/lint

.PHONY: ci
ci: lint build test
