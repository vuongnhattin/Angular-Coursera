import { Type } from "@angular/core";

export interface Modal {
    header: string;
    body: Type<unknown>;
}