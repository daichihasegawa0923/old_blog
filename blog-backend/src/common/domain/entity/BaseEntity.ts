import { ulid } from "ulid";

export abstract class BaseEntity {
    private _id: string;
    
    public get id() : string {
        return this._id
    }
    
    public set id(v : string) {
        this._id = v;
    }

    private _deleted: boolean;

    public get deleted(): boolean {
        return this._deleted;
    }

    public set deleted(v: boolean) {
        this._deleted = v;
    }

    protected init(): void {
        this.id = ulid();
        this.deleted = false;
    }

    public delete(): void {
        this.deleted = true;
    }

    public zaoric(): void {
        this.deleted = false;
    }
}