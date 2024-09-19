import { Timestamp } from "rxjs";

export interface Course {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
}