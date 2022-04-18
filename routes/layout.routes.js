import { Router } from "express";

const layoutRouter = new Router();

layoutRouter.post("/createLayout", (req, res) => res.json("creat"));
layoutRouter.get("/readLayouts", (req, res) => res.json("creat"));
layoutRouter.get("/layoutDetail/:id", (req, res) =>
  res.json("layout detail" + req.params.id)
);

export default layoutRouter;
