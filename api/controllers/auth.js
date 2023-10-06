import { db } from "../connect.js";
import bcrypt from "bcrypt";
export const login = (res, req) => {
  const q = " SELECT FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User not found");

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      " INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      return res.status(200).json("User has been created.");
    });
  });
};

export const register = (res, req) => {};

export const logout = (res, req) => {};
