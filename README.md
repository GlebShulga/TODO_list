This project was made with [React Boilerplate](https://github.com/ovasylenko/skillcrucial-react-redux-boilerplate), using [Redux](https://redux.js.org/).

![How it looks like](https://github.com/GlebShulga/TODO_list/blob/main/client/assets/images/picture.png)

## Key Features

- Fully Responsive
- Add new task
- Change task's status
- Filter tasks by status
- Сounter of tasks by status

## How to use it?
Install modules:
npm install

Run a project:
npm run dev

Run server only:
npm run watch:server

Run webpack development server (client):
npm run watch:client

Build a project:
npm run build:client

## The stack

### Back

- Node.js
- Express.js

### Front

- React
- Redux/Redux-Thunk
- Axios
- Tailwind

#### Docker
Nginx web server working on 443, 80 ports on localhost

```run production
docker-compose -f .\docker\PROD.docker-compose.yml up (Options: --build for build, -d to detach )
docker-compose -f .\docker\PROD.docker-compose.yml down (To stop contaiters)
```
```run develop
docker-compose -f .\docker\DEV.docker-compose.yml up (Options: --build for build, -d to detach )
docker-compose -f .\docker\DEV.docker-compose.yml down (To stop contaiters)
```
