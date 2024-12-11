const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: '12345',
  database: 'car_selling_nodejs', 
  multipleStatements: true 
});

connection.connect(function(err) {    
  if (err) {
    console.error('Connect Error:', err);
    throw err;    
  }    
  console.log('Connect Success!'); 
}); 

module.exports = connection;
