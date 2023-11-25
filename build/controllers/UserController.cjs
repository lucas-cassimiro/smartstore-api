"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UserController_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/controllers/UserController.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var UserController = class {
  async getUsers(req, res) {
    const users = await clientPrisma_default.user.findMany({});
    res.json(users);
  }
  async create(req, res) {
    try {
      const { email } = req.body;
      const user = await clientPrisma_default.user.findUnique({
        where: {
          email
        }
      });
      if (user) {
        return res.status(404).json({ message: "Email j\xE1 cadastrado." });
      } else {
        const newUser = {
          ...req.body,
          admin_auth: Boolean(false),
          created_at: /* @__PURE__ */ new Date(),
          date_birth: new Date(req.body.date_birth)
        };
        const hash = import_bcrypt.default.hashSync(newUser.password_hash, 10);
        newUser.password_hash = hash;
        await clientPrisma_default.user.create({
          data: newUser
        });
        return res.status(201).json({ message: "Usu\xE1rio criado com sucesso!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro ao cadastrar usu\xE1rio" });
    }
  }
  async edit(req, res) {
    try {
      const id = Number(req.params.id);
      const { password_hash, newPassword, date_birth, cellphone } = req.body;
      const findUser = await clientPrisma_default.user.findUnique({
        where: {
          id
        }
      });
      if (!findUser) {
        return res.status(404).send({ message: "Usu\xE1rio n\xE3o existente na base de dados!" });
      }
      const verifyPass = await import_bcrypt.default.compare(
        password_hash,
        findUser.password_hash
      );
      if (!verifyPass) {
        return res.status(400).send({ message: "Senha atual inv\xE1lida." });
      }
      const hash = import_bcrypt.default.hashSync(newPassword, 10);
      findUser.password_hash = hash;
      await clientPrisma_default.user.update({
        where: {
          id
        },
        data: {
          password_hash: findUser.password_hash,
          date_birth: new Date(date_birth),
          cellphone
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro ao editar usu\xE1rio." });
    }
    return res.status(201).send({ message: "Dados alterados." });
  }
  async login(req, res) {
    try {
      const { email, password_hash } = req.body;
      const findUser = await clientPrisma_default.user.findUnique({
        where: {
          email
        }
      });
      if (!findUser)
        return res.status(400).send({ message: "E-mail ou senha inv\xE1lidos." });
      const verifyPass = await import_bcrypt.default.compare(
        password_hash,
        findUser.password_hash
      );
      console.log("verifyPass:", verifyPass);
      if (!verifyPass) {
        return res.status(400).send({ message: "E-mail ou senha inv\xE1lidos." });
      }
      const token = import_jsonwebtoken.default.sign({ data: findUser }, process.env.JWT_PASS ?? "", {
        expiresIn: "8h"
      });
      console.log(token);
      const { password_hash: _, ...userLogin } = findUser;
      return res.status(200).json({
        user: userLogin,
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Erro ao fazer login." });
    }
  }
  async profile(req, res) {
    return res.json(req.user);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
