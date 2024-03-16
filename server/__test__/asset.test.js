const request = require("supertest");
const app = require("../app");
const { User, Asset } = require("../models");
const { signToken } = require("../helpers/jwt");

beforeAll(async () => {
    try {
        const dataUser = require("../data/user.json");
        const dataAsset = require("../data/asset.json");

        const user = await User.create(dataUser[0]);
        token = signToken({ id: user.id });

        console.log(user, "<<<< ini data user");
        await Asset.create(dataAsset[0]);
    } catch (error) {
        console.log(error);
    }
});

describe("POST /asset", () => {
    //Berhasil membuat entitas utama
    test("add data asset success", async () => {
        const dataDummy = {
            id: 99,
            name: "Triangulum",
            desc: "The Triangulum Galaxy is a spiral galaxy 2.73 million light-years from Earth in the constellation Triangulum. It is catalogued as Messier 33 or NGC 598.",
            dateFound: "1764",
            userId: 1
        };

        const res = await request(app)
            .post("/asset")
            .set("Authorization", `Bearer ${token}`)
            .send(dataDummy);

        const assets = res.body.assets;

        // console.log(res.body, "<<<< post asset");

        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.assets).toHaveProperty("id", expect.any(Number));
        expect(res.body.assets).toHaveProperty("name", assets.name);
        expect(res.body.assets).toHaveProperty(
            "desc",
            assets.desc
        );
        expect(res.body.assets).toHaveProperty("dateFound", assets.dateFound);
        expect(res.body.assets).toHaveProperty("userId", assets.userId);
    });

    test("invalid because not login", async () => {
        const res = await request(app).post("/asset");

        expect(res.status).toBe(401);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Invalid Token");
    });
});

describe("GET /asset", () => {
    //Berhasil mendapatkan data Entitas Utama
    test("show all data asset", async () => {
        const res = await request(app).get("/asset").set("Authorization", `Bearer ${token}`);

        const Asset = res.body[0];

        console.log(Asset, "<<<<<< ini res body");

        expect(res.status).toBe(200);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0]).toHaveProperty("id", expect.any(Number));
        expect(res.body[0]).toHaveProperty("name", Asset.name);
        expect(res.body[0]).toHaveProperty("desc", Asset.desc);
        expect(res.body[0]).toHaveProperty("dateFound", Asset.dateFound);
        expect(res.body[0]).toHaveProperty("userId", Asset.userId);
    });

});

describe("PUT /asset/:id", () => {
    //
    test("edit data asset success by id", async () => {
        const dataDummy = {
            name: "Triangulum",
            desc: "The Triangulum Galaxy is a spiral galaxy 2.73 million light-years from Earth in the constellation Triangulum. It is catalogued as Messier 33 or NGC 598.",
            dateFound: "1764",
            userId: 1
        };

        const res = await request(app)
            .put("/asset/1")
            .set("Authorization", `Bearer ${token}`)
            .send(dataDummy);

        const assets = res.body;

        // console.log(assets, "<<<<<<<<<<<< ini res body");

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("id", expect.any(Number));
        expect(res.body).toHaveProperty("name", assets.name);
        expect(res.body).toHaveProperty(
            "desc",
            assets.desc
        );
        expect(res.body).toHaveProperty("dateFound", assets.dateFound);
        expect(res.body).toHaveProperty("userId", assets.userId);

    });
});

afterAll(async () => {
    try {
        await User.destroy({ truncate: true, cascade: true, restartIdentify: true });
        await Asset.destroy({
            truncate: true,
            cascade: true,
            restartIdentify: true,
        });
    } catch (error) {
        console.log(error);
    }
});
