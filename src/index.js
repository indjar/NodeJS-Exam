import express from "express";
import {createConnection} from "mysql2/promise";
import {config} from "dotenv";
import User from "./models/Users.js";
import Group from "./models/Groups.js";
import usersRouter from "./routes/users.js";
import groupsRouter from "./routes/groups.js"


config();

const main = async () => {
    const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PW, MYSQL_DB} = process.env;

    const connection = await createConnection({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PW,
        database: MYSQL_DB,
    });
try {
    await User.init();
    await Group.init();
 
    const app = express();

    app.use(express.json());

    app.sql = connection;

    app.use("/users", usersRouter);
    app.use("/groups", groupsRouter);


    app.listen(8080, () => {
        console.log("http://localhost:8080");
    });
} catch (error) {onsole.error(error);
        
    app.get("*", (_, res) => {
        res.status(500).send(
            "Something went wrong while starting the server"
            );
        })
    
    app.listen (PORT, ()=>{
        console.log(
            `Error server running on: http://localhost:${PORT}/`
        )
    })
    }
};

main();
