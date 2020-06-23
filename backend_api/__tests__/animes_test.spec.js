process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");


describe("CRUD Animes tests", () => {
    it("GET /api/v1/animes It should respond with an array of animes", async () => {
        const response = await request(app).get("/api/v1/animes");
        expect(response.body.length).toBe(14501);
    }, 9999); // todo optimize request to reduce time of the request

    it("Get animes with title", async () => {
        const animeTitle = 'Bleach';
        const response = await request(app).get("/api/v1/animes/" + animeTitle);
        expect(response.body.title).toBe('Bleach');
    })
});

describe('unit test', () => {
    it(' 1+1 should work', () => {
        let res = 1+1;
        expect(res).toBe(2);
    });
});
