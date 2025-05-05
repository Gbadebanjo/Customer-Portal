'use strict';
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from '@/db_connection';

class SupportQueryMessage extends Model {
  static associate(models) {
    // define association here
  }
}

SupportQueryMessage.init({
  message: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  support_query_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  sequelize: sequelizeConnection,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: 'support_query_messages',
  modelName: 'SupportQueryMessage',
  underscored: true
});

export default SupportQueryMessage;
