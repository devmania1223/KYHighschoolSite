require("dotenv").config();

import sirv from "sirv";
import compression from "compression";
import * as sapper from "@sapper/server";
import { json } from "body-parser";
import polka, { IOptions } from "polka";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const options: IOptions = {
    onError: err => {
        console.log("error", err);
    }
};

polka(options)
    .use(
        json(),
        compression({ threshold: 0 }) as any,
        sirv("static", { dev }),
        sapper.middleware())
    .listen(PORT);
