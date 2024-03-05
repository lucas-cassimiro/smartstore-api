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

// src/routes/userRoutes.ts
var userRoutes_exports = {};
__export(userRoutes_exports, {
  default: () => userRoutes_default
});
module.exports = __toCommonJS(userRoutes_exports);
var import_express = require("express");

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/app/controllers/UsersController.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var UserController = class {
  async index(_req, res) {
    try {
      const users = await clientPrisma_default.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar usu\xE1rios." });
    }
  }
  async create(req, res) {
    try {
      const {
        email,
        password_hash,
        cpf,
        cellphone,
        first_name,
        last_name,
        date_birth
      } = req.body;
      const user = await clientPrisma_default.user.findUnique({
        where: {
          email
        }
      });
      if (user) {
        return res.status(404).json({ message: "E-mail j\xE1 cadastrado." });
      }
      const newUser = {
        email,
        password_hash,
        cpf,
        cellphone,
        first_name,
        last_name,
        date_birth: new Date(date_birth),
        admin_auth: Boolean(false),
        created_at: /* @__PURE__ */ new Date(),
        last_login: /* @__PURE__ */ new Date()
      };
      const hash = import_bcrypt.default.hashSync(newUser.password_hash, 10);
      newUser.password_hash = hash;
      await clientPrisma_default.user.create({
        data: newUser
      });
      return res.status(201).json({ message: "Usu\xE1rio criado com sucesso!" });
    } catch (error) {
      return res.status(500).send({ message: "Erro ao criar usu\xE1rio." });
    }
  }
  async update(req, res) {
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
        return res.status(401).send({
          message: "Este e-mail n\xE3o est\xE1 cadastrado. Clique em Inscrever-se e fa\xE7a seu cadastro."
        });
      const verifyPass = await import_bcrypt.default.compare(
        password_hash,
        findUser.password_hash
      );
      if (!verifyPass) {
        return res.status(401).send({ message: "Usu\xE1rio ou senha incorretos." });
      }
      const token = import_jsonwebtoken.default.sign({ data: findUser }, process.env.JWT_PASS ?? "", {
        expiresIn: "8h"
      });
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
  async getProfile(req, res) {
    return res.json(req.user);
  }
};

// src/middlewares/auth.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);
var authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: "N\xE3o autorizado." });
    }
    const token = authorization.split(" ")[1];
    const { id } = import_jsonwebtoken2.default.verify(token, process.env.JWT_PASS ?? "").data;
    const findUser = await clientPrisma_default.user.findUnique({
      where: {
        id
      }
    });
    if (!findUser) {
      return res.status(401).send({ message: "N\xE3o autorizado." });
    }
    const { password_hash: _, ...loggedUser } = findUser;
    req.user = loggedUser;
    next();
  } catch (error) {
    return res.status(500).send({ message: "N\xE3o autorizado." });
  }
};

// src/routes/userRoutes.ts
var usersRoutes = (0, import_express.Router)();
usersRoutes.get("/", new UserController().index);
usersRoutes.get("/profile", authMiddleware, new UserController().getProfile);
usersRoutes.post("/", new UserController().create);
usersRoutes.post("/login", new UserController().login);
usersRoutes.put("/:id", new UserController().update);
var userRoutes_default = usersRoutes;
