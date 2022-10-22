const router = require("express").Router();

const userController = require("../controllers/user");

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
// router.get("/user", userController.authMiddleware, userController.getUser2);
router.get("/user", userController.getUser);

module.exports = router;
