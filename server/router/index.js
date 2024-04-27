const router = require('express').Router()

const restaurantRouter = require('./restaurant')
const reservationRouter = require('./reservation')
const userRoutes = require("./userRoutes");
const routerPromo = require("./restaurants.route");

router.use('/restaurant', restaurantRouter)
router.use('/reservation', reservationRouter)
router.use("/auth", userRoutes);
router.use("/restaurants", routerPromo);

module.exports = router