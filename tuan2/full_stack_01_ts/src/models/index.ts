// src/models/index.ts
import fs from "fs";
import path from "path";
import { Sequelize, DataTypes, Model } from "sequelize";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

interface DBType {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db = {} as DBType;

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load tất cả model trong folder
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js") &&
      !file.endsWith(".test.ts") &&
      !file.endsWith(".test.js")
    );
  })
  .forEach((file) => {
    const modelImport = require(path.join(__dirname, file));
    const model = modelImport.default
      ? modelImport.default(sequelize, DataTypes)
      : modelImport(sequelize, DataTypes);
    db[model.name] = model;
  });

// Setup associations nếu có
Object.keys(db).forEach((modelName) => {
  const model = db[modelName] as any;
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
