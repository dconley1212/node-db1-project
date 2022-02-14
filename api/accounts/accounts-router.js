const router = require("express").Router();
const Accounts = require("./accounts-model");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.post("/", (req, res, next) => {
  // DO YOUR MAGIC
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
