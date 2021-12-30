import { Customer } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function post(req: Request, res: Response) {
    if (session.check(req, res)) {
        const body = req.body;

        const customer = await Customer.create({
            code: body.code,
            name: body.name,
            address: body.address,
        });

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(customer));
    }
}