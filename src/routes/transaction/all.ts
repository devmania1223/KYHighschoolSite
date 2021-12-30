import { Transaction, Item, Customer } from "server/model";
import type { Request } from "polka";
import type { ServerResponse as Response } from "http";
import * as session from "server/session";

export async function get(req: Request, res: Response) {
    if (session.check(req, res)) {
        const transactions = await Transaction.findAll();

        const response = [];
        for (const transaction of transactions) {
            const item = await Item.findOne({
                where: { id: transaction.itemId }
            });

            const customer = await Customer.findOne({
                where: { id: transaction.customerId }
            });

            response.push({
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
            });
        }

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response));
    }
}