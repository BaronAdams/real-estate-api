import { Table, Column, Model, DataType, PrimaryKey, Default, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';
import User from '../user/user.model';
import { Optional } from 'sequelize';
import AgencyUser from '../agencyuser/agencyuser.model';
import Subscription from '../subscription/subscription.model';
import Invitation from '../invitation/invitation.model';

// Interfaces de type
export interface IAgencyAttributes {
  id: string;
  name: string;
  email: string;
  ownerId: string;
  subscriptionId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAgencyCreationAttributes extends Optional<IAgencyAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({
  tableName: 'agencies',
  timestamps: true,
})
class Agency extends Model<IAgencyAttributes, IAgencyCreationAttributes> implements IAgencyAttributes {
  @PrimaryKey
  @Default(() => createId())
  @Column(DataType.STRING)
  public id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public email!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public ownerId!: string;

  @ForeignKey(() => Subscription)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public subscriptionId!: string;

  @CreatedAt
  @Default(() => new Date())
  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  public readonly updatedAt!: Date;

  // Associations
  @BelongsTo(() => Subscription, { foreignKey: 'subscriptionId' })
  subscription!: Subscription;

  @BelongsTo(() => User, { foreignKey: 'ownerId' })
  owner!: User;

  @HasMany(() => AgencyUser, 'agencyId')
  agencyUsers!: AgencyUser[];

  @HasMany(() => Invitation, 'agencyId')
  invitations!: Invitation[];
}


export default Agency;
