import { Customer } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function del(req: Request, res: Response) {
    if (session.check(req, res)) {
        const body = req.body;

        Customer.destroy({
            where: { id: body.id }
        });

        res.end();
    }
}