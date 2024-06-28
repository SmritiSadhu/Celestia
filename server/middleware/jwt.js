// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = require('../models/Users');

// const verifyJWT = (req, res, next) => {
//   const authHeader = req.body.token;

//   if (!authHeader) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const token = authHeader.replace("Bearer ","");
//   jwt.verify(token, process.env.JWT_SECRET,(err,payload)=>{
//     if(err){
//       return res.status(401).json({error:"you must be logged in"})
//     }
//     const {_id}=payload
//     User.findById(_id).then(userdata=>{
//       req.user = userdata;
//       next();
//     })
//   })
// };

// module.exports = verifyJWT;
