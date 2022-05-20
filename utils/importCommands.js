/* const { duck } = require("../commands/duck");
const { help } = require("../commands/help");
const { test } = require("../commands/test");
const { pp } = require("../commands/pp");
const { meteo } = require("../commands/meteo");
const { gif } = require("../commands/gif");
const { fakeToken, fakeTokenLog } = require("../commands/token");
const { clearchannel } = require("../commands/clearchannel"); */

import  duck  from "../commands/duck.js";
import  help  from "../commands/help.js";
import  test  from "../commands/test.js";
import  {pp}  from "../commands/pp.js";
import  meteo  from "../commands/meteo.js";
import  {gif}  from "../commands/gif.js";
import  * as token from "../commands/token.js";
import  {clearchannel}  from "../commands/clearchannel.mjs";
import {mute}  from "../commands/mute.js";

export default {duck, help, test, pp, meteo, gif, token, clearchannel, mute};
