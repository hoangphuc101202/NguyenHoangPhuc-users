const DBConnect = require('../dbconnect/DBconnect');
const md5 = require('md5');

const addUser = async (fullname,username,password) => {
  const connection = await DBConnect.connection;
  const result = await connection.execute
  ('INSERT INTO users (fullname, username, password) VALUES (?,?,?)', 
  [fullname,username,md5(password)]);
  if(result[0].changeRows == 0) return null
  return true;
}
const findAllUsers = async () => {
    const connection = await DBConnect.connection;
    const results = await connection.execute('SELECT * FROM users');
    return results[0];
  }
const findUserByID = async (id) => {
  const connection = await DBConnect.connection;
  const results = await connection.execute('SELECT * FROM users WHERE id = ? ',[id]);
  if(results[0].length == 0) {
    return null;
  }
  return results[0][0]
}
  
const deleteUser = async (id) => {
  const connection = await DBConnect.connection;
  const result = await connection.execute('DELETE FROM users WHERE id = ?',[id]);
  if(result[0].length == 0) return null
  return result[0][0];
}

const updateUser = async (id, fullname, username,password) => {
  const connection = await DBConnect.connection;
  const update = await connection.execute
  ('UPDATE users SET fullname = ?, username = ?, password = ? WHERE id = ?',
   [fullname, username, md5(password) ,id]);
   if(update[0].changeRows == 0) return null;
   return true;
}
module.exports = {findAllUsers, findUserByID, updateUser, deleteUser,addUser};