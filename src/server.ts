import "dotenv/config";
import app from "./app";

const port = 3333;

app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`);
});
