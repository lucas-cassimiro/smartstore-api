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

// src/routes/productsRoutes.ts
var productsRoutes_exports = {};
__export(productsRoutes_exports, {
  default: () => productsRoutes_default
});
module.exports = __toCommonJS(productsRoutes_exports);
var import_express = require("express");

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/utils/product/productUtils.ts
async function findByEAN(nameSearch) {
  return await clientPrisma_default.product.findFirst({
    where: {
      ean: {
        equals: nameSearch
      }
    }
  });
}

// src/app/controllers/ProductsController.ts
var ProductController = class {
  async index(_req, res) {
    try {
      const products = await clientPrisma_default.product.findMany({
        include: {
          categories: true,
          colors: true,
          storages: true
        }
      });
      return res.json(products);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar os produtos." });
    }
  }
  async show(req, res) {
    const param = req.params.param;
    try {
      if (param === "blackfriday") {
        const products = await clientPrisma_default.product.findMany({
          include: {
            colors: true,
            storages: true,
            categories: true
          },
          where: {
            black_friday: true
          }
        });
        return res.status(200).send(products);
      }
      const numericParam = Number(param);
      if (!isNaN(numericParam)) {
        const id = Number(param);
        const product = await clientPrisma_default.product.findUnique({
          where: {
            id
          }
        });
        if (!product) {
          return res.status(404).send({ message: "Produto n\xE3o encontrado." });
        }
        const products = await clientPrisma_default.product.findMany({
          include: {
            colors: true,
            storages: true,
            categories: true
          },
          where: {
            id
          }
        });
        return res.status(200).send(products);
      } else {
        const products = await clientPrisma_default.product.findMany({
          include: {
            colors: true,
            storages: true,
            categories: true
          },
          where: {
            categories: {
              name: {
                equals: param,
                mode: "insensitive"
              }
            }
          }
        });
        if (products.length === 0) {
          return res.status(404).send({ message: "Categoria n\xE3o encontrada." });
        }
        return res.status(200).send(products);
      }
    } catch (error) {
      return res.status(500).send({ message: "Falha na consulta de produtos." });
    }
  }
  async create(req, res) {
    const {
      name,
      price,
      black_friday,
      discount,
      average_score,
      description,
      color_id,
      storage_id,
      categorie_id,
      quantity,
      status,
      purchase_price,
      expiry_date,
      ean,
      highlight,
      black_friday_offer
    } = req.body;
    const isBlackFriday = black_friday === "true";
    const isHighlight = highlight === "true";
    const isBlackFridayOffer = black_friday_offer === "true";
    const storageIdValue = storage_id === "0" ? null : parseInt(storage_id);
    const expiryDate = expiry_date ? new Date(expiry_date) : void 0;
    const image = req.file?.filename;
    try {
      const productWithSameEAN = await findByEAN(ean);
      if (productWithSameEAN) {
        const existentInStock = await clientPrisma_default.stock.findMany({
          where: {
            product_id: productWithSameEAN.id
          }
        });
        await clientPrisma_default.stock.update({
          where: {
            id: existentInStock[0].id
          },
          data: {
            quantity: existentInStock[0].quantity + Number(quantity),
            purchase_price,
            updated_at: /* @__PURE__ */ new Date()
          }
        });
        return res.status(200).send({
          message: "Produto j\xE1 existente na base de dados. Quantidade atualizada."
        });
      } else {
        const createdProductandStock = await clientPrisma_default.$transaction(
          async (prisma2) => {
            const createdProduct = await prisma2.product.create({
              data: {
                name,
                price: Number(price),
                black_friday: isBlackFriday,
                image,
                discount: Number(discount),
                average_score,
                description,
                color_id: Number(color_id),
                storage_id: storageIdValue,
                categorie_id: Number(categorie_id),
                ean,
                highlight: isHighlight,
                black_friday_offer: isBlackFridayOffer
              }
            });
            const product_id = createdProduct.id;
            const createdStock = await prisma2.stock.create({
              data: {
                product_id,
                status,
                purchase_price,
                expiry_date: expiryDate,
                created_at: /* @__PURE__ */ new Date(),
                updated_at: /* @__PURE__ */ new Date(),
                quantity: Number(quantity)
              }
            });
            return { createdProduct, createdStock };
          }
        );
        if (createdProductandStock) {
          return res.status(201).send({ message: "Novo produto cadastrado." });
        } else {
          return res.status(500).send({ error: "Falha ao criar o produto ou o estoque." });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Falha ao cadastrar produto." });
    }
  }
  async destroy(req, res) {
    const id = Number(req.params.id);
    try {
      const productExistent = await clientPrisma_default.product.findUnique({
        where: {
          id
        }
      });
      if (!productExistent) {
        return res.status(400).send({ message: "Produto n\xE3o consta na base de dados." });
      }
      const product_id = productExistent.id;
      const deleteProductInStock = clientPrisma_default.stock.deleteMany({
        where: {
          product_id
        }
      });
      const deleteProductInProduct = clientPrisma_default.product.delete({
        where: {
          id: product_id
        }
      });
      const deletedFromStockAndProduct = await clientPrisma_default.$transaction([
        deleteProductInStock,
        deleteProductInProduct
      ]);
      if (deletedFromStockAndProduct) {
        return res.status(200).send({ message: "Produto deletado com sucesso." });
      } else {
        return res.status(404).send({ message: "Falha ao deletar produto." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel remover o produto." });
    }
  }
  async update(req, res) {
    const id = Number(req.params.id);
    console.log(id);
    const updatedFields = req.body;
    console.log(updatedFields);
    const productExistentInDatabase = await clientPrisma_default.product.findUnique({
      where: {
        id
      }
    });
    if (!productExistentInDatabase) {
      return res.status(404).send({ message: "Produto n\xE3o existe na base de dados." });
    }
    try {
      await clientPrisma_default.product.update({
        where: {
          id
        },
        data: {
          ...updatedFields
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Erro ao atualizar produto." });
    }
    return res.status(200).send({ message: "Produto alterado na base de dados." });
  }
};

// src/middlewares/multer.ts
var import_multer = __toESM(require("multer"), 1);
var storage = import_multer.default.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./tmp/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = (0, import_multer.default)({ storage });
var multer_default = upload;

// src/routes/productsRoutes.ts
var productsRoutes = (0, import_express.Router)();
productsRoutes.get("/", new ProductController().index);
productsRoutes.get("/:param", new ProductController().show);
productsRoutes.post("/", multer_default.single("file"), new ProductController().create);
productsRoutes.put("/:id", new ProductController().update);
productsRoutes.delete("/:id", new ProductController().destroy);
var productsRoutes_default = productsRoutes;
