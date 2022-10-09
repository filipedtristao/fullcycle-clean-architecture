import { Model, Table, PrimaryKey, Column, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'customers',
    timestamps: false
})
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare street: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare number: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare city: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare state: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare zip: string;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare rewardPoints: number;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    declare active: boolean;
}