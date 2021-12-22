import {Router} from "express";
import Bills from "../models/Bills.js";

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

router.post("/", async (req, res) => {
   
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
