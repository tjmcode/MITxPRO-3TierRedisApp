// #region  H E A D E R
// <copyright file="index.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    JS for the 'Holy Grail' 3-Tier App
 *      Module:   SERVER Entry JS (MicroCODE:index.JS)
 *      Project:  MITxPRO-WEEK25
 *      Customer: MIT
 *      Creator:  MicroCODE Incorporated
 *      Date:     August 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the entry level JS for the SERVER side of the 'Holy Grail' 3-Tier App.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Style Guide
 *         https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
 *
 *      2. AirBnB JavaScript Style Guide
 *         https://github.com/airbnb/javascript
 *
 *      3. Turing School Style Guide
 *         https://github.com/turingschool-examples/javascript/tree/main/es5
 *
 *      4. MDN Web Docs - JavaScript Classes
 *         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 *
 *      5. JSDoc - How to properly document JavaScript Code.
 *         https://
 *
 *      6. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  16-Aug-2022   TJM-MCODE  {0001}    New module for the 'Holy Grail' 3-Tier App.
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

const APP_PORT = 3000;

// #endregion

// #region  P R I V A T E   F I E L D S

// create an Express instance
var express = require("express");
var app = express();
var appPort = APP_PORT;

// create a Redis client
var redis = require("redis");
const {reply_to_object} = require("redis/lib/utils");
var client = redis.createClient();

/* -- development test code

// initialize values for: header, left, right, article and footer using the redis client
client.set("header", 1);
client.set("footer", 2);
client.set("left", 3);
client.set("right", 4);
client.set("article", 5);

// read back
client.get("header", (err, reply) => console.log("header = " + reply));
client.get("footer", (err, reply) => console.log("footer = " + reply));
client.get("left", (err, reply) => console.log("left = " + reply));
client.get("right", (err, reply) => console.log("right = " + reply));
client.get("article", (err, reply) => console.log("article = " + reply));

*/

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

// #endregion

// #region  M E T H O D S – P R I V A T E

/**
 * _getAppData() – gets values for holy grail layout.
 *
 * @api private
 *
 */
function _getAppData()
{
    // using Promises, get the values for header, left, right, article and footer from Redis
    return new Promise((resolve, reject) =>
    {
        client.mget(['header', 'footer', 'left', 'right', 'article'],
            function (err, value)
            {
                const appData = {
                    'header': Number(value[0]),
                    'footer': Number(value[1]),
                    'left': Number(value[2]),
                    'right': Number(value[3]),
                    'article': Number(value[4])
                };
                err ? reject(null) : resolve(appData);
            }
        );
    });
}

// #endregion

// serve static files from public directory
app.use(express.static("public"));

// update key data
app.get("/update/:key/:value", function (req, res)
{
    const key = req.params.key;
    let value = Number(req.params.value);

    // use the redis client to update the value associated with the given key
    client.set(key, value);

    // return data to client as JSON object
    _getAppData()
        .then((appData) =>
        {
            console.log(appData);
            res.send(appData);
        });
});

// get key data
app.get("/data", function (req, res)
{
    // return data to client as JSON object
    _getAppData()
        .then((appData) =>
        {
            console.log(appData);
            res.send(appData);
        });
});

app.listen(appPort, () =>
{
    console.log(`Running on Port:${appPort}`);
});

process.on("exit", function ()
{
    client.quit();
});

// #region  M E T H O D - E X P O R T S

// #endregion

// #endregion
// #endregion