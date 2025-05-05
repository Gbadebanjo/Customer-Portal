'use strict';
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from '@/db_connection';
import { SupportQueryConstants } from "@/utils/constants";

class SupportQuery extends Model {
  static associate(models) {
    // define association here
  }
}

SupportQuery.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      len: [SupportQueryConstants.TitleMinLength, SupportQueryConstants.TitleMaxLength],
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      len: [SupportQueryConstants.DescriptionMinLength, SupportQueryConstants.DescriptionMaxLength],
    },
  },
  support_query_messages: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
    defaultValue: null,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize: sequelizeConnection,
  createdAt: "created_at",
  updatedAt: "updated_at",
  tableName: 'support_queries',
  modelName: 'SupportQuery',
  underscored: true
});

export default SupportQuery;