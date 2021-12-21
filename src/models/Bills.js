import {getConnection} from "../database/mysql.js";

export default class Bill {
    constructor(id, group_id, amount, description) {
        this.id = id;
        this.group_id=group_id;
        this.amount=amount;
        this.description=description;
    }

    static async create({group_id, amount, description}) {
        try {
            const connection = await getConnection();
            const query = "INSERT INTO bills (group_id, amount,description) VALUES (?, ?, ?);";

            await connection.query(query, [group_id, amount, description]);

            return new Bill(group_id, amount, description);
        } catch (e) {
            console.log("Couldn't create a bill", e);
            throw e;
        }
    }

    static async getAllByGroupId(group_id) {
        try {
            const connection = await getConnection();
            const query = `SELECT b.* FROM bills b 
                            JOIN accounts a on a.group_id=b.group_id
                            WHERE b.group_id=?`;
            

            const [data] = await connection.query(query, [group_id]);
            return data.map(({id}) => new Bill(id));
        } catch (e) {
            console.log("Couldn't get all bills", e);
            throw e;
        }
    }

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
                CREATE TABLE IF NOT EXISTS bills (
                    id INTEGER AUTO_INCREMENT NOT NULL,
                    group_id INTEGER NOT NULL,
                    amount DEC(8,2) NOT NULL,
                    description VARCHAR (120) NOT NULL,
                    PRIMARY KEY (id),
                    FOREIGN KEY (group_id) REFERENCES billGroups (id)
                    
                )
            `;

            await connection.query(query);

            console.log("Successfully created 'bills' table");
        } catch (e) {
            console.log("Couldn't init 'bills' to db", e);
            throw e;
        }
    }
}
