const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

beforeAll(async () => {
  try {
    let dataUser = require('../data/user.json')

    const user = await User.create(dataUser[0])

    token = signToken({ id: user.id });

    // console.log(token, ",<<<< ini toket");
  } catch (error) {
    console.log(error);
  }
});

describe("POST /add-user", () => {
  //Berhasil register
  test("add-user on success", async () => {
    const dataDummy = {
      username: "Habib Jafar",
      email: "jafar@mail.com",
      password: "pdi123",
      phoneNumber: "081247526865",
      address: "Jakarta",
    };

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send(dataDummy);

    //   console.log(res.body, "<<<<<<<<");
    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.newUser).toHaveProperty("email", dataDummy.email);
  });

  // email null
  test("throw error email null", async () => {
    const dataDummy = {
      password: "user1",
      phoneNumber: "08127755474",
      address: "Bali",
    };

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Email tidak boleh kosong");
  });

  // password null
  test("throw error password null", async () => {
    const dataDummy = {
      email: "rizqi@gmail.com",
      phoneNumber: "08127563755",
      address: "Depok",
    };

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Password tidak boleh kosong");
  });

  // email empty
  test("throw error email empty", async () => {
    const dataDummy = {
      email: "",
      password: "user1",
      phoneNumber: "081256275843",
      address: "Depok",
    };

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Email tidak boleh kosong");
  });

  // password empty
  test("throw error password empty", async () => {
    const dataDummy = {
      email: "adam4@mail.com",
      password: "",
      phoneNumber: "081256275843",
      address: "Depok",
    };

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Password tidak boleh kosong");
  });

  // unique email
  test("throw email already done", async () => {
    const dataDummy = {
      email: "jarganjar@gmail.com",
      password: "pdi123",
      phoneNumber: "08175725864",
      address: "Depok",
    };

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Email udah terdaftar brow");
  });

  // email format
  test("throw email is not format email", async () => {
    const dataDummy = {
      email: "adam",
      password: "user1",
      phoneNumber: "08175725864",
      address: "Depok",
    };

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${token}`)
      .send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty(
      "message",
      "Harus menggunakan format Email"
    );
  });

  // admin isnt login yet
  test("throw failed regist staff", async () => {
    const dataDummy = {
      email: "adam1@gmail.com",
      password: "user2",
      phoneNumber: "08175725864",
      address: "Depok",
    };

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", null)
      .send(dataDummy);

    expect(res.status).toBe(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Invalid Token");
  });

  // wrong token / invalid
  test("throw failed regist staff bcs token invalid", async () => {
    const dataDummy = {
      email: "adam1@gmail.com",
      password: "user2",
      phoneNumber: "08175725864",
      address: "Depok",
    };
    const wrongToken = "hihsihwuhatafashfahugahg";

    const res = await request(app)
      .post("/add-user")
      .set("Authorization", wrongToken)
      .send(dataDummy);

    expect(res.status).toBe(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Invalid Token");
  });
});

describe("POST /login", () => {
  //Berhasil login
  test("success login", async () => {
    const dataDummy = {
      email: "jarganjar@gmail.com",
      password: "pdi123",
    };

    const res = await request(app).post("/login").send(dataDummy);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Success Login");
  });

  //Email tidak diberikan / tidak diinput
  test("throw error email null", async () => {
    const dataDummy = {
      password: "user1",
    };

    const res = await request(app).post("/login").send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Email cannot be Empty");
  });

  //Password tidak diberikan / tidak diinput
  test("throw error password null", async () => {
    const dataDummy = {
      email: "adam@gmail.com",
    };

    const res = await request(app).post("/login").send(dataDummy);

    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Password cannot be Empty");
  });

  //Email diberikan invalid / tidak terdaftar
  test("throw error invalid email", async () => {
    const dataDummy = {
      email: "adam",
      password: "user1",
    };

    const res = await request(app).post("/login").send(dataDummy);

    expect(res.status).toBe(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Invalid Email/Password");
  });

  //Password diberikan salah / tidak match
  test("throw error invalid password", async () => {
    const dataDummy = {
      email: "adam@gmail.com",
      password: "user123",
    };

    const res = await request(app).post("/login").send(dataDummy);

    expect(res.status).toBe(401);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("message", "Invalid Email/Password");
  });

  afterAll(async () => {
    try {
      await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    } catch (error) {
      console.log(error);
    }
  });
});



