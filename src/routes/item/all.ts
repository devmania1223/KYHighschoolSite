import { Item } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function get(req: Request, res: Response) {
    if (session.check(req, res)) {
        const items = await Item.findAll();

        const response = [];
        for (const item of items) {
            response.push({
                id: item.id,
                code: item.code,
                name: item.name,
                price: item.price
            });
        }

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response));
    }
}