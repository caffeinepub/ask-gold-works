import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export type Contact = {
    __kind__: "read";
    read: {
        id: string;
        name: string;
        createdAt: Time;
        email: string;
        message: string;
        phone: string;
    };
} | {
    __kind__: "unread";
    unread: {
        id: string;
        name: string;
        createdAt: Time;
        email: string;
        message: string;
        phone: string;
    };
};
export type Booking = {
    __kind__: "pending";
    pending: {
        id: string;
        service: string;
        name: string;
        createdAt: Time;
        email: string;
        preferredDate: string;
        notes: string;
        preferredTime: string;
        phone: string;
    };
};
export interface Product {
    id: string;
    name: string;
    createdAt: Time;
    description: string;
    imageId?: ExternalBlob;
    price?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, imageId: ExternalBlob | null, price: string | null): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBooking(id: string): Promise<void>;
    deleteContact(id: string): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(id: string): Promise<Product>;
    isCallerAdmin(): Promise<boolean>;
    listBookings(): Promise<Array<Booking>>;
    listContacts(): Promise<Array<Contact>>;
    listProducts(): Promise<Array<Product>>;
    markContactAsRead(id: string): Promise<void>;
    submitBooking(name: string, email: string, phone: string, preferredDate: string, preferredTime: string, service: string, notes: string): Promise<boolean>;
    submitContact(name: string, email: string, phone: string, message: string): Promise<boolean>;
    updateProduct(id: string, name: string, description: string, imageId: ExternalBlob | null, price: string | null): Promise<void>;
}
