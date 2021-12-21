import {getConnection} from "../database/mysql.js";

export default class User {
    constructor({id, full_name, email, password}) {
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.password = password;
    }

    get fullName() {
        return `${this.full_name}`;
    }

    

    static async create({full_name, email, password}) {
        try {
            const connection = await getConnection();
            const query = `
                INSERT INTO users (full_name, email, password)
                VALUES (?, ?, ?);
            `;
            const [{insertedId}] = await connection.query(query, [full_name, email, password]);

            return new User({id: insertedId, full_name, email, password});
        } catch (e) {
            console.log("Couldn't create user, contact CSS", e);
            throw e;
        }
    }

    static async all() {
        try {
            const connection = await getConnection();
            const query = "SELECT full_name, email FROM users";
            const [data] = await connection.query(query);
            console.log(data)
            return data.map((full_name, email) => new User(full_name, email));
        } catch (e) {
            console.log("There is no users, please contact CSS", e);
            throw e;
        }
    }

    static async loginByEmail(email) {
        try {
            const connection = await getConnection();
            const query = "SELECT * FROM users WHERE email = ?";
            const [data] = await connection.query(query, [email]);
            const [user] = data;

            if (!user) return null;

            return new User({...user});
        } catch (e) {
            console.log(`There is no user with email ${email}`, e);
            throw e;
        }
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER AUTO_INCREMENT NOT NULL,
                    full_name VARCHAR(48) NOT NULL,
                    reg_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    email VARCHAR (264) NOT NULL,
                    password VARCHAR (64) NOT NULL,
                    PRIMARY KEY (id),
                    UNIQUE (email)
                )
            `;

            await connection.query(query);

            console.log("Successfully created table");
        } catch (e) {
            console.log("Couldn't init user to database", e);
            throw e;
        }
    }
}
