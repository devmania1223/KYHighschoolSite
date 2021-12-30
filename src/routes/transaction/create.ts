import { Transaction, Item, Customer } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function post(req: Request, res: Response) {
    if (session.check(req, res)) {
        const body = req.body;

        const transaction = await Transaction.create({
            itemId: body.itemId,
            customerId: body.customerId,
            date: new Date(body.date),
            qty: body.qty,
            totalPrice: body.totalPrice,
            discount: body.discount,
            priceAfterDiscount: body.priceAfterDiscount
        });

        const item = await Item.findOne({
            where: { id: transaction.itemId }
        });

        const customer = await Customer.findOne({
            where: { id: transaction.customerId }
        });

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            id: transaction.id,
            itemId: transaction.itemId,
            itemName: item.name,
            customerId: transaction.customerId,
            customerName: customer.name,
            date: transaction.date,
            qty: transaction.qty,
            totalPrice: transaction.totalPrice,
            discount: transaction.discount,
            priceAfterDiscount: transaction.priceAfterDiscount
        }));
    }
}