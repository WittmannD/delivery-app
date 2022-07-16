# Delivery App. REST api + React app

A simple application for food delivery. The user can select a store, add products to the shopping cart and send the order to the server.
App data is stored in a database. The cart is saved in session on the server using the express-session library.

Preview: https://ddeliveryy.herokuapp.com/shop

### Stack
- **Node.js**
- **Express**
- **Prisma orm**
- **React**

Additional packages:
- **express-session** to store the cart in the session
- **@quixo3/prisma-session-store** to integrate with prisma orm and save the session in a database
- **joi** to validate input to the express server
- **redux** for state management
- **tailwind** and **flowbite** for ui stylization
- **axios** for api requests
- **@react-google-maps/api** for integration with google maps

### Installation and start

```
git clone https://github.com/WittmannD/delivery-app.git
cd delivery-app
```

#### Run Express App

You should install PostgreSQL and set the PRIMSA_DATABASE_URL variable in .env (see .env.example).

```
cd server
npm i
npm run build
npm run run:dev
```

#### Run React App

Set variables in the .env file, then:

```
cd client
npm i
npm start
```

---
