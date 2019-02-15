function getUsers(req, res) {
  // 200 OK
  res.status(200);
  res.json([
    {
      id: 1,
      name: 'Test1',
    },
    {
      id: 2,
      name: 'Test2',
    },
  ]);
}

function getUser(req, res) {
  // 200 OK
  res.status(200);
  res.json({
    id: req.params.id,
    name: `Test ${req.params.id}`,
  });
}

function createUser(req, res) {
  // 201 created
  res.status(201);
  res.json({
    id: 1,
    name: req.body.name,
  });
}

function updateUser(req, res) {
  res.sendStatus(204);
}

function deleteUser(req, res) {
  res.sendStatus(204);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
