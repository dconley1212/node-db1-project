const router = require("express").Router();
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const postedAccount = await Accounts.create(req.body);
      res.status(201).json(postedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  async (req, res, next) => {
    // DO YOUR MAGIC
    try {
      const updatedAccount = await Accounts.updateById(req.params.id, req.body);

      res.status(200).json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = await Accounts.deleteById(req.params.id);
    res.status(200).json(deletedAccount);
  } catch (error) {
    next(error);
  }
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
