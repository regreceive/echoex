import DataType from 'sequelize';
import Model from '../sequelize';

const UserRaised = Model.define('UserRaised', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataType.INTEGER,
    defaultValue: null,
  },

  address: {
    type: DataType.CHAR(42),
  },

  block_number: {
    type: DataType.INTEGER.UNSIGNED,
  },

  block_hash: {
    type: DataType.CHAR(66),
  },

  transaction_hash: {
    type: DataType.CHAR(66),
    unique: true,
  },

  amount: {
    type: DataType.DECIMAL(30, 18),
  },

  status: {
    type: DataType.TINYINT,
    defaultValue: 0,
  },
});

UserRaised.insertNewRecord = async (
  userId,
  address,
  block_number,
  block_hash,
  transaction_hash,
  amount,
  status,
) =>
  Model.query(
    'INSERT INTO `UserRaised` (userId, address, block_number, block_hash, transaction_hash, amount,status,`createdAt`,`updatedAt`) ' +
      'values(:userId, :address, :block_number, :block_hash, :transaction_hash,:amount,:status,:date,:date) ' +
      'ON DUPLICATE KEY UPDATE userId=:userId,address=:address, block_number=:block_number, block_hash=:block_hash, transaction_hash=:transaction_hash, amount=:amount,status=:status,updatedAt=:date',
    {
      replacements: {
        userId,
        address,
        block_number,
        block_hash,
        transaction_hash,
        amount,
        status,
        date: new Date(),
      },
    },
  );

// UserRaised.sum = async()=>UserRaised.sum(
//   'amount',
//   'select sum(amount) as total_amount from `UserRaised` where `userId` IS NOT NULL AND `status`=1'
// );

export default UserRaised;
