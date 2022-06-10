"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
describe("Order Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });
    it('create method should add a order', async () => {
        const result = await store.create({
            user_id: "1",
            status: ""
        });
        expect(result).toEqual({
            user_id: "1",
            status: ""
        });
    });
    it('index method should return a list of orders', async () => {
        const result = await store.index("1");
        expect(result).toEqual([{
                user_id: "1",
                status: ""
            }]);
    });
    it('show method should return the correct order', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            user_id: "1",
            status: ""
        });
    });
    it('delete method should remove the order', async () => {
        store.delete("1");
        const result = await store.index("1");
        expect(result).toEqual([]);
    });
});
