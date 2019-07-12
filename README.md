# Vidjot

Vidjot is a CRUD application with login functionality and server-side validation form, built with VanillaJS,
Node.js, express, mongoDB.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

1. Clone the repo

```
git clone https://github.com/agungTuanany/vidjot.git
```

2. Install pakcage.json file

```
npm install or npm i
```

3. run npm or yarn manager in root folder

```
npm run dev

#or

yarn dev
```

4. create dev.js in config folder for development environment
```
# in config folder
  touch dev.js

  module.exports = {
    mongoURI = 'your-mlab//<username><pass>/<your-mlab-db>'
    // or using mongod
    //mongoURI = 'mongod://localhost:127.0.0.1/<your-local-db>'
  }

```

## Built With

* VanillaJS
* Node.js
* Express
* MongoDB | Using mlab

## plugin

* bcyrptjs
* body-parser
* connect-flash
* express
* express-handlebars
* method-override
* mongoose
* passport
* passport-local

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
 @[bradTraversy](https://github.com/bradtraversy)

