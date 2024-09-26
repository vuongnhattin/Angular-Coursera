import { Material } from "./material.model";

export interface ModuleDetail {
    id: number;
    name: string;
    courseId: number;
    materials: Material[];
}