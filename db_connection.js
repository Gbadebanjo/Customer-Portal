import {options} from '@/database/config/config.mjs'
import {Sequelize} from "sequelize";

import pg from "pg";

options.dialectModule = pg;

const sequelizeConnection = new Sequelize(options);

export default sequelizeConnection;