## Event sourcing backend

to run the app

first install node modules

make copy of `.env.example` and rename it `.env`

replace the content with your environment values

**FOR TVC AND FIG**
To be able to run on the fly, please use below. (Note: it will be deleted after scoring)

DATABASE_URL=mongodb+srv://event-dev:<PASSWORD>@cluster0.q7j9m.mongodb.net/?retryWrites=true&w=majority
DATABASE_PASSWORD=Password123
DB_NAME=event-sourcing
SERVER_PORT=4000
NODE_ENV=development

JWT_SECRET=SO-WE-NEED-OU-ALTRA-HYPPER-ACTIve$2sajkaJSDKJSDKKL-230=SDJKNSDKJ23Ijndsfcknckzcnxckjnsdkjnsdakjnsdknsadlk
JWT_EXPIRES_IN=15m

### Please note: 
There are no seed users and user management is not available in this prototype, it is recommended to use the existing database which has a `System user` with 
- email: `admin@mail.com`
- password: `11111111`

The admin account can be used to add new `Categories` 

`npm install`

or

`yarn`

When command is done running

`npm start`

or

`yarn start`


### Features implemented
- view events
- create events
- subscribe to category of interest
- authentication and authorization of users and user actions
- user sign up
- user login
- Basic error handling


### Features that should be added are
- User management: This should allow system admins to view, create, edit, disable and enable users
- Category management
- cache catogories, and update cache anyttime there's a new or updates to the categories.
- event management from system admins to block inappropriate events
- Password reset
- Password change

