// app.js
//you need to create the data base first
const bcrypt = require('bcryptjs'); // Importa bcrypt para el hashing de contraseñas
const db = require('../util/database');

module.exports = class Usuario {
    constructor(mi_username, mi_password) {
        this.username = mi_username;
        this.password = mi_password;
    }

    // Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_cifrado) => {
                return db.execute(
                    'INSERT INTO usuario (username, password) VALUES (?, ?)',
                    [this.username, password_cifrado]
                );
            })
            .catch((error) => {
                console.log(error);
                throw Error('Nombre de usuario duplicado: Ya existe un usuario con ese nombre');
            });
    }

    static fetchOne(username) {
        return db.execute(
            'SELECT * FROM usuario WHERE username=?',
            [username]
        );
    }

    static getPermisos(username) {
        return db.execute(
            `SELECT funcion 
            FROM usuario u, asigna a, rol r, posee p, permiso per
            WHERE u.username = ? AND u.username = a.username
            AND a.idrol = r.id AND r.id = p.idrol 
            AND p.idpermiso = per.id`, 
            [username]
        );
    }
};
