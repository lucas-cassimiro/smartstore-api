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
    var path2 = require("path");
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
      let dotenvPath = path2.resolve(process.cwd(), ".env");
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
var import_express12 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_path = __toESM(require("path"), 1);
var import_swagger_ui_express = __toESM(require("swagger-ui-express"), 1);

// swagger.json
var swagger_default = {
  openapi: "3.1.0",
  info: {
    title: "Smart store API Documentation",
    description: "API respons\xE1vel por gerenciar produtos, estoques, pedidos, usu\xE1rios, autentica\xE7\xE3o, avalia\xE7\xF5es de produtos, endere\xE7os de usu\xE1rios, categorias de produtos, cores e armazenamento da loja Smart store",
    contact: {
      email: "lucascassimro545@hotmail.com"
    },
    version: "1.0.0"
  },
  servers: [
    {
      url: "https://smartshop-api-foy4.onrender.com/",
      description: "Web Server"
    },
    {
      url: "http://localhost:3333",
      description: "Local Server"
    }
  ],
  paths: {
    "/users": {
      get: {
        tags: ["User"],
        summary: "Obter todos os usu\xE1rios cadastrados no Banco de Dados.",
        responses: {
          "200": {
            description: "Retorna uma lista de usu\xE1rios.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "500": {
            description: "Falha ao buscar usu\xE1rios."
          }
        }
      },
      post: {
        tags: ["User"],
        summary: "Cadastrar um usu\xE1rio no Banco de Dados.",
        requestBody: {
          description: "Dados de cadastro do usu\xE1rio.",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterUser"
              }
            }
          }
        },
        responses: {
          "404": {
            description: "E-mail j\xE1 cadastrado."
          },
          "201": {
            description: "Usu\xE1rio criado com sucesso!"
          },
          "500": {
            description: "Falha ao criar usu\xE1rio."
          }
        }
      }
    },
    "/users/profile": {
      get: {
        tags: ["User"],
        summary: "Obter informa\xE7\xF5es do perfil do usu\xE1rio e envi\xE1-las para o frontend ap\xF3s a autentica\xE7\xE3o. Rota respons\xE1vel tamb\xE9m pelo gerenciamento do middleware do Token de autentica\xE7\xE3o.",
        responses: {
          "200": {
            description: "Retorna os dados do usu\xE1rio.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthorizationUser"
                }
              }
            }
          }
        }
      }
    },
    "/users/login": {
      post: {
        tags: ["User"],
        summary: "Respons\xE1vel por autenticar um usu\xE1rio. Ela recebe dados de login (email e senha), consulta o Banco de Dados para verificar a exist\xEAncia desses dados e, se v\xE1lidos, gera um token JWT para autentica\xE7\xE3o subsequente.",
        requestBody: {
          description: "Dados de login do usu\xE1rio.",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TokenUser"
              }
            }
          }
        },
        responses: {
          "401": {
            description: "Usu\xE1rio ou senha incorretos."
          },
          "200": {
            description: "Envia os dados de acesso do usu\xE1rio para o Frontend e o Token de autentica\xE7\xE3o."
          },
          "500": {
            description: "Falha ao fazer LOGIN."
          }
        }
      }
    },
    "/users/{id}": {
      put: {
        tags: ["User"],
        summary: "Atualizar dados de cadastro do usu\xE1rio.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Conta do usu\xE1rio a ser atualizada.",
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateUser"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Registro do usu\xE1rio atualizado com sucesso."
          },
          "400": {
            description: "Senha atual inv\xE1lida."
          },
          "404": {
            description: "Usu\xE1rio n\xE3o encontrado."
          },
          "500": {
            description: "Falha ao atualizar conta do usu\xE1rio."
          }
        }
      }
    },
    "/address": {
      post: {
        tags: ["Address"],
        summary: "Cadastrar endere\xE7o do usu\xE1rio.",
        requestBody: {
          description: "Dados de endere\xE7o do usu\xE1rio.",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Address"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Novo endere\xE7o cadastrado."
          },
          "500": {
            description: "N\xE3o foi poss\xEDvel cadastrar um novo endere\xE7o."
          }
        }
      }
    },
    "/address/{id}": {
      get: {
        tags: ["Address"],
        summary: "Obter endere\xE7o do usu\xE1rio espec\xEDfico.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Conta do usu\xE1rio a ser atualizada.",
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          "200": {
            description: "Retorna uma lista de endere\xE7o do usu\xE1rio."
          },
          "404": {
            description: "Usu\xE1rio n\xE3o existente na base de dados."
          },
          "500": {
            description: "N\xE3o foi poss\xEDvel buscar o endere\xE7o."
          }
        }
      }
    },
    "/products": {
      get: {
        tags: ["Product"],
        summary: "Obter todos os produtos cadastrados no Banco de Dados.",
        responses: {
          "200": {
            description: "Retorna uma lista de produtos.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/Products"
                  }
                }
              }
            }
          },
          "500": {
            description: "Falha ao buscar produtos."
          }
        }
      },
      post: {
        tags: ["Product"],
        summary: "Cadastrar um produto no Banco de Dados.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterProduct"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Produto j\xE1 existente na base de dados. Quantidade atualizada."
          },
          "201": {
            description: "Novo produto cadastrado."
          },
          "500": {
            description: "Falha ao cadastrar produto ou estoque."
          }
        }
      }
    },
    "/products/{param}": {
      get: {
        tags: ["Product"],
        summary: "Filtrar produto por ID ou CATEGORIA.",
        parameters: [
          {
            name: "param",
            in: "path",
            required: true,
            description: "ID ou CATEGORIA do Produtos a ser buscado.",
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          "200": {
            description: "Retorna uma lista com o produto buscado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/Products"
                  }
                }
              }
            }
          },
          "404": {
            description: "Produto n\xE3o encontrado."
          },
          "400": {
            description: "Categoria de produto n\xE3o encontrada."
          },
          "500": {
            description: "Falha na consulta de produtos."
          }
        }
      }
    },
    "/products/{id}": {
      put: {
        tags: ["Product"],
        summary: "Atualizar produto.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Produto a ser atualizado.",
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateProduct"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Registro do usu\xE1rio atualizado com sucesso."
          },
          "400": {
            description: "Senha atual inv\xE1lida."
          },
          "404": {
            description: "Usu\xE1rio n\xE3o encontrado."
          },
          "500": {
            description: "Falha ao atualizar conta do usu\xE1rio."
          }
        }
      },
      delete: {
        tags: ["Product"],
        summary: "Deletar um produto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Produto a ser atualizado.",
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          "400": {
            description: "Produto n\xE3o consta na base de dados."
          },
          "200": {
            description: "Produto deletado com sucesso."
          },
          "500": {
            description: "N\xE3o foi poss\xEDvel remover o produto."
          }
        }
      }
    },
    "/stocks": {
      get: {
        tags: ["Stock"],
        summary: "Obter estoque de todos os produtos.",
        responses: {
          "200": {
            description: "Retorna uma lista de estoque de produtos.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/Stock"
                  }
                }
              }
            }
          },
          "500": {
            description: "Falha ao buscar lista de estoque."
          }
        }
      }
    },
    "/stocks/{id}": {
      put: {
        tags: ["Stock"],
        summary: "Atualizar estoque.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Estoque do produto a ser atualizado.",
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateStock"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Estoque do produto atualizado com sucesso."
          },
          "400": {
            description: "Senha atual inv\xE1lida."
          },
          "500": {
            description: "Falha ao atualizar o estoque do produto."
          }
        }
      }
    },
    "/ratings": {
      get: {
        tags: ["Ratings"],
        summary: "Obter todas as avalia\xE7\xF5es de produto.",
        responses: {
          "200": {
            description: "Retorna uma lista de avalia\xE7\xF5es de cada produto.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/Rating"
                  }
                }
              }
            }
          },
          "500": {
            description: "Falha ao buscar avalia\xE7\xF5es."
          }
        }
      },
      post: {
        tags: ["Ratings"],
        summary: "Cadastrar uma nova avalia\xE7\xE3o.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRating"
              }
            }
          }
        },
        responses: {}
      }
    },
    "/colors": {
      get: {
        tags: ["Color"],
        summary: "Obter todas as cores.",
        responses: {
          "200": {
            description: "Retorna uma lista de cores",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/Color"
                  }
                }
              }
            }
          },
          "500": {
            description: "Falha ao buscar as cores."
          }
        }
      },
      post: {
        tags: ["Color"],
        summary: "Cadastrar uma nova cor.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterColor"
              }
            }
          }
        },
        responses: {
          "400": {
            description: "Cor j\xE1 existente na base de dados."
          },
          "500": {
            description: "Falha ao cadastrar nova cor."
          },
          "201": {
            description: "Nova cor cadastrada na base de dados."
          }
        }
      }
    },
    "/colors/{id}": {
      put: {
        tags: ["Color"],
        summary: "Atualizar uma cor.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Cor a ser atualizada.",
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateColor"
              }
            }
          }
        },
        responses: {
          "400": {
            description: "Cor n\xE3o consta na base de dados."
          },
          "500": {
            description: "Falha ao atualizar cor."
          },
          "201": {
            description: "Cor alterada na base de dados."
          }
        }
      },
      delete: {
        tags: ["Color"],
        summary: "Deletar uma cor.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Cor a ser deletada.",
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          "400": {
            description: "Cor n\xE3o consta na base de dados."
          },
          "200": {
            description: "Cor deletada com sucesso."
          },
          "500": {
            description: "N\xE3o foi poss\xEDvel remover a cor."
          }
        }
      }
    },
    "/categories": {
      get: {
        tags: ["Categorie"],
        summary: "Obter todas as categorias.",
        responses: {
          "200": {
            description: "Retorna uma lista de categorias",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/Categorie"
                  }
                }
              }
            }
          },
          "500": {
            description: "Falha ao buscar as categorias."
          }
        }
      },
      post: {
        tags: ["Categorie"],
        summary: "Cadastrar uma nova categoria.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterCategorie"
              }
            }
          }
        },
        responses: {
          "400": {
            description: "Categoria j\xE1 existente na base de dados."
          },
          "500": {
            description: "Falha ao cadastrar nova categoria."
          },
          "201": {
            description: "Nova categoria cadastrada na base de dados."
          }
        }
      }
    },
    "/categories/{id}": {
      put: {
        tags: ["Categorie"],
        summary: "Atualizar uma categoria.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Categoria a ser atualizada.",
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateCategorie"
              }
            }
          }
        },
        responses: {
          "400": {
            description: "Categoria n\xE3o consta na base de dados."
          },
          "500": {
            description: "Falha ao atualizar categoria."
          },
          "201": {
            description: "Categoria alterada na base de dados."
          }
        }
      },
      delete: {
        tags: ["Categorie"],
        summary: "Deletar uma categoria.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Categoria a ser deletada.",
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          "400": {
            description: "Categoria n\xE3o consta na base de dados."
          },
          "200": {
            description: "Categoria deletada com sucesso."
          },
          "500": {
            description: "N\xE3o foi poss\xEDvel remover a categoria."
          }
        }
      }
    },
    "/storages": {
      get: {
        tags: ["Storage"],
        summary: "Obter todos os armazenamentos.",
        responses: {
          "200": {
            description: "Retorna uma lista de armazenamento.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/Storage"
                  }
                }
              }
            }
          },
          "500": {
            description: "Falha ao buscar os armazenamentos."
          }
        }
      },
      post: {
        tags: ["Storage"],
        summary: "Cadastrar um novo armazenamento.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterStorage"
              }
            }
          }
        },
        responses: {
          "400": {
            description: "Armazenamento j\xE1 existente na base de dados."
          },
          "500": {
            description: "Falha ao cadastrar novo armazenamento."
          },
          "201": {
            description: "Novo armazenamento cadastrado na base de dados."
          }
        }
      }
    },
    "/storages/{id}": {
      put: {
        tags: ["Storage"],
        summary: "Atualizar um armazenamento.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Armazenamento a ser atualizado.",
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateStorage"
              }
            }
          }
        },
        responses: {
          "400": {
            description: "Armazenamento n\xE3o consta na base de dados."
          },
          "500": {
            description: "Falha ao atualizar armazenamento."
          },
          "201": {
            description: "Armazenamento alterado na base de dados."
          }
        }
      },
      delete: {
        tags: ["Storage"],
        summary: "Deletar um armazenamento.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Armazenamento a ser deletado.",
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          "400": {
            description: "Armazenamento n\xE3o consta na base de dados."
          },
          "200": {
            description: "Armazenamento deletado com sucesso."
          },
          "500": {
            description: "N\xE3o foi poss\xEDvel remover o armazenamento."
          }
        }
      }
    },
    "/orders": {
      get: {
        tags: ["Order"],
        summary: "Lista de produtos comprados",
        responses: {
          "200": {
            description: "Retorna uma lista de produtos que foram comprados.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/Order"
                  }
                }
              }
            }
          },
          "500": {
            description: "Falha ao buscar os pedidos."
          }
        }
      },
      post: {
        tags: ["Order"],
        summary: "Cadastrar um novo pedido."
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID do usu\xE1rio"
          },
          email: {
            type: "string",
            description: "E-mail do usu\xE1rio"
          },
          cpf: {
            type: "string",
            description: "CPF do usu\xE1rio"
          },
          cellphone: {
            type: "string",
            description: "N\xFAmero de celular do usu\xE1rio"
          },
          first_name: {
            type: "string",
            description: "Nome do usu\xE1rio"
          },
          last_name: {
            type: "string",
            description: "Sobrenome do usu\xE1rio"
          },
          date_birth: {
            type: "string",
            format: "date",
            description: "Data de nascimento do usu\xE1rio"
          },
          created_at: {
            type: "string",
            format: "date",
            description: "Data de cria\xE7\xE3o da conta do usu\xE1rio"
          },
          last_login: {
            type: "string",
            format: "date",
            description: "Data do \xFAltimo acesso do usu\xE1rio"
          },
          admin_auth: {
            type: "boolean",
            description: "Permiss\xE3o do usu\xE1rio"
          },
          password_hash: {
            type: "string",
            description: "Senha da conta do usu\xE1rio"
          }
        }
      },
      UpdateUser: {
        type: "object",
        required: ["password_hash", "date_birth", "cellphone"],
        properties: {
          password_hash: {
            type: "string",
            description: "Senha da conta do usu\xE1rio"
          },
          date_birth: {
            type: "string",
            format: "date",
            description: "Data de nascimento do usu\xE1rio"
          },
          cellphone: {
            type: "string",
            description: "N\xFAmero de celular do usu\xE1rio"
          }
        }
      },
      RegisterUser: {
        type: "object",
        required: [
          "email",
          "password_hash",
          "cpf",
          "first_name",
          "last_name",
          "cellphone",
          "date_birth"
        ],
        properties: {
          email: {
            type: "string",
            description: "E-mail do usu\xE1rio"
          },
          cpf: {
            type: "string",
            description: "CPF do usu\xE1rio"
          },
          cellphone: {
            type: "string",
            description: "N\xFAmero de celular do usu\xE1rio"
          },
          first_name: {
            type: "string",
            description: "Nome do usu\xE1rio"
          },
          last_name: {
            type: "string",
            description: "Sobrenome do usu\xE1rio"
          },
          date_birth: {
            type: "string",
            format: "date",
            description: "Data de nascimento do usu\xE1rio"
          },
          password_hash: {
            type: "string",
            description: "Senha da conta do usu\xE1rio"
          }
        }
      },
      Color: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID da Cor"
          },
          name: {
            type: "string",
            description: "Nome da cor"
          }
        }
      },
      RegisterColor: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            description: "Nome da cor"
          }
        }
      },
      UpdateColor: {
        type: "object",
        required: ["id", "name"],
        properties: {
          id: {
            type: "integer",
            description: "ID da Cor a ser atualizada"
          },
          name: {
            type: "string",
            description: "Nome da nova cor"
          }
        }
      },
      Storage: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID do Armazenamento"
          },
          capacity: {
            type: "string",
            description: "Nome do Armazenamento"
          }
        }
      },
      RegisterStorage: {
        type: "object",
        required: ["capacity"],
        properties: {
          capacity: {
            type: "string",
            description: "Nome da cor"
          }
        }
      },
      UpdateStorage: {
        type: "object",
        required: ["id", "capacity"],
        properties: {
          id: {
            type: "integer",
            description: "ID do Armazenamento a ser atualizado"
          },
          capacity: {
            type: "string",
            description: "Nova capacidade"
          }
        }
      },
      Categorie: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID da Categoria"
          },
          name: {
            type: "string",
            description: "Nome da Categoria"
          }
        }
      },
      RegisterCategorie: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            description: "Nome da Categoria"
          }
        }
      },
      UpdateCategorie: {
        type: "object",
        required: ["id", "name"],
        properties: {
          id: {
            type: "integer",
            description: "ID da Categoria a ser atualizada"
          },
          name: {
            type: "string",
            description: "Nome da nova Categoria"
          }
        }
      },
      Products: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID do Produto"
          },
          name: {
            type: "string",
            description: "Nome do Produto"
          },
          price: {
            type: "number",
            description: "Pre\xE7o do Produto"
          },
          black_friday: {
            type: "boolean",
            description: "Black Friday do Produto"
          },
          discount: {
            type: "number",
            description: "Desconto do Produto"
          },
          average_score: {
            type: "number",
            description: "M\xE9dia de Avalia\xE7\xE3o do Produto"
          },
          description: {
            type: "string",
            description: "Descri\xE7\xE3o do Produto"
          },
          color_id: {
            type: "integer",
            description: "Cor do Produto"
          },
          colors: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "ID da Cor"
              },
              name: {
                type: "string",
                description: "Nome da Cor"
              }
            }
          },
          storage_id: {
            type: "integer",
            description: "Armazenamento do Produto"
          },
          storages: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "ID do Armazenamento"
              },
              capacity: {
                type: "number",
                description: "Capacidade de Armazenamento"
              }
            }
          },
          categorie_id: {
            type: "integer",
            description: "Categoria do Produto"
          },
          categories: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "ID da Categoria"
              },
              name: {
                type: "string",
                description: "Categoria do Produto"
              }
            }
          },
          ean: {
            type: "string",
            description: "N\xFAmero de Identifica\xE7\xE3o do Produto"
          },
          highlight: {
            type: "boolean",
            description: "Produto \xE9 novidade ou n\xE3o"
          },
          image: {
            type: "string",
            description: "Imagem do Produto"
          },
          black_friday_offer: {
            type: "boolean",
            description: "Oferta Black Friday de Produtos espec\xEDficos"
          }
        }
      },
      RegisterProduct: {
        type: "object",
        required: [
          "name",
          "price",
          "black_friday",
          "discount",
          "description",
          "color_id",
          "storage_id",
          "categorie_id",
          "ean",
          "highlight",
          "image",
          "black_friday_offer"
        ],
        properties: {
          name: {
            type: "string",
            description: "Nome do Produto"
          },
          price: {
            type: "number",
            description: "Pre\xE7o do Produto"
          },
          black_friday: {
            type: "boolean",
            description: "Black Friday do Produto"
          },
          discount: {
            type: "number",
            description: "Desconto do Produto"
          },
          description: {
            type: "string",
            description: "Descri\xE7\xE3o do Produto"
          },
          color_id: {
            type: "integer",
            description: "Cor do Produto"
          },
          storage_id: {
            type: "integer",
            description: "Armazenamento do Produto"
          },
          categorie_id: {
            type: "integer",
            description: "Categoria do Produto"
          },
          ean: {
            type: "string",
            description: "N\xFAmero de Identifica\xE7\xE3o do Produto"
          },
          highlight: {
            type: "boolean",
            description: "Produto \xE9 novidade ou n\xE3o"
          },
          image: {
            type: "string",
            description: "Imagem do Produto"
          },
          black_friday_offer: {
            type: "boolean",
            description: "Oferta Black Friday de Produtos espec\xEDficos"
          }
        }
      },
      UpdateProduct: {
        type: "object",
        required: [
          "name",
          "price",
          "black_friday",
          "discount",
          "description",
          "color_id",
          "storage_id",
          "categorie_id",
          "ean",
          "highlight",
          "image",
          "black_friday_offer"
        ],
        properties: {
          name: {
            type: "string",
            description: "Nome do Produto"
          },
          price: {
            type: "number",
            description: "Pre\xE7o do Produto"
          },
          black_friday: {
            type: "boolean",
            description: "Black Friday do Produto"
          },
          discount: {
            type: "number",
            description: "Desconto do Produto"
          },
          average_score: {
            type: "number",
            description: "M\xE9dia de Avalia\xE7\xE3o do Produto"
          },
          description: {
            type: "string",
            description: "Descri\xE7\xE3o do Produto"
          },
          color_id: {
            type: "integer",
            description: "Cor do Produto"
          },
          storage_id: {
            type: "integer",
            description: "Armazenamento do Produto"
          },
          categorie_id: {
            type: "integer",
            description: "Categoria do Produto"
          },
          ean: {
            type: "string",
            description: "N\xFAmero de Identifica\xE7\xE3o do Produto"
          },
          highlight: {
            type: "boolean",
            description: "Produto \xE9 novidade ou n\xE3o"
          },
          image: {
            type: "string",
            description: "Imagem do Produto"
          },
          black_friday_offer: {
            type: "boolean",
            description: "Oferta Black Friday de Produtos espec\xEDficos"
          }
        }
      }
    }
  }
};

// src/routes/addressesRoutes.ts
var import_express = require("express");

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

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
      recipient,
      cep
    } = req.body;
    try {
      const addressExistent = await clientPrisma_default.address.findUnique({
        where: {
          cep
        }
      });
      if (addressExistent) {
        return res.status(400).send({ message: "Endere\xE7o j\xE1 cadastrado." });
      }
      await clientPrisma_default.address.create({
        data: {
          user_id,
          street_address,
          number_address: Number(number_address),
          complement,
          neighborhood,
          city,
          state,
          recipient,
          cep
        }
      });
      return res.status(201).send({ message: "Novo endere\xE7o cadastrado na base de dados." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel cadastrar um novo endere\xE7o." });
    }
  }
  async delete(req, res) {
    const id = Number(req.params.id);
    try {
      await clientPrisma_default.address.delete({
        where: {
          id
        }
      });
      return res.status(200).send({ message: "Endere\xE7o removido." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel remover o endere\xE7o." });
    }
  }
};

// src/routes/addressesRoutes.ts
var addressesRoutes = (0, import_express.Router)();
addressesRoutes.get("/:id", new AddressController().show);
addressesRoutes.post("/", new AddressController().create);
addressesRoutes.delete("/:id", new AddressController().delete);
var addressesRoutes_default = addressesRoutes;

// src/routes/userRoutes.ts
var import_express2 = require("express");

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
var usersRoutes = (0, import_express2.Router)();
usersRoutes.get("/", new UserController().index);
usersRoutes.get("/profile", authMiddleware, new UserController().getProfile);
usersRoutes.post("/", new UserController().create);
usersRoutes.post("/login", new UserController().login);
usersRoutes.put("/:id", new UserController().update);
var userRoutes_default = usersRoutes;

// src/routes/colorsRoutes.ts
var import_express3 = require("express");

// src/app/controllers/ColorsController.ts
var ColorController = class {
  async index(_req, res) {
    try {
      const colors = await clientPrisma_default.color.findMany();
      return res.json(colors);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar as cores." });
    }
  }
  async create(req, res) {
    const { name } = req.body;
    try {
      const colorExistentInDatabase = await clientPrisma_default.color.findUnique({
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
      return res.status(500).send({ message: "Falha ao cadastrar nova cor " });
    }
    return res.status(201).send({ message: "Nova cor cadastrada na base de dados " });
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
      return res.status(500).send({ message: "Falha ao atualizar cor" });
    }
    return res.status(201).send({ message: "Cor alterada na base de dados " });
  }
  async destroy(req, res) {
    const id = Number(req.params.id);
    try {
      const colorExistent = await clientPrisma_default.color.findUnique({
        where: {
          id
        }
      });
      if (!colorExistent) {
        return res.status(400).send({ message: "A cor n\xE3o consta na base de dados." });
      }
      await clientPrisma_default.color.delete({
        where: {
          id
        }
      });
      return res.status(200).send({ message: "Cor deletada com sucesso." });
    } catch (error) {
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel remover a cor." });
    }
  }
};

// src/routes/colorsRoutes.ts
var colorsRoutes = (0, import_express3.Router)();
colorsRoutes.get("/", new ColorController().index);
colorsRoutes.post("/", new ColorController().create);
colorsRoutes.put("/:id", new ColorController().update);
colorsRoutes.delete("/:id", new ColorController().destroy);
var colorsRoutes_default = colorsRoutes;

// src/routes/categoriesRoutes.ts
var import_express4 = require("express");

// src/app/controllers/CategoriesController.ts
var CategorieController = class {
  async index(_req, res) {
    try {
      const categories = await clientPrisma_default.categorie.findMany();
      return res.json(categories);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar as categorias." });
    }
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
    return res.status(201).send({
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
  async destroy(req, res) {
    const id = Number(req.params.id);
    try {
      const categorieExistent = await clientPrisma_default.categorie.findUnique({
        where: {
          id
        }
      });
      if (!categorieExistent) {
        return res.status(400).send({
          message: "A categoria n\xE3o consta na base de dados."
        });
      }
      await clientPrisma_default.categorie.delete({
        where: {
          id
        }
      });
      return res.status(200).send({ message: "Categoria deletada com sucesso." });
    } catch (error) {
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel remover a categoria." });
    }
  }
};

// src/routes/categoriesRoutes.ts
var categoriesRoutes = (0, import_express4.Router)();
categoriesRoutes.get("/", new CategorieController().index);
categoriesRoutes.post("/", new CategorieController().create);
categoriesRoutes.put("/:id", new CategorieController().update);
categoriesRoutes.delete("/:id", new CategorieController().destroy);
var categoriesRoutes_default = categoriesRoutes;

// src/routes/productsRoutes.ts
var import_express5 = require("express");

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
var productsRoutes = (0, import_express5.Router)();
productsRoutes.get("/", new ProductController().index);
productsRoutes.get("/:param", new ProductController().show);
productsRoutes.post("/", multer_default.single("file"), new ProductController().create);
productsRoutes.put("/:id", new ProductController().update);
productsRoutes.delete("/:id", new ProductController().destroy);
var productsRoutes_default = productsRoutes;

// src/routes/stocksRoutes.ts
var import_express6 = require("express");

// src/app/controllers/StocksController.ts
var StockController = class {
  async index(_req, res) {
    try {
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
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar estoque dos produtos." });
    }
  }
  async update(req, res) {
    const product_id = Number(req.params.id);
    const { status, purchase_price, expiry_date, quantity } = req.body;
    try {
      const product = await clientPrisma_default.stock.findUnique({
        where: {
          product_id
        }
      });
      if (!product) {
        return res.status(404).send({ message: "Produto n\xE3o existe na base de dados." });
      }
      const quantidadeAtual = product.quantity;
      const expiryDate = expiry_date ? new Date(expiry_date) : void 0;
      await clientPrisma_default.stock.update({
        where: {
          product_id
        },
        data: {
          status,
          purchase_price,
          expiry_date: expiryDate,
          updated_at: /* @__PURE__ */ new Date(),
          quantity: quantidadeAtual + Number(quantity)
        }
      });
      return res.status(200).send({ message: "Produto atualizado com sucesso." });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Falha ao atualizar o estoque do produto." });
    }
  }
};

// src/routes/stocksRoutes.ts
var stocksRoutes = (0, import_express6.Router)();
stocksRoutes.get("/", new StockController().index);
stocksRoutes.put("/:id", new StockController().update);
var stocksRoutes_default = stocksRoutes;

// src/routes/ratingsRoutes.ts
var import_express7 = require("express");

// src/app/controllers/RatingsController.ts
var RatingController = class {
  async index(_req, res) {
    try {
      const ratings = await clientPrisma_default.rating.findMany({
        include: {
          products: true,
          users: true
        }
      });
      return res.json(ratings);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar avalia\xE7\xF5es do produto." });
    }
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
  async update(req, res) {
    const id = Number(req.params.id);
    const { score, feedback } = req.body;
    try {
      await clientPrisma_default.rating.update({
        where: {
          id
        },
        data: {
          score,
          feedback
          //quantity: pegar a quantidade atual e somar +1
        }
      });
      return res.status(200).send({ message: "Avalia\xE7\xE3o cadastrada." });
    } catch (error) {
      return res.status(500).send({ message: "Erro ao atualizar avalia\xE7\xE3o." });
    }
  }
};

// src/routes/ratingsRoutes.ts
var ratingsRoutes = (0, import_express7.Router)();
ratingsRoutes.get("/", new RatingController().index);
ratingsRoutes.post("/", new RatingController().create);
var ratingsRoutes_default = ratingsRoutes;

// src/routes/storagesRoutes.ts
var import_express8 = require("express");

// src/app/controllers/StoragesController.ts
var StorageController = class {
  async index(_req, res) {
    try {
      const storages = await clientPrisma_default.storage.findMany();
      return res.json(storages);
    } catch (error) {
      return res.status(500).send({ message: "Falha ao buscar armazenamento." });
    }
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
          message: "Armazenamento j\xE1 existente na base de dados."
        });
      }
      await clientPrisma_default.storage.create({
        data: {
          capacity: Number(capacity)
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Falha ao cadastrar novo armazenamento." });
    }
    res.status(200).send({
      message: "Novo armazenamento cadastrado na base de dados."
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
        return res.status(400).send({ message: "Armazenamento n\xE3o consta na base de dados." });
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
      return res.status(404).send({ message: "Falha ao atualizar armazenamento." });
    }
    res.status(200).send({ message: "Armazenamento alterada na base de dados." });
  }
  async destroy(req, res) {
    const id = Number(req.params.id);
    try {
      const storageExistent = await clientPrisma_default.storage.findUnique({
        where: {
          id
        }
      });
      if (!storageExistent) {
        return res.status(400).send({ message: "O armazenamento n\xE3o consta na base de dados." });
      }
      await clientPrisma_default.storage.delete({
        where: {
          id
        }
      });
      return res.status(200).send({ message: "Armazenamento deletado com sucesso." });
    } catch (error) {
      return res.status(500).send({ message: "N\xE3o foi poss\xEDvel remover o armazenamento." });
    }
  }
};

// src/routes/storagesRoutes.ts
var storagesRoutes = (0, import_express8.Router)();
storagesRoutes.get("/", new StorageController().index);
storagesRoutes.post("/", new StorageController().create);
storagesRoutes.put("/:id", new StorageController().update);
storagesRoutes.delete("/:id", new StorageController().destroy);
var storagesRoutes_default = storagesRoutes;

// src/routes/orderItemsRoutes.ts
var import_express9 = require("express");

// src/app/controllers/OrderItemsController.ts
var OrderItemsController = class {
  async index(_req, res) {
    try {
      const orderItems = await clientPrisma_default.order_item.findMany({
        include: {
          products: true,
          orders: true
        }
      });
      return res.json(orderItems);
    } catch (error) {
      res.status(500).send({ message: "Falha ao buscar os pedidos." });
    }
  }
};

// src/routes/orderItemsRoutes.ts
var orderItemsRoutes = (0, import_express9.Router)();
orderItemsRoutes.get("/", new OrderItemsController().index);
var orderItemsRoutes_default = orderItemsRoutes;

// src/routes/highlightsRoutes.ts
var import_express10 = require("express");

// src/app/controllers/HighlightsController.ts
var HighlightController = class {
  async index(_req, res) {
    try {
      const highlightedProducts = await clientPrisma_default.product.findMany({
        where: {
          highlight: true
        },
        include: {
          categories: true,
          colors: true,
          storages: true
        }
      });
      return res.status(200).json(highlightedProducts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar produtos em destaque." });
    }
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const { highlight } = req.body;
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
          highlight
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Erro ao atualizar produto." });
    }
    return res.status(200).send({ message: "Produto adicionado na sess\xE3o Novidades." });
  }
};

// src/routes/highlightsRoutes.ts
var highlightsRoutes = (0, import_express10.Router)();
highlightsRoutes.get("/", new HighlightController().index);
highlightsRoutes.put("/:id", new HighlightController().update);
var highlightsRoutes_default = highlightsRoutes;

// src/routes/blackfridayRoutes.ts
var import_express11 = require("express");

// src/app/controllers/BlackFridayController.ts
var BlackFridayController = class {
  async index(_req, res) {
    try {
      const blackFridayOffer = await clientPrisma_default.product.findMany({
        where: {
          black_friday_offer: true
        },
        include: {
          categories: true,
          colors: true,
          storages: true
        }
      });
      return res.status(200).json(blackFridayOffer);
    } catch (error) {
      return res.status(500).send({ message: "Erro ao buscar produtos em oferta Black Friday." });
    }
  }
  async update(req, res) {
    const id = Number(req.params.id);
    const { black_friday_offer } = req.body;
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
          black_friday_offer
        }
      });
    } catch (error) {
      return res.status(404).send({ message: "Erro ao atualizar produto." });
    }
    return res.status(200).send({ message: "Produto alterado na base de dados." });
  }
};

// src/routes/blackfridayRoutes.ts
var blackfridayRoutes = (0, import_express11.Router)();
blackfridayRoutes.get("/", new BlackFridayController().index);
blackfridayRoutes.put("/:id", new BlackFridayController().update);
var blackfridayRoutes_default = blackfridayRoutes;

// src/app.ts
var __dirname = import_path.default.resolve();
var App = class {
  server;
  constructor() {
    this.server = (0, import_express12.default)();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(import_express12.default.json());
    this.server.use((0, import_cors.default)());
    this.server.use(import_express12.default.urlencoded({ extended: false }));
  }
  routes() {
    this.server.use("/address", addressesRoutes_default);
    this.server.use("/users", userRoutes_default);
    this.server.use("/colors", colorsRoutes_default);
    this.server.use("/categories", categoriesRoutes_default);
    this.server.use("/products", productsRoutes_default);
    this.server.use("/stocks", stocksRoutes_default);
    this.server.use("/ratings", ratingsRoutes_default);
    this.server.use("/storages", storagesRoutes_default);
    this.server.use("/orders", orderItemsRoutes_default);
    this.server.use("/news", highlightsRoutes_default);
    this.server.use("/blackfriday", blackfridayRoutes_default);
    this.server.use("/docs", import_swagger_ui_express.default.serve, import_swagger_ui_express.default.setup(swagger_default));
    this.server.use(
      "/tmp/uploads",
      import_express12.default.static(import_path.default.join(__dirname, "tmp/uploads"))
    );
  }
};
var app_default = new App().server;

// src/server.ts
var port = 3333;
app_default.listen(port, () => {
  console.log(`Servidor em execu\xE7\xE3o na porta ${port}`);
});
