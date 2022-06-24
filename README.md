## Event sourcing backend

to run the app

first install node modules

make copy of `.env.example` and rename it `.env`

replace the content with your environment values

### Note for FIG: 
There are no seeded users and user management is not available in this prototype, it is recommended to use the existing database which has a `System user` with the following credentials.
- email: `admin@mail.com`
- password: `11111111`

The admin account can be used to add new `Categories` for the app

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

