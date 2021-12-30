import { Customer } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function post(req: Request, res: Response) {
    if (session.check(req, res)) {
        const body = req.body;

        Customer.findOne({
            where: { id: body.id }
        }).then(customer => {
            customer.code = body.code;
            customer.name = body.name;
            customer.address = body.address;
            customer.save();
        });

        res.end();
    }
}