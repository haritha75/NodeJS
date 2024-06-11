// file name lib.test.js means we are testing the lib file

const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("should return a positive number if number is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1); // here we are matching function is correct or not
  });
  it("should return a positive number if number is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1); // here we are matching function is correct or not
  });
  it("should return 0 if number is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0); // here we are matching function is correct or not
  });
});

// when we use string test match or contains  i check the given value is therir or not if you use toBe it check total matching are not
describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/);
    expect(result).toContain("Mosh");
  });
});
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    // Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    // Too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    // Proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");
    // ideal way
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});
describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    // expect(result).toBe({id:1,price:10}); //it will check reference of the object not content
    // expect(result).toEqual({id:1,price:10}); //it will check content but if you have more object it will give error
    expect(result).toMatchObject({ id: 1, price: 10 }); //it will check content and also accept many object
    expect(result).toHaveProperty("id", 1); // it check particular type of value especially
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});
describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // db.getCustomerSync = function (customerId) {
    //   return { email: "a" };
    // };
    // let mailSent = false;
    // mail.send = function (email, message) {
    //   mailSent = true;
    // };

    // we can write above more accurately

    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
