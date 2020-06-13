# books-metadata-extractor

Node.js application to extract metadata from Project Gutenberg books.

## Installation of packages

```
$ yarn install
```

## Usage

Running database migrations
```
$ yarn migrate
```

Running script
```
$ yarn start
```

## Environment variables

```
# path to the directory with book files
FILES_PATH=

# limits number of processed files, usefull in development
FILES_LIMIT=

# controls how many books are processed in one batch
BATCH_SIZE=
```

## Database

Project contains `docker-compose.yml` file so to run database you need to run command
```
$ docker-compose up
```

### Tests and Linting

```
$ yarn test
$ yarn lint
```
