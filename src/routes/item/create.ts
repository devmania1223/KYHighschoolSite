import { Item } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function post(req: Request, res: Response) {
    if (session.check(req, res)) {
        const body = req.body;

        const item = await Item.create({
            code: body.code,
            name: body.name,
            price: +body.price,
        });

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(item));
    }
}