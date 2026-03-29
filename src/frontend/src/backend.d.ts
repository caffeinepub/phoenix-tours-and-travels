import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Destination {
    country: string;
    name: string;
    rating: bigint;
    price: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Service {
    name: string;
    description: string;
}
export interface TourPackage {
    destination: string;
    duration: bigint;
    name: string;
    description: string;
    image: string;
    price: bigint;
}
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    addDestination(id: string, destination: Destination): Promise<void>;
    addService(id: string, service: Service): Promise<void>;
    addTourPackage(id: string, package: TourPackage): Promise<void>;
    getAllDestinations(): Promise<Array<Destination>>;
    getAllServices(): Promise<Array<Service>>;
    getAllTourPackages(): Promise<Array<TourPackage>>;
    getDestination(id: string): Promise<Destination | null>;
    getGoogleSheetsWebhook(): Promise<string | null>;
    getInquiries(): Promise<Array<Inquiry>>;
    getService(id: string): Promise<Service | null>;
    getTourPackage(id: string): Promise<TourPackage | null>;
    setGoogleSheetsWebhook(url: string): Promise<void>;
    submitInquiry(name: string, email: string, message: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
