const express = require("express");
const qrRouter = express.Router();
const {login,signup} = require('../controllers/userAuthcontroller')
const {
  newqrcode,
  deleteqrcode,
  listqrcode,
} = require("../controllers/qrcodecontrollers");
const {authenticateToken}=require('../utils/authjwt')


qrRouter.post("/qrcodesdata", authenticateToken,newqrcode);
qrRouter.get("/allqrcodes", authenticateToken, listqrcode);
qrRouter.delete("/qrcodes/:id", authenticateToken,deleteqrcode);
qrRouter.post('/signup',signup)
qrRouter.get('/login',login)

module.exports = userRouter;