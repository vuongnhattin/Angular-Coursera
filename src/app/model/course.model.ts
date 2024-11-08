export interface Course {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    member: boolean;
    admin: boolean;
    introduction: string;
    price: number;
}