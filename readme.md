# Next.js & Express Basic Authentication Project
- - - -
This project consists of a client built with Next.js and a server built with Express,
both using basic authentication for user login

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
To run this project, you will need to have Node.js on your machine.
### Installing
1. Clone the repository to your local machine:

```
git clone https://github.com/lecongly/auth-app.git
```

2. Navigate to the `server` directory and install the dependencies for the server:

```
cd server
npm install # yarn
```

3. Navigate to the `client` directory and install the dependencies for the client:

```
cd client
npm install # yarn
```

4. Create a `.env` file in the root of the `server` directory and add the following variables:

```
PORT = 5000
MONGODB_URL = YOUR_MONGODB_URL
CLIENT_URL = YOUR_CLIENT_URL

ACCESS_TOKEN_SECRET = YOUR_ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET = YOUR_REFRESH_TOKEN_SECRET
ACTIVATION_TOKEN_SECRET = YOUR_ACTIVATION_TOKEN_SECRET
GOOGLE_SECRET = YOUR_GOOGLE_SECRET
FACEBOOK_SECRET = YOUR_FACEBOOK_SECRET

#https://developers.google.com/oauthplayground/
MAILING_SERVICE_CLIENT_ID = 
MAILING_SERVICE_CLIENT_SECRET = 
MAILING_SERVICE_REFRESH_TOKEN = 
SENDER_EMAIL_ADDRESS = 

#Cloudinary
CLOUD_NAME = 
CLOUD_API_KEY = 
CLOUD_API_SECRET = 
```

5. Create a `.env.local` file in the root of the `client` directory and add the following variables:

```
NEXT_PUBLIC_API_URL = YOUR_SERVER_URL
```

6. Start the server:

```
cd server
npm run build # yarn run build
npm start # yarn start
```

7. Start the client:

```
cd client
npm run build # yarn run build
npm start # yarn start
```

The client will be available at [http://localhost:3000](http://localhost:3000/) and the server will be available at [http://localhost:5000](http://localhost:5000/).

### Built With

- [Next.js](https://nextjs.org/) - The web framework used for the client
- [Express](https://expressjs.com/) - The web framework used for the server

### Authors

**[Le Cong Ly](https://github.com/lecongly)** - *Software Engineer* 


