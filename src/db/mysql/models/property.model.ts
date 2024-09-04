import { Model, DataTypes, Optional } from 'sequelize';
import { createId } from '@paralleldrive/cuid2';
import sequelize from '../config';
import User from './user.model';
import Agent from './agent.model';

export interface IPropertyAttributes {
    id: string;
    title: string;
    type: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
    status: 'for_sale' | 'for_rent';
    place: string;
    furnished?: boolean;
    price: number;
    priceFrequency?: "hourly" | "daily" | "weekly" | "monthly" | "yearly" ;
    sellerId?: string;
    agentId: string;
    area: number;
    description?: string;
    rooms?:{
        bedrooms: number;
        livingRooms: number;
        kitchens: number;
        bathrooms: number
    };
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPropertyCreationAttributes extends Optional<IPropertyAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Property extends Model<IPropertyAttributes, IPropertyCreationAttributes> implements IPropertyAttributes {
    public id!: string;
    public title!: string;
    public type!: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
    public status!: 'for_sale' | 'for_rent';
    public place!: string;
    public furnished?: boolean;
    public price!: number;
    public priceFrequency?: "hourly" | "daily" | "weekly" | "monthly" | "yearly" ;
    public sellerId?: string;
    public agentId!: string;
    public area!: number;
    public description?: string;
    public rooms?:{
        bedrooms: number;
        livingRooms: number;
        kitchens: number;
        bathrooms: number
    };
    public images!: string[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Property.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: () => createId(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('land', 'villa', 'banquet_hall', 'building', 'apartment', 'duplex'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('for_sale', 'for_rent'),
        allowNull: false,
    },
    place:{
        type: DataTypes.STRING,
        allowNull: true
    },
    furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    priceFrequency: {
        type: DataTypes.ENUM("hourly","daily","weekly","monthly","yearly"),
        allowNull: true,
        validate:{
            isValidPriceFrequency(value: any){
                if(this.status === "for_sale" && value){
                    throw new Error("La fréquence de prix n'est possible que pour les propriétés à louer")
                }
            }
        }
    },
    sellerId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id',
        }
    },
    agentId: {
        type: DataTypes.STRING,
        references: {
            model: Agent,
            key: 'id',
        },
        allowNull: false,
    },
    area:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    rooms:{
        type: DataTypes.JSON,
        allowNull: true,
        validate:{
            isRoomsRequired(value: any){
                if(this.type !== "land" && !value){
                    throw new Error("La précision du nombre de pièces ne sont pas possible pour des terrains")
                }
            }
        }
    },
    images:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Property',
    timestamps: true,
});

export default Property;