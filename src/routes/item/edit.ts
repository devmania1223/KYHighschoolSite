import { Item } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function post(req: Request, res: Response) {
    if (session.check(req, res)) {
        const body = req.body;

        Item.findOne({
            where: { id: body.id }
        }).then(item => {
            item.code = body.code;
            item.name = body.name;
            item.price = +body.price;
            item.save();
        });

        res.end();
    }
}