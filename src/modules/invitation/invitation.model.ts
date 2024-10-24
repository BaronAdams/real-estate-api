import { Model, Table, Column, DataType, Default, PrimaryKey, CreatedAt, UpdatedAt, BelongsTo, ForeignKey, IsUUID } from 'sequelize-typescript';
import { createId } from '@paralleldrive/cuid2';
import Agency from '../agency/agency.model';

export interface IInvitationAttributes {
  id: string;
  email: string;
  agencyId: string;
  role: 'agent' | 'admin'; // Role assigned to the invited member
  token: string; // Unique token for invitation
  status: 'pending' | 'accepted' | 'rejected' | 'expired'; // State of the invitation
  expiresAt: Date; // Expiration date for the invitation
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInvitationCreationAttributes extends Omit<IInvitationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'status'> {}

@Table({
  tableName: 'invitations',
  timestamps: true,
})
class Invitation extends Model<IInvitationAttributes, IInvitationCreationAttributes> implements IInvitationAttributes {
  @PrimaryKey
  @IsUUID(4)
  @Column({
    type:DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  public id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public email!: string;

  @ForeignKey(() => Agency)
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public agencyId!: string;

  @Column({
    type: DataType.ENUM('agent', 'admin'),
    allowNull: false,
  })
  public role!: 'agent' | 'admin';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public token!: string;

  @Default('pending')
  @Column({
    type: DataType.ENUM('pending', 'accepted', 'rejected', 'expired'),
    allowNull: false,
  })
  public status!: 'pending' | 'accepted' | 'rejected' | 'expired';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public expiresAt!: Date;

  @BelongsTo(() => Agency, 'agencyId')
  public agency!: Agency;
}

export default Invitation;

