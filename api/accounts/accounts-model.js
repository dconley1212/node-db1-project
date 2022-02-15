const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("accounts").where("id", id).first();
};

const create = async (account) => {
  // DO YOUR MAGIC
  const [id] = await db("accounts").insert(account);
  const newAccount = await getById(id);
  return newAccount;
};

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts").where("id", id).update(account);
  return {
    id,
    ...account,
  };
};

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const result = await getById(id);
  await db("accounts").where("id", id).del();
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
