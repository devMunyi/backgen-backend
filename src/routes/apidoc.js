const router = require("express").Router();
const { checkToken } = require("../../middlewares/user");
router.get("/", (req, res) => {
  res.send(
    ` <h4><u>Images/Uploads Retrival Addresses</u></h4>
    =><b>Platform Module</b>, <b><i>"/back/images/platform/imagename"</i></b>,  to access platform's image.<br>
    =><b>Functionality Module</b>, <b><i>"/back/images/functionality/imagename"</i></b>, to access functionality's image.<br>
    =><b>Subfunctionality Module</b>, <b><i>"/back/images/subfunctionality/imagename"</i></b>, to access subfunctionality's image.<br> 
    =><b>Language Module</b>, <b><i>"/back/images/language/imagename"</i></b>, to access language's image.<br> 
    =><b>Framework Module</b>, <b><i>"/back/images/framework/imagename"</i></b>, to access framework's image.<br>
    =><b>Dbms Module</b>, <b><i>"/back/images/dbms/imagename"</i></b>, to access dbms' image.<br>
    =><b>Flags</b>, <b><i>"/back/images/flag/imagename"</i></b>, to access country flag's image.<br>`
  );
  /*res.send(`<h3>API Defined Methods & Addresses:-</h3>
  <h4>1) <u>User Module</u></h4>
  =><b>GET</b>, <b><i>"/back/users"</i></b>,  to access all users.<br>
  =><b>GET</b>, <b><i>"/back/user/:id"</i></b>, to access a specific user specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-user"</i></b>, to add/register a new user.<br>
  =><b>POST</b>, <b><i>"/back/login/user"</i></b>, to login added/registered user.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-user/:id"</i></b>, to edit a user specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-user/:id"</i></b>, to delete a user specified with id param.<br>

  
  <h4>2) <u>Platform Module</u></h4>
  =><b>GET</b>, <b><i>"/back/platforms"</i></b>,  to access all platforms.<br>
  =><b>GET</b>, <b><i>"/back/platform/:id"</i></b>, to access a specific platform specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-platform"</i></b>, to add a new platform.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-platform/:id"</i></b>, to edit a platform specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-platform/:id"</i></b>, to delete a platform specified with id param.<br>
  

  <h4>3) <u>Functionality Module</u></h4>
  =><b>GET</b>, <b><i>"/back/functionalities"</i></b>,  to access all functionalities.<br>
  =><b>GET</b>, <b><i>"/back/functionality/:id"</i></b>, to access a specific functionality specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-functionality"</i></b>, to add a new functionality.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-functionality/:id"</i></b>, to edit a functionality specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-functionality/:id"</i></b>, to delete a functionality specified with id param.<br>
  
  <h4>4) <u>Subfunctionality Module</u></h4>
  =><b>GET</b>, <b><i>"/back/subfunctionalities"</i></b>,  to access all subfunctionalities.<br>
  =><b>GET</b>, <b><i>"/back/subfunctionality/:id"</i></b>, to access a specific subfunctionality specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-subfunctionality"</i></b>, to add a new subfunctionality.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-subfunctionality/:id"</i></b>, to edit a subfunctionality specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-subfunctionality/:id"</i></b>, to delete a subfunctionality specified with id param.<br>
  

  <h4>5) <u>Language Module</u></h4>
  =><b>GET</b>, <b><i>"/back/languages"</i></b>,  to access all languages.<br>
  =><b>GET</b>, <b><i>"/back/language/:id"</i></b>, to access a specific language specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-language"</i></b>, to add a new language.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-language/:id"</i></b>, to edit a language specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-language/:id"</i></b>, to delete a language specified with id param.<br>

  <h4>6) <u>Framework Module</u></h4>
  =><b>GET</b>, <b><i>"/back/frameworks"</i></b>,  to access all frameworks.<br>
  =><b>GET</b>, <b><i>"/back/framework/:id"</i></b>, to access a specific framework specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-framework"</i></b>, to add a new framework.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-framework/:id"</i></b>, to edit a framework specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-framework/:id"</i></b>, to delete a framework specified with id param.<br>


  <h4>7) <u>Implementation Module</u></h4>
  =><b>GET</b>, <b><i>"/back/implementations"</i></b>,  to access all implementations.<br>
  =><b>GET</b>, <b><i>"/back/implementation/:id"</i></b>, to access a specific implementation specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-implementation"</i></b>, to add a new implementation.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-implementation/:id"</i></b>, to edit a implementation specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-implementation/:id"</i></b>, to delete a implementation specified with id param.<br>

  
  <h4>8) <u>Dbms Module</u></h4>
  =><b>GET</b>, <b><i>"/back/dbmses"</i></b>,  to access all dbmses.<br>
  =><b>GET</b>, <b><i>"/back/dbms/:id"</i></b>, to access a specific dbms specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-dbms"</i></b>, to add a new dbms.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-dbms/:id"</i></b>, to edit a dbms specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-dbms/:id"</i></b>, to delete a dbms specified with id param.<br>


  <h4>9) <u>Codesnippet Module</u></h4>
  =><b>GET</b>, <b><i>"/back/codesnippets"</i></b>,  to access all codesnippets.<br>
  =><b>GET</b>, <b><i>"/back/codesnippet/:id"</i></b>, to access a specific codesnippet specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-codesnippet"</i></b>, to add a new codesnippet.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-codesnippet/:id"</i></b>, to edit a codesnippet specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-codesnippet/:id"</i></b>, to delete a codesnippet specified with id param.<br>
  
  <h4>10) <u>Comment Module</u></h4>
  =><b>GET</b>, <b><i>"/back/comments"</i></b>,  to access all comments.<br>
  =><b>GET</b>, <b><i>"/back/comment/:id"</i></b>, to access a specific comment specified by id param.<br>
  =><b>POST</b>, <b><i>"/back/add-comment"</i></b>, to add a new comment.<br> 
  =><b>PUT</b>, <b><i>"/back/edit-comment/:id"</i></b>, to edit a comment specified with the id param.<br> 
  =><b>DELETE</b>, <b><i>"/back/delete-comment/:id"</i></b>, to delete a comment specified with id param.<br>
  
  <h4>11) <u>Images/Uploads Retrival Addresses</u></h4>
  =><b>Platform Module</b>, <b><i>"/back/images/platform/imagename"</i></b>,  to access platform's image.<br>
  =><b>Functionality Module</b>, <b><i>"/back/images/functionality/imagename"</i></b>, to access functionality's image.<br>
  =><b>Subfunctionality Module</b>, <b><i>"/back/images/subfunctionality/imagename"</i></b>, to access subfunctionality's image.<br> 
  =><b>Language Module</b>, <b><i>"/back/images/language/imagename"</i></b>, to access language's image.<br> 
  =><b>Framework Module</b>, <b><i>"/back/images/framework/imagename"</i></b>, to access framework's image.<br>
  =><b>Dbms Module</b>, <b><i>"/back/images/dbms/imagename"</i></b>, to access dbms' image.<br>
  =><b>Flags</b>, <b><i>"/back/images/flag/imagename"</i></b>, to access country flag's image.<br>
  `);
  */
});

module.exports = router;
