const express = require ("express");
const {
  loginUser,
  registerUser,
  getUser,
  sendCrypto,
  sendCryptoUpi,
  borrow,
  addInvest,
  getInvest,
  loanPay,
} = require("../controllers/userController.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(getUser);
router.route("/sendCrypto").post(sendCrypto);
router.route("/sendCryptoUpi").post(sendCryptoUpi);
router.route("/borrow").post(borrow);
router.route("/addInvest").post(addInvest);
router.route("/getInvest").get(getInvest);
router.route("/loanPay").post(loanPay);

module.exports=router;