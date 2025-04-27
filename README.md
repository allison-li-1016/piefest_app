# piefest_app
Force Push to main

# Run locally

You will need node/npm. On mac run `brew install node`. You will also need [make](https://www.google.com/search?q=install%20make)

## Installing deps
```bash
make install
```

## Build service (required for frontent updates)
```bash
make build
```

## Run service
```bash
make run
```

For frontent changes run
```bash
make run_with_build
```