import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
    development: {
        username: process.env.SQL_USER,
        password: process.env.SQL_PASS,
        database: process.env.SQL_DBNAME,
        host: process.env.SQL_HOST,
        dialect: process.env.SQL_DIALECT,
    },
});

// connection
async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Kết nối DB bằng sequelize thành công');
    } catch (error) {
        console.error('Không thể kết nối DB bằng sequelize:', error);
    }
}
connection();

export default sequelize;
