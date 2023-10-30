import  express  from "express";
const indexRoutes = express.Router()


indexRoutes.get('/', (req,res)=>{
    res.send('pagina index')
})

export default indexRoutes