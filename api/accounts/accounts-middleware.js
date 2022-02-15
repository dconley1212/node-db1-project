const { OPEN_READWRITE } = require("sqlite3");
const yup = require("yup");
const { getById, getAll } = require("./accounts-model");

// const accountSchema = yup.object({
//   name: yup
//     .string()
//     .trim()
//     .min(3, "name of account must be between 3 and 100")
//     .max(100, "name of account must be between 3 and 100")
//     .required("name and budget are required"),
//   budget: yup
//     .number("budget of account must be a number")
//     .positive("budget of account is too large or too small")
//     .integer()
//     .max(1000000, "budget of account is too large or too small")
//     .required("name and budget are required"),
// });

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if (!req.body.name || !req.body.budget) {
    next({ status: 400, message: ' message: "name and budget are required"' });
  } else if (
    req.body.name.trim().length < 3 ||
    req.body.name.trim().length > 100
  ) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if (typeof req.body.budget != "number" || isNaN(req.body.budget)) {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await getAll();
    accounts.forEach((account) => {
      if (account.name === req.body.name.trim()) {
        next({ status: 400, message: "that name is taken" });
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  getById(id)
    .then((account) => {
      if (account) {
        req.account = account;
        next();
      } else {
        next({ status: 404, message: "account not found" });
      }
    })
    .catch(next);
};
