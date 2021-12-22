import {Router} from "express";
import Bills from "../models/Bills.js";
import { body } from "express-validator";
import { validateErrorsMiddleware } from "../middleware/validateErrors.js"

const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const id=Number (req.params.id)
        const bill = await Bills.getAllByGroupId(id);
        res.send({
            bill,
        });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

router.post("/", 
body(["group_id", "amount", "description"]).exists(),
body(["group_id","amount"]).isNumeric(),
body(["description"]).isString(),
validateErrorsMiddleware,
async (req, res) => {
   
    try {
        const {group_id, amount, description} = req.body;

        const bill = await Bills.create({group_id, amount, description});

        if(!group_id || !amount || !description){
            return res.status(400).send({error:"Incorect data"})
        }

        res.send({
                bill,
            });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

export default router;
