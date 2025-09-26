import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Exclude() // 👈 1. Exclua a classe inteira por padrão
@Entity('users')
class User {
    @Expose() // 👈 2. Exponha explicitamente CADA campo que você quer mostrar
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Expose()
    @Column()
    name: string;

    @Column()
    password: string; // Fica excluído por padrão

    @Column()
    avatar: string; // Fica excluído por padrão

    @Expose()
    @Column()
    email: string;

    @Expose()
    @CreateDateColumn()
    created_at: Date;

    @Expose()
    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    get avatar_url(): string | null {
        if (!this.avatar) {
            return null;
        }
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
}

export default User;