import express from "express";
import {createConnection} from "mysql2/promise";
import {config} from "dotenv";
import User from "./models/Users.js";
import Group from "./models/Groups.js";
import Account from "./models/Accounts.js";
import Bill from "./models/Bills.js"
import usersRouter from "./routes/users.js";
import groupsRouter from "./routes/groups.js"
import accountdRouter from "./routes/accounts.js"
import billRouter from "./routes/bills.js"


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
    await Account.init();
    await Bill.init();
 
    const app = express();

    app.use(express.json());

    app.sql = connection;

    app.use("/users", usersRouter);
    app.use("/groups", groupsRouter);
    app.use("/accounts", accountdRouter);
    app.use("/bills", billRouter);
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
