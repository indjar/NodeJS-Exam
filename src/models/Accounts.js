import {getConnection} from "../database/mysql.js";

export default class Account {
    constructor(id, group_id, user_id) {
        this.id = id;
        this.group_id=group_id;
        this.user_id=user_id;
    }

    static async create({group_id, user_id }) {
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

    static async getAllByAccountId(user_id) {
        try {
            const connection = await getConnection();
            const query = "SELECT * FROM accounts WHERE user_id=?";
            console.log({user_id});

            const [data] = await connection.query(query, [user_id]);
            return data.map(({id}) => new Account(id));
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
