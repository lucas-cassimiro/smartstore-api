import express from "express"

const allRoutes = express.Router()

import indexRoutes from "./../../src/routes/index/index"
import productRoutes from "./../../src/routes/products/index"
import userRoutes from "./../../src/routes/users/index"

allRoutes.use('/', indexRoutes)
allRoutes.use('/users',userRoutes)
allRoutes.use('/products', productRoutes)

export default allRoutes