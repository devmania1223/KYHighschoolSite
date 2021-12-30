import { Customer } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function get(req: Request, res: Response) {
    if (session.check(req, res)) {
        const customers = await Customer.findAll();

        const response = [];
        for (const customer of customers) {
            response.push({
                id: customer.id,
                code: customer.code,
                name: customer.name,
                address: customer.address
            });
        }

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response));
    }
}