import { Sequelize } from 'sequelize-typescript';

const dbOptions = {
    models: [__dirname + '/models']
}

export const sequelize = new Sequelize({
    ...dbOptions,
    database: 'chat',
    dialect: 'sqlite', // here we can have different dialects like mssql, postgres etc...
    username: 'root',
    password: '',
    storage: 'chat.db',
    logging: false
})