build:
	@echo component build

test: build
	@./node_modules/.bin/component-build \

	@echo test with mocha
	@./node_modules/.bin/mocha \
		--require chai \
		--reporter spec

	@echo test with phantomjs
	@./node_modules/mocha-phantomjs/bin/mocha-phantomjs test/test-runner.html

.PHONY: test build
