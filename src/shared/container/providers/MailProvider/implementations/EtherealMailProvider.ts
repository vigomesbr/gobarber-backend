// Em: src/shared/providers/MailProvider/implementations/EtherealMailProvider.ts

import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailProviderTemplate';

@injectable() 
export default class EtherealMailProvider implements IMailProvider {
  private client?: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  // Método privado para criar o transporter na primeira vez
  private async getClient(): Promise<Transporter> {
    if (!this.client) {
      const account = await nodemailer.createTestAccount();
      
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    }
    return this.client;
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    // Garante que o client foi inicializado antes de usar
    const client = await this.getClient();
    
    const message = await client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'contato@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      // Usa o template provider que foi injetado
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}