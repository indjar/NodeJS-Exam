import {getConnection} from "../database/mysql.js";

export default class Account {
    constructor(id, group_id, user_id) {
        this.id = id;
        this.group_id=group_id;
        this.user_id=user_id;
    }

    static async create({group_id, user_id}) {
        try {
            const connection = await getConnection();
            const query = "INSERT INTO accounts (group_id, user_id) VALUES (?, ?);";

            await connection.query(query, [group_id, user_id]);

            return new Account(group_id, user_id);
        } catch (e) {
            console.log("Couldn't create a account", e);
            throw e;
        }
    }

    static async getAllByAccountId(id) {
        try {
            const connection = await getConnection();
            const query = `SELECT g.name, a.* FROM accounts a
                            JOIN billGroups g on g.id=a.group_id
                            WHERE a.user_id=?`;
           
            const [data] = await connection.query(query, [id]);
            return data.map(({id, name}) => new Account(id, name));
        } catch (e) {
            console.log("Couldn't get all accounts", e);
            throw e;
        }
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
                CREATE TABLE IF NOT EXISTS accounts (
                    id INTEGER AUTO_INCREMENT NOT NULL,
                    group_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    PRIMARY KEY (id),
                    FOREIGN KEY (group_id) REFERENCES billGroups (id),
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )
            `;

            await connection.query(query);

            console.log("Successfully created 'accounts' table");
        } catch (e) {
            console.log("Couldn't init 'accounts' to db", e);
            throw e;
        }
    }
}
