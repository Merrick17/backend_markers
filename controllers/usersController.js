 const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config").secret;

module.exports.addUser = (req, res) => {
  const name = req.body.name;
  const first_name = req.body.first_name;
  const authId = req.body.auth_id;
  const password = bcrypt.hashSync(req.body.password, 10);
  const role = req.body.role;
  const cluster = req.body.cluster;

  User.findOne({ auth_id: authId }, (err, user) => {
    if (err) {
      console.log(err);
    }

    if (user) {
      console.log("alreasy exists...");
      res.json({ err: "already exists" });
    } else {
      const newuser = new User({
        name: name,
        first_name: first_name,
        auth_id: authId,
        password: password,
        role: role,
        assignedCluster: cluster
      });
      newuser.save().then(result => {
        const token = jwt.sign(
          {
            email: authId,
            userId: newuser._id
          },
          config
        );
        res.json({ result: result, token: token });
      });
    }
  });
};

module.exports.loginUser = (req, res) => {
  const auth = req.body.auth_id;
  const psw = req.body.password;
  User.findOne({ auth_id: auth }, (err, user) => {
    if (err) throw err;

    if (user) {
      bcrypt.compare(psw, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "auth failed "
          });
        } else {
          if (result) {
            const token = jwt.sign(
              {
                email: auth,
                userId: user._id
              },
              config
            );
            res.status(200).json({
              message: "auth success",
              token: token,
              id:user._id,
              cluster:user.assignedCluster
            });
          }
        }
      });
    }
  });
};

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id).then(data => {
    if (data) {
      res.json({ message: "user deleted " });
    }
  });
};
/*first_name: String,
auth_id: String,
password: String,
role: Number*/

module.exports.updateUser = async(req, res) => {
  // const id = req.params.id;
  // const column = req.body.column;
  // console.log(column);
  // const value = req.body.value;

  // if (column == "name") {
  //   User.findOneAndUpdate(id, { name: value })
  //     .then(data => {
  //       if (data) {
  //         res.json({ message: "user updated " });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // } else if (column == "first_name") {
  //   User.findByIdAndUpdate(id, { first_name: value })
  //     .then(data => {
  //       if (data) {
  //         res.json({ message: "user updated " });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // } else if (column == "password") {
  //   let newpass = bcrypt.hashSync(value, 10);
  //   User.findByIdAndUpdate(id, { password: newpass })
  //     .then(data => {
  //       if (data) {
  //         res.json({ message: "user updated " });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // } else if (column == "role") {
  //   User.findByIdAndUpdate(id, { role: value })
  //     .then(data => {
  //       if (data) {
  //         res.json({ message: "user updated " });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  try{
    const id = req.params.id;
    console.log(id)
    const user = req.body;
    const { ...updateData } = user
    console.log(updateData)
    const existAuth = await User.findOne({auth_id: user.auth_id});
    if (existAuth) return res.status(400).send("Auth already exist");
    const updateUser = await User.findByIdAndUpdate(id, updateData, {new: true});
    console.log(updateUser)
    return res.send(updateUser)

  }catch(err){
    throw res.send(err)
  }
};

module.exports.findAllByType = (req, res) => {
  const type = req.params.type;
  User.find({ role: type })
    .populate("Cluster")
    .then(data => {
      res.json({ users: data });
    })
    .catch(err => {
      res.send(err);
    });
};

