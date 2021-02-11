# SOCIAL AWARENESS - Addvertisement of Campaign 
```
    . Is a app, where real user are able to post their campaign adds to raise awareness. 
    . Fully functional app  
    . Admin must approve the advertisement of campaign
```

## Technology
```
Node.js, expressJs, mongoDb, pug, 
REST API 
```

## Installation
    ```
       $ git clone https://github.com/amritregmi/socialawareness
       $ npm install
       $ touch .env
    ```
   #### Paste below in .env file, CHANGE DATABASE_USERNAME and DATABASE_PASSWORD
        ```
        PORT = 3030
        DB_LINK = mongodb+srv://DATABASE_USERNAME:<DATABASE_PASSWORD>@cluster0.ua44v.mongodb.net/socialawareness?retryWrites=true&w=majority
        DATABASE_USERNAME = [your username]
        DATABASE_PASSWORD = [your password]
        JWT_SECRET_KEY = this.is.a.secret.jwt.key.from
        JWT_EXPIRES_IN = 90d
        JWT_COOKIE_EXPIRES_IN = 90
        ```
## Usage 
```
To run in development 
    npm run start

To run in production 
    npm run start:prod
```
    
## Routes (http://127.0.0.1:3030/)
    # VIEW ROUTES
    
        GET     / 
        POST    /login
        POST    /signup
    
    # API ROUTES 
    
        POST    /api/users/signup
        POST    api/users/login
        POST    /api/users/logout

## App Screenshot 
    
    see folder snapshot 

## Next Version.
```
1. Converting this app from pug to REACTJS.
2. Replacing Current Authentication to FIREBASE.
3. Adding Extra Feature.
```

## Contributing 
    Amrit Regmi

## Licence 

 
    
