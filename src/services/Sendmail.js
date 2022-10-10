import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';

async function createNewUser(to) {

  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no Foods App',
      text: `Conta criada com sucesso.\n\n.`,
      html: `<h1>Conta criada com sucesso.</h1><p>.</p>`,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    };
  } catch (err) {
    throw new Error(err);
  };
}

async function createNewPass(pass, to) {

  try {

    console.log(to)

    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Senha gerada com sucesso!',
      text: `Senha gerada!.\n\nA senha gerada é: ${pass}.`,
      html: `<h1>Senha gerada!.</h1><p>Acesse o aplicativo para gerar mais.</p>`,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    };
  } catch(err) {
    throw new Error(err);
  };

};

async function createNewEmail(email, to) {

  try {

    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Email gerado com sucesso!',
      text: `Email gerado!.\n\nO email gerado é: ${email}.`,
      html: `<h1>Email gerado!.</h1><p>Acesse o aplicativo para gerar mais.</p>`,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    };
  } catch(err) {
    throw new Error(err);
  };

};

async function createNewCpf(cpf, to) {

  try {

    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'CPF gerado com sucesso!',
      text: `CPF gerado!.\n\nO CPF gerado é: ${cpf.cpf}.`,
      html: `<h1>CPF gerado!.</h1><p>Acesse o aplicativo para gerar mais.</p>`,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    };
  } catch(err) {
    throw new Error(err);
  };

};

async function createNewCnpj(cnpj, to) {

  try {

    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Cnpj gerado com sucesso!',
      text: `Cnpj gerado!.\n\nO Cnpj gerado é: ${cnpj.cnpj}.`,
      html: `<h1>Cnpj gerado!.</h1><p>Acesse o aplicativo para gerar mais.</p>`,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    };
  } catch(err) {
    throw new Error(err);
  };

};

export default { createNewUser, createNewPass, createNewEmail, createNewCpf, createNewCnpj };