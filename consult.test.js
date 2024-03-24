// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de Usuario', () => {
    let connection;

    beforeAll(async () => {
        // Crea una conexión a la base de datos de prueba
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'AguaUwu2',
            database: 'minecraft2'
        });
    });

    afterAll(async () => {
        // Cierra la conexión con la base de datos
        await connection.end();
    });

    test('fetchOne devuelve el usuario correcto', async () => {
        const username = 'Alexys';
        const [rows] = await Usuario.fetchOne(username);
        console.log(rows); // Agregar esta línea para imprimir el resultado
        expect(rows.length).toBe(1);
        expect(rows[0].username).toBe(username);
    });
    
});
