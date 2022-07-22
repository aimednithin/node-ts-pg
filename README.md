
# Project Title

## softwares needed to be installed on system 

- nodejs
- postgres

## steps to run

Updated database connection config in `src/dbConnect.js`

```
npm install 

npm run tsc

npm run seed // to seed provided data

npm start 

```

server will start on `localhost:3001`

### Shows

#### get all Shows

`localhost:3001/shows`

get shows by id

`localhost:3001/shows/:id`

get shows with package_id or network_id

```
localhost:3001/shows?package_id=2&&network_id=1
localhost:3001/shows?package_id=2
localhost:3001/shows?network_id=1
```
### Package

get all packages

`localhost:3001/packages`

get package by id

`localhost:3001/packages/:id`

### Network

get all Network

`localhost:3001/network`

get network by id

`localhost:3001/network/:id`

