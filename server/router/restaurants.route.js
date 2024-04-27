const express =  require ("express");
const  getRestaurantsService = require('../services/restaurants.service.js')
const getReviewsService = require ('../services/reviews.service.js')
const getDishesService = require ('../services/dishes.service.js')

const Dish = require('../model/dish.model.js')
const RestaurantPromo = require('../model/restaurantPromo.model.js')
const Review = require('../model/review.model.js')

const getRestaurantsController = require('../controller/restaurants.controller.js')
const getDishesController = require('../controller/dishes.controller.js')
const getReviewsController = require('../controller/reviews.controller.js')

const router = express.Router();

const restaurantsService = getRestaurantsService(RestaurantPromo);
const { findAllRestaurants, findOneRestaurant, findAllRestaurantsRecommend } =
  getRestaurantsController(restaurantsService);

const dishesService = getDishesService(Dish);
const { findAllDishesByRestaurantId } = getDishesController(dishesService);

const reviewsService = getReviewsService(Review);
const { findAllReviewsByRestaurantId } = getReviewsController(reviewsService);

router.get("/recommend", findAllRestaurantsRecommend);
router.get("/", findAllRestaurants);
router.get("/:restaurantId", findOneRestaurant);
router.get("/:restaurantId/dishes", findAllDishesByRestaurantId);
router.get("/:restaurantId/reviews", findAllReviewsByRestaurantId);


module.exports = router
