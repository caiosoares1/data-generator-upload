import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Pass from "../models/Pass.js";
import Email from "../models/Email.js";
import Cpf from "../models/Cpf.js";
import Cnpj from "../models/Cnpj.js";
import Domain from "../models/Domain.js";
import User from "../models/User.js";
import Auth from "../middleware/auth.js";
import SendMail from '../services/Sendmail.js';
import multer from 'multer';

import uploadConfig from '../config/multer.js';

const router = Router();

//////////////////////////////////////////////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', (req, res) => res.redirect('/Generator.html'));

router.post('/pass', Auth.isAuthenticated, async (req, res) => {
  
  try {

    const userId = req.userId;

    const user = await User.read(userId);

    const pass = Number(req.body.carac);

    const newPass = await Pass.generatePass(pass);

    res.json(newPass);

    await SendMail.createNewPass(newPass, user.email);

  } catch(error) {

    throw new Error('Error in create pass');

  };
});

router.post('/email', Auth.isAuthenticated, async (req, res) => {

  try {

    const userId = req.userId;

    const user = await User.read(userId);

    const email = req.body;

    const newEmail = await Email.create(email);

    res.json(newEmail);

    await SendMail.createNewEmail(newEmail, user.email);

  } catch(error) {

    throw new Error('Error in create email');

  };
});

router.get('/domains', Auth.isAuthenticated, async (req, res) => {

  try {

    const domains = await Domain.readAll();

    res.json(domains);

  } catch(error) {
    throw new Error('Error in list domais');
  };
});

router.post('/cpf', Auth.isAuthenticated, async (req, res) => {

  try {

    const userId = req.userId;

    const user = await User.read(userId);

    const cpf = req.body.mascara;

    const newCpf = await Cpf.create(cpf);

    res.json(newCpf);

    await SendMail.createNewCpf(newCpf, user.email);

  } catch(error) {

    throw new Error('Error in create cpf');
  };
});

router.post('/cnpj', Auth.isAuthenticated, async (req, res) => {

  try {

    const userId = req.userId;

    const user = await User.read(userId);

    const cnpj = req.body.mascara;

    const newCNPJ = await Cnpj.create(cnpj);
    
    res.json(newCNPJ);

    await SendMail.createNewCnpj(newCNPJ, user.email);
    
  } catch(error) {

    throw new Error('Error in create cnpj');  
  };
});

/*router.post('/signup', async (req, res) => {

  const data = req.body;

  await SendMail.createNewUser(data.email);

  res.json(await User.signup(data));

});*/

router.post(
  '/signup',
  multer(uploadConfig).single('image'),
  async (req, res) => {
    try {
      const data = req.body;

      const image = req.file
        ? `/imgs/profile/${req.file.filename}`
        : '/imgs/profile/placeholder.jpg';
      ;

      const newUser = await User.signup({ ...data, image });

      await SendMail.createNewUser(data.email);

      res.json(newUser);
    } catch (error) {
      throw new Error('Error in create user');
    }
  }
);

router.post('/signin', async (req, res) => {
  try {

    const { email, senha } = req.body;

    const user = await User.signin(email);

    if (user.error === 1) {
      throw new Error('Email ou senha incorretos!');
    }

    const { id: userId, senha: hash } = user;

    const match = await bcrypt.compareSync(senha, hash);

    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.SECRET,
        { expiresIn: 3600 } // 1h
      );
      res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch(error) {
    res.status(401).json({ error: 'User not found' });
  }
});

router.use(function(error, req, res, next) {
  console.error(error.stack);

  res.status(500).json({
    message: 'Something broke!'
  });
});

export default router;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////