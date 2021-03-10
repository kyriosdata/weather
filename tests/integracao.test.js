const getJson = require("../src/networking");
const geocode = require("../src/geocode");
const temperatura = require("../src/temperatura");

test("callback", () => {
  getJson("https://reqbin.com/echo/get/json", (e, s) => {
    if (e) {
      throw new Error("falhou");
    } else {
      expect(s.success).toBe("true");
    }
  });
});

test("promise", () => {
  getJson("https://reqbin.com/echo/get/json")
    .then((s) => expect(s.success).toBe("true"))
    .catch(console.log);
});

test("goiania geocode", () => {
  geocode("goiania", (e, r) => {
    if (e) {
      throw new Error("erro na chamada");
    } else {
      expect(r.formatted_address).toBe("Goiânia, GO, Brasil");
    }
  });
});

test("goiania geocode promise", () => {
  geocode("goiania")
    .then((p) => expect(p.formatted_address).toBe("Goiânia, GO, Brasil"))
    .catch(console.log);
});

test("goiania temperatra promise", () => {
  geocode("goiania")
    .then(temperatura)
    .then((t) => expect(t.temperatura > 10).toBeTruthy())
    .catch((e) => {});
});
