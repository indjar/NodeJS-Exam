import {Router} from "express";
import loggedInMiddleware from "../middleware/isLoggedIn.js";
import Account from "../models/Accounts.js";

const router = Router();

router.get("/", loggedInMiddleware, async (req, res) => {
    try {
        const {user_id} = req.token;
        const account = await Account.getAllByAccountId(user_id);
        res.send({
            account,
        });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

router.post("/", loggedInMiddleware, async (req, res) => {
    console.log(req.token)
    try {
        const {group_id} = req.body;
        const user = req.token;
        const user_id=user.acountId
        console.log(group_id, user_id)

        const account = await Account.create({group_id, user_id});
        console.log(account)

        res.send({
            account,
        });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

export default router;
