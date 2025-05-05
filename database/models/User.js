'use strict';
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from '@/db_connection';

class User extends Model {
  static associate(models) {
    // define association here
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ammp_api_key: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
    defaultValue: null,
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  is_locked_out: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  not_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  email_confirmed: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_external: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  creation_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  modification_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize: sequelizeConnection,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: 'users',
  modelName: 'User',
  underscored: true
});

export default User;
