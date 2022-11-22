# Assignment 2 - Express Routing + CRUD Operations using SQLite Database.
For this second assignment, you will continue building out your application by implementing CRUD functionality using sqlite database.   

## Deliverable 1 (10 Points)
The project folder is configured with git and npm. You are welcome to scaffold your own folder structure or you can use the [express generator](https://expressjs.com/en/starter/generator.html) to quickly create an application skeleton. 
- Git is initialized into the issued repository and the .gitignore file is configured to ignore the node_modules folder and any other file that is not needed in the remote repository.
- The package.json file contains a list of all development/app dependencies
- Application folder displays a hierarchal folder structure

## Deliverable 2 - Routing and Middleware configuration (10 Points)
For this deliverable, you will focus on implementing the necessary middleware needed to configure and route your application. Feel free to refer back to the [node.js](https://instructorc.github.io/site/slides/logic/nodejs.html) presentation for code samples and an explanation of concepts.
- Middleware is implemented for static files such as images, pdf's, etc
- Middleware is implemented for view templating engine
- Middleware configured to parse JSON data and interpret form data.  Implement the following code below to meet requirement.
``` javascript
 // parse application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
```

- Application has a minimum of 5 routes implemented
  1.  A minimum of three routes should accept data. Both the GET and POST methods will need to be represented in your routing functions
  2.  A minimum of three routes should render data back to the client/user interface.
 
 

## Deliverable 3 - Database implementation (10 Points)
- Your application contains a file titled "database.js" and all of your SQL queries are listed and identified.
- Your database.js file contains a minimum of 4 queries that represent the Create, Retrieve, Update and Delete (CRUD) functionality.
- Database queries are represented within the routes and perform CRUD operations.
- SQLite Database file is included within the project folder


## Submission Guidelines
Your project folder will need to be submitted to the assigned GitHub repository provided to you by the instructor. In Sakai, you will need to submit the link to your repository by the due date and time listed in the write-up. Make sure you receive confirmation from Sakai that your assignment has been submitted.
