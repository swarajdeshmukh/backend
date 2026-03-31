"use strict";
// Basic Types
// Primitve types (number, string, boolean)
// .Arrays
// .Tuples
// .Enums
// .Any, unknown, void, null, undefine, never
Object.defineProperty(exports, "__esModule", { value: true });
// Primitve and refrence
// [] {} () // refrence
// Example of tuple when we now fix element are going to be in array then use tuple
// let arr: [string, number] = ["Swaraj", 24]
// Enumaration
// enum userRole{
//     ADMIN = "admin",
//     GUEST = "guest",
//     SUPER_ADMIN = "super_admin"
// }
// userRole.ADMIN
// enum statusCode{
//     ABANDONED = 500,
//     NOTFOUND = 404,
//     CONFLITS = 409,
//     CREATED = 201,
//     SUCCESS = 200,
// }
// statusCode.SUCCESS
// If function is not returing any thing then use void
// function abc(): void {
// }
// If function is returing any thing then use specific type what it is returing
// function xyz(): number {
//     return 20;
// }
// if we have to set null
// let a: string | number | null;
// a = "swaraj";
// a = 12;
// a = null;
// a = true; // not allowed
// Type inference
// understanding type inference
// type annotaions
// let a = 12; // if we declare and initilize variable and does not provided any type then it is called type inference
// type annotaions
// let a: number = 10;
// function sum(a: number, b: number): number{
//     return a + b;
// }
/**
 * Interface and type Aliases
 * Define interfaces
 * Using interfaces to define object shapes
 * Extending interfaces
 * Type aliases
 * Intersection types
 */
// interface user {
//   name: string;
//   age: number;
//   password: string;
//   gender?: string;
// }
// function createUser(obj: user) {}
// createUser({ name: "Swaraj", age: 23, password: "12345" });
// interface User{
//     name: string,
//     email: string,
//     password: string
// }
// interface Admin extends User{
//     admin: boolean;
// }
// function userRole(obj: Admin) {
//     obj.
// }
// If we create two interfaces with same name so they both will merge and become one interface
// interface Abcd{
//     name: string
// }
// interface Abcd{
//     email: string
// }
// function rad(obj: Abcd) {
//     obj.
// }
// By using type key word we can specifiy a new type
// type value = string | number | null;
// let a: value;
//# sourceMappingURL=app.js.map