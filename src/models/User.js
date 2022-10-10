import Database from '../db/database.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from "jsonwebtoken";

const salt = Number(process.env.SALT);

async function signup(data) {
  const db = await Database.connect();

  const { name, image, email, senha } = data;

  const hash = bcrypt.hashSync(senha, salt);

  const sql = `
    SELECT
      *
    FROM
      user
    WHERE
      email = ? 
  `;

  const result = await db.get(sql, [email]);

  try {
    if (email === result.email) {
      return false
    };
  } catch (error) {
    db.run(`
    INSERT INTO 
      user (name, image, email, senha)
    VALUES
      (?, ?, ? ,?)
    `, [ name, image, email, hash ]);
    return true
  };
};

async function signin(email){
  
  const content = email;

  if (!content){
    console.log('dados')
    return { error: 2, mensage: 'Dados incompletos!' };
  }
  
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      user
    WHERE
      email = ? 
  `;

  const result = await db.get(sql, [email]);

  return result
  
  /*if(!result){
    return { error: 1, mensage: 'E-mail ou senha incorreto(s)!' };
  } else {
    return { error: 0, name: result.name, email: result.email};
  }*/

};

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM 
      user
    WHERE
      id = ?
  `;

  const user = await db.get(sql, [id]);

  return user;
}

export default { signup, signin, read }