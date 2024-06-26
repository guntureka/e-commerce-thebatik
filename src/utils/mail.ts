"use strict";

import nodemailer, { TransportOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const mailConfig: SMTPTransport.Options = {
  host: process.env.MAIL_HOST!,
  // port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
  secure: true,
};

export const transporter = nodemailer.createTransport(mailConfig);
