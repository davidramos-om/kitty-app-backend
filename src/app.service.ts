import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreeter() {

    //say hello world in different languages
    const helloWorld = {
      en: 'Hello World!',
      es: '¡Hola Mundo!',
      fr: 'Bonjour le monde!',
      de: 'Hallo Welt!',
      it: 'Ciao mondo!',
      pt: 'Olá Mundo!',
      ru: 'Привет, мир!',
      ja: 'こんにちは世界！',
      ko: '안녕 세상!',
      zh: '你好，世界！',
      hi: 'नमस्ते दुनिया!',
      ar: 'مرحبا بالعالم!',
      tr: 'Merhaba Dünya!',
      nl: 'Hallo Wereld!',
      sv: 'Hej världen!',
      pl: 'Witaj świecie!',
      no: 'Hei verden!',
      da: 'Hej Verden!',
      fi: 'Hei maailma!',
      cs: 'Ahoj světe!',
      el: 'Γειά σου Κόσμε!',
    }

    //get the language from the browser
    return helloWorld;
  }

  getHello(): string {
    return 'Hello World!';
  }

  serverInfo() {
    return {
      enviroment: (process.env.NODE_ENV || 'development'),
      port: (process.env.PORT || 0),
      version: process.env.npm_package_version,
      name: process.env.npm_package_name,
      description: process.env.npm_package_description,
    }
  }
}
