install:
	cd piefest_backend; \
	npm install

build:
	cd piefest_backend; \
	npm run build

run:
	cd piefest_backend; \
	npm start

run_with_build: run build