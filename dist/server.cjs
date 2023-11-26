"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    function log(message) {
      console.log(`[dotenv][DEBUG] ${message}`);
    }
    var NEWLINE = "\n";
    var RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
    var RE_NEWLINES = /\\n/g;
    var NEWLINES_MATCH = /\n|\r|\r\n/;
    function parse(src, options) {
      const debug = Boolean(options && options.debug);
      const obj = {};
      src.toString().split(NEWLINES_MATCH).forEach(function(line, idx) {
        const keyValueArr = line.match(RE_INI_KEY_VAL);
        if (keyValueArr != null) {
          const key = keyValueArr[1];
          let val = keyValueArr[2] || "";
          const end = val.length - 1;
          const isDoubleQuoted = val[0] === '"' && val[end] === '"';
          const isSingleQuoted = val[0] === "'" && val[end] === "'";
          if (isSingleQuoted || isDoubleQuoted) {
            val = val.substring(1, end);
            if (isDoubleQuoted) {
              val = val.replace(RE_NEWLINES, NEWLINE);
            }
          } else {
            val = val.trim();
          }
          obj[key] = val;
        } else if (debug) {
          log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
        }
      });
      return obj;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let debug = false;
      if (options) {
        if (options.path != null) {
          dotenvPath = options.path;
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
        if (options.debug != null) {
          debug = true;
        }
      }
      try {
        const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug });
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else if (debug) {
            log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
          }
        });
        return { parsed };
      } catch (e) {
        return { error: e };
      }
    }
    module2.exports.config = config;
    module2.exports.parse = parse;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module2) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    module2.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module2) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|debug)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/app.ts
var import_express2 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/routes.ts
var import_express = require("express");

// src/middlewares/multerProducts.ts
var import_multer = __toESM(require("multer"), 1);
var storage = import_multer.default.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/upload/images/product");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = (0, import_multer.default)({ storage });
var multerProducts_default = upload;

// src/middlewares/auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/middlewares/auth.ts
var authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log("autoriza\xE7\xE3o:", authorization);
    if (!authorization) {
      return res.status(401).send({ message: "N\xE3o autorizado" });
    }
    const token = authorization.split(" ")[1];
    console.log(token);
    const { id } = import_jsonwebtoken.default.verify(token, process.env.JWT_PASS ?? "").data;
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
    console.log("loggedUser:", loggedUser);
    console.log("reqUser:", req.user);
    next();
  } catch (error) {
    console.log("Erro ao decodificar o token:", error);
    return res.status(500).send({ message: "N\xE3o autorizado." });
  }
};

// src/app/controllers/AddressesController.ts
var AddressController = class {
  async show(req, res) {
    try {
      const id = Number(req.params.id);
      const findUser = await clientPrisma_default.user.findUnique({
        where: {
          id
        }
      });
      if (!findUser) {
        return res.status(404).send({ message: "Usu\xE1rio n\xE3o existe na base de dados." });
      }
      const address = await clientPrisma_default.address.findMany({
        where: {
          user_id: id
        }
      });
      return res.json(address);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel buscar o endere\xE7o." });
    }
  }
  async create(req, res) {
    const {
      user_id,
      street_address,
      number_address,
      complement,
      neighborhood,
      city,
      state,
      recipient
    } = req.body;
    try {
      await clientPrisma_default.address.create({
        data: {
          user_id,
          street_address,
          number_address: Number(number_address),
          complement,
          neighborhood,
          city,
          state,
          recipient
        }
      });
      return res.status(201).send({ message: "Novo endere\xE7o cadastrado na base de dados." });
    } catch (error) {
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel cadastrar um novo endere\xE7o." });
    }
  }
  // async update(req: Request, res: Response) {
  // }
};

// src/app/controllers/CategoriesController.ts
var CategorieController = class {
  async index(_req, res) {
    const categories = await clientPrisma_default.categorie.findMany();
    return res.json(categories);
  }
  async create(req, res) {
    const { name } = req.body;
    try {
      const categorieExistentInDatabase = await clientPrisma_default.categorie.findUnique({
        where: {
          name
        }
      });
      if (categorieExistentInDatabase) {
        return res.status(404).send({
          message: "Categoria de produtos j\xE1 existe na base de dados"
        });
      }
      await clientPrisma_default.categorie.create({
        data: {
          name
        }
      });
    } catch (error) {
      return res.status(404).send({ message: "Erro ao cadastrar nova categoria de produtos" });
    }
    return res.status(200).send({
      message: "Nova categoria de produtos cadastrada na base de dados"
    });
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body;
    try {
      const categorieExistentInDatabase = await clientPrisma_default.categorie.findUnique({
        where: {
          id
        }
      });
      if (!categorieExistentInDatabase) {
        return res.status(400).send({
          message: "Categoria de produto n\xE3o consta na base de dados "
        });
      }
      await clientPrisma_default.categorie.update({
        where: {
          id
        },
        data: {
          name
        }
      });
    } catch (error) {
      return res.status(404).send({
        message: "Falha ao cadastrar nova categoria na base de dados"
      });
    }
    return res.status(200).send({ message: "Categoria de produto alterada na base de dados " });
  }
};

// src/app/controllers/ColorsController.ts
var ColorController = class {
  async index(_req, res) {
    const colors = await clientPrisma_default.color.findMany();
    return res.json(colors);
  }
  async create(req, res) {
    const { name } = req.body;
    try {
      const colorExistentInDatabase = await clientPrisma_default.color.findFirst({
        where: {
          name
        }
      });
      if (colorExistentInDatabase) {
        return res.status(400).send({ message: "Cor j\xE1 existente na base de dados" });
      }
      await clientPrisma_default.color.create({
        data: {
          name
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao cadastrar nova cor " });
    }
    return res.status(200).send({ message: "Nova cor cadastrada na base de dados " });
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body;
    try {
      const colorExistentInDatabase = await clientPrisma_default.color.findUnique({
        where: {
          id
        }
      });
      if (!colorExistentInDatabase) {
        return res.status(400).send({ message: "Cor n\xE3o consta na base de dados " });
      }
      await clientPrisma_default.color.update({
        where: {
          id
        },
        data: {
          name
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao cadastrar nova cor" });
    }
    return res.status(200).send({ message: "Cor alterada na base de dados " });
  }
};

// src/app/controllers/OrderItemsController.ts
var OrderItemsController = class {
  async index(_req, res) {
    const orderItems = await clientPrisma_default.order_item.findMany({
      include: {
        products: true,
        orders: true
      }
    });
    return res.json(orderItems);
  }
};

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
    const products = await clientPrisma_default.product.findMany({
      include: {
        categories: true,
        colors: true,
        storages: true
      }
    });
    return res.json(products);
  }
  async show(req, res) {
    const param = req.params.param;
    try {
      const numericParam = Number(param);
      if (!isNaN(numericParam)) {
        const id = Number(param);
        const product = await clientPrisma_default.product.findUnique({
          where: {
            id
          }
        });
        if (!product) {
          return res.status(404).send({ message: "Produto n\xE3o encontrado" });
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
          return res.status(404).send({ message: "Categoria n\xE3o encontrada" });
        }
        return res.status(200).send(products);
      }
    } catch (error) {
      return res.status(500).send({ message: "Falha na consulta de produtos" });
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
      ean
    } = req.body;
    const img = req.file?.filename;
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
                price,
                image: img,
                black_friday,
                discount,
                average_score,
                description,
                color_id: Number(color_id),
                storage_id: Number(storage_id),
                categorie_id: Number(categorie_id),
                ean
              }
            });
            const product_id = createdProduct.id;
            const createdStock = await prisma2.stock.create({
              data: {
                product_id,
                status,
                purchase_price,
                expiry_date: expiry_date !== void 0 ? new Date(expiry_date) : void 0,
                created_at: /* @__PURE__ */ new Date(),
                updated_at: /* @__PURE__ */ new Date(),
                quantity: Number(quantity)
              }
            });
            return { createdProduct, createdStock };
          }
        );
        if (createdProductandStock) {
          return res.status(201).send({ message: "Novo produto cadastrado" });
        } else {
          return res.status(500).send({ error: "Falha ao criar o produto ou o estoque" });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Falha ao cadastrar produto" });
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
        return res.status(400).send({ message: "Produto n\xE3o consta na base de dados " });
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
        return res.status(200).send({ message: "Produto deletado com sucesso" });
      } else {
        return res.status(404).send({ message: "Falha ao deletar produto" });
      }
    } catch (error) {
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel remover o produto" });
    }
    res.status(200).send();
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const {
      name,
      price,
      black_friday,
      discount,
      description,
      color_id,
      storage_id,
      categorie_id,
      ean
    } = req.body;
    const productExistentInDatabase = await clientPrisma_default.product.findUnique({
      where: {
        id
      }
    });
    if (!productExistentInDatabase) {
      return res.status(404).send({ message: "Produto n\xE3o existe na base de dados" });
    }
    try {
      await clientPrisma_default.product.update({
        where: {
          id
        },
        data: {
          name,
          price,
          black_friday,
          discount,
          description,
          color_id: Number(color_id),
          storage_id: Number(storage_id),
          categorie_id: Number(categorie_id),
          ean
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Erro ao atualizar produto" });
    }
    res.status(200).send({ message: "Produto alterado na base de dados " });
  }
};

// src/app/controllers/RatingsController.ts
var RatingController = class {
  async index(_req, res) {
    const ratings = await clientPrisma_default.rating.findMany({
      include: {
        products: true,
        users: true
      }
    });
    return res.json(ratings);
  }
  async create(req, res) {
    const { user_id, product_id, score, feedback } = req.body;
    try {
      await clientPrisma_default.rating.create({
        data: {
          user_id,
          product_id,
          score,
          feedback,
          quantity: 1
        }
      });
    } catch (error) {
      return res.status(500).send({ message: "Falha ao registrar a avalia\xE7\xE3o." });
    }
    res.status(200).send({ message: "Avalia\xE7\xE3o registrada no banco de dados." });
  }
  // async update (req: Request, res: Response) { },
};

// src/app/controllers/StocksController.ts
var StockController = class {
  async index(_req, res) {
    const productsInStock = await clientPrisma_default.stock.findMany({
      include: {
        products: {
          include: {
            colors: true,
            storages: true,
            categories: true
          }
        }
      }
    });
    return res.json(productsInStock);
  }
  async update(req, res) {
    const product_id = Number(req.params.id);
    const { status, purchase_price, expiry_date, updated_at, quantity } = req.body;
    try {
      const product = await clientPrisma_default.stock.findUnique({
        where: {
          product_id
        }
      });
      if (!product) {
        return res.status(404).send({ message: "Produto n\xE3o existe na base de dados" });
      }
      const quantidadeAtual = product.quantity;
      await clientPrisma_default.stock.update({
        where: {
          product_id
        },
        data: {
          status,
          purchase_price,
          expiry_date: expiry_date !== void 0 ? new Date(expiry_date) : void 0,
          updated_at: new Date(updated_at),
          quantity: quantidadeAtual + Number(quantity)
        }
      });
      return res.status(200).send({ message: "Produto atualizado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Falha ao atualizar o estoque do produto" });
    }
  }
};

// src/app/controllers/StoragesController.ts
var StorageController = class {
  async index(_req, res) {
    const storages = await clientPrisma_default.storage.findMany();
    return res.json(storages);
  }
  async create(req, res) {
    const { capacity } = req.body;
    try {
      const storageExistentInDatabase = await clientPrisma_default.storage.findUnique({
        where: {
          capacity: Number(capacity)
        }
      });
      if (storageExistentInDatabase) {
        return res.status(404).send({
          message: "Armazenamento j\xE1 existente na base de dados"
        });
      }
      await clientPrisma_default.storage.create({
        data: {
          capacity: Number(capacity)
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao cadastrar novo armazenamento" });
    }
    res.status(200).send({
      message: "Novo armazenamento cadastrado na base de dados "
    });
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const { capacity } = req.body;
    try {
      const storageExistentInDatabase = await clientPrisma_default.storage.findUnique({
        where: {
          id
        }
      });
      if (!storageExistentInDatabase) {
        return res.status(400).send({ message: "Armazenamento n\xE3o consta na base de dados " });
      }
      await clientPrisma_default.storage.update({
        where: {
          id
        },
        data: {
          capacity: Number(capacity)
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao atualizar armazenamento" });
    }
    res.status(200).send({ message: "Armazenamento alterada na base de dados " });
  }
};

// src/app/controllers/UsersController.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);
var import_library = require("@prisma/client/runtime/library");
var UserController = class {
  async index(_req, res) {
    const users = await clientPrisma_default.user.findMany({});
    return res.json(users);
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
        return res.status(404).json({ message: "Email j\xE1 cadastrado." });
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
      if (error instanceof import_library.PrismaClientKnownRequestError) {
        console.error("Prisma Error:", {
          code: error.code,
          clientVersion: error.clientVersion,
          meta: error.meta
        });
      } else {
        console.error("Erro desconhecido:", error);
      }
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
        return res.status(400).send({ message: "E-mail ou senha inv\xE1lidos." });
      const verifyPass = await import_bcrypt.default.compare(
        password_hash,
        findUser.password_hash
      );
      if (!verifyPass) {
        return res.status(400).send({ message: "E-mail ou senha inv\xE1lidos." });
      }
      const token = import_jsonwebtoken2.default.sign({ data: findUser }, process.env.JWT_PASS ?? "", {
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

// src/routes.ts
var routes = (0, import_express.Router)();
routes.get("/endereco/:id", new AddressController().show);
routes.post("/endereco", new AddressController().create);
routes.get("/categoria", new CategorieController().index);
routes.post("/categoria", new CategorieController().create);
routes.put("/categoria/:id", new CategorieController().update);
routes.get("/cores", new ColorController().index);
routes.post("/cores", new ColorController().create);
routes.put("/cores/:id", new ColorController().update);
routes.get("/pedidos", new OrderItemsController().index);
routes.get("/produtos", new ProductController().index);
routes.get("/produtos/:param", new ProductController().show);
routes.post("/produtos", multerProducts_default.single("file"), new ProductController().create);
routes.put("/produtos/:id", new ProductController().update);
routes.delete("/produtos/:id", new ProductController().destroy);
routes.get("/avaliacoes", new RatingController().index);
routes.post("/avaliacoes", new RatingController().create);
routes.get("/estoque", new StockController().index);
routes.put("/estoque/:id", new StockController().update);
routes.get("/armazenamento", new StorageController().index);
routes.post("/armazenamento", new StorageController().create);
routes.put("/armazenamento/:id", new StorageController().update);
routes.get("/usuarios", new UserController().index);
routes.get("/usuarios/profile", authMiddleware, new UserController().getProfile);
routes.post("/usuarios", new UserController().create);
routes.post("/usuarios/login", new UserController().login);
routes.put("/usuarios/:id", new UserController().update);
var routes_default = routes;

// src/app.ts
var App = class {
  server;
  constructor() {
    this.server = (0, import_express2.default)();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(import_express2.default.json());
    this.server.use((0, import_cors.default)());
    this.server.use(import_express2.default.urlencoded({ extended: false }));
  }
  routes() {
    this.server.use(routes_default);
  }
};
var app_default = new App().server;

// src/server.ts
var port = 3333;
app_default.listen(port, () => {
  console.log(`Servidor em execu\xE7\xE3o na porta ${port}`);
});
