import { UserStore } from '../models/user'

const store = new UserStore()

describe("user Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have a create method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have a update method', () => {
        expect(store.index).toBeDefined()
    })

    it('should have a delete method', () => {
        expect(store.index).toBeDefined()
    })

    it('create method should add a user', async () => {
        const result = await store.create({
            username:"test",
            firstName:"firstname",
            lastName:"lastName",
            password:"123456"
        })
        expect(result).toEqual({
            username:"test",
            firstName:"firstname",
            lastName:"lastName",
            password:"123456"
        })
    })

    it('index method should return a list of users', async () => {
        const result = await store.index()
        expect(result).toEqual([{
            username:"test",
            firstName:"firstname",
            lastName:"lastName",
            password:"123456"
        }])
    })

    it('show method should return the correct user', async () => {
        const result = await store.show("1")
        expect(result).toEqual({
            username:"test",
            firstName:"firstname",
            lastName:"lastName",
            password:"123456"
        })
    })

    it('delete method should remove the user', async () => {
        store.delete("1")
        const result = await store.index()

        expect(result).toEqual([])
    })
})