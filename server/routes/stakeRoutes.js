const express = require("express");
const { createStake, getStakePools, withdrawStake, selectWinner, joinPool, getStakePoolById } = require("../controllers/stake");



const router = express.Router();

router.route("/createStake").post(createStake);
router.route("/getStakePoolByID/:id").get(getStakePoolById);
router.route("/getStakePools").get(getStakePools);
router.route("/joinPool/:id").post(joinPool);
// router.route("/withdrawStake").post(withdrawStake);
router.route("/selectWinner").post(selectWinner);


module.exports = router;
