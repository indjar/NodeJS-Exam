import {Router} from "express";
import {hash, compare} from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import {config} from "dotenv";
import joi from "joi";

config();

const router = Router();

const userInfoSchema = joi.object({
    full_name: joi.string().required(),
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().required()
});

/* this router.get writen for self control */
router.get("/", async (req, res) => {
    try {
        const users = await User.all();
        res.send(users);
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});
/*-------------------------------------------- */

router.post("/register", async (req, res) => {
    const {full_name, email, password} = await userInfoSchema.validateAsync(req.body);
    const hashed = await hash(password, 10);

    try {
        const user = await User.create({full_name, email, password: hashed});

        res.status(201).send({
            user,
        });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.loginByEmail(email);

        const error = "Couldn't login";

        if (!user) {
            return res.status(403).send({
                error,
            });
        }

        const isValidPw = await compare(password, user.password);

        if (!isValidPw) {
            return res.status(403).send({
                error: "Incorrect email or password"
            });
        }

        console.log(user);

        const token = jwt.sign(
            {
                user_id: user.id,
            },
            process.env.TOKEN_SECRET
        );

        res.send({
            token,
        });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

export default router;
