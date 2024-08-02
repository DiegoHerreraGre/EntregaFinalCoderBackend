import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import sessionRouter from "./session.routes.js"
import usersRouter from "./user.routes.js"
import accountsRouter from "./account.routes.js"
import bodyParser from "body-parser";
const router = Router();

router.use(bodyParser.json());
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/session", sessionRouter);
router.use("/user", usersRouter);
router.use("/account", accountsRouter);
router.get("*", async (req, res) => {
  try {
    res.status(404).json({ status: "error", msg: "Route not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});
export default router;