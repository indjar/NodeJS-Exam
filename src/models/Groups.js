import {getConnection} from "../database/mysql.js";

export default class Group {
    constructor({id, name}) {
        this.id = id;
        this.name = name;
        
    }
  

    static async create({name}) {
        try {
            const connection = await getConnection();
            const query = `
                INSERT INTO billGroups (name)
                VALUES (?);
            `;
            const [{insertedId}] = await connection.query(query, [name]);

            return new Group({id: insertedId, name});
        } catch (e) {
            console.log("Couldn't create group, contact CSS", e);
            throw e;
        }
    }

    static async getAllGroups() {
        try {
            const connection = await getConnection();
            const query = "SELECT * FROM billGroups";
            const [data] = await connection.query(query);
            console.log(data)
            return data.map((name) => new Group(name));
        } catch (e) {
            console.log("There is no groups, please contact CSS", e);
            throw e;
        }
    }

       static async init() {
        try {
            const connection = await getConnection();
            const query = `
                CREATE TABLE IF NOT EXISTS billGroups (
                    id INTEGER AUTO_INCREMENT NOT NULL,
                    name VARCHAR(12) NOT NULL,
                    PRIMARY KEY (id)
                )
            `;

            await connection.query(query);

            console.log("Successfully created table");
        } catch (e) {
            console.log("Couldn't init group to database", e);
            throw e;
        }
    }
}
