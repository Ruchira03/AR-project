const db = require("../Models");
const User = db.user;
const {nanoid} = require('nanoid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = (req, res, next) => {

            let userId = nanoid(10);

            const user = new User({
                user_id: userId,
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                mobile_number: req.body.mobile_number,
            });
            
            // console.log(publicKey, privateKey);
            var token = jwt.sign({ user_id: userId, user_name : req.body.name, user_email : req.body.email}, process.env.jwtSecretKey, {
                expiresIn: 86400 // 24 hours
              });

            user.save((err, user) => {
                if (err) {
                    next(new ErrorResponse(err, 500))
                }
                else{
                    res.send({ message: "User verified and registered successfully!",details:user, access_token: token, verifieddata : req.body.data});  
                }    
            });         
             
};

exports.signin_email = (req, res, next) => {

    User.findOne(
        {email: req.body.email}
    ).exec((err, user) => {
        if (err) {
            next(new ErrorResponse(err, 500)) 
        }
        if (user===null) {
            next(new ErrorResponse("User Not found",404 ))
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          next(new ErrorResponse("Invalid Password!",401 ))
        }
  
        var token = jwt.sign({ user_id: user.user_id, user_name : user.name, user_email : req.body.email}, process.env.jwtSecretKey, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          userData : user,
          accessToken: token
        });
      });
  };

exports.signin_mobile_password = (req, res, next) => {

    User.findOne(
        {mobile_number: req.body.mobile_number},
    )
      .exec((err, user) => {
        if (err) {
            next(new ErrorResponse(err, 500))
        }
        
        if (user===null) {
            next(new ErrorResponse("User Not found",404 ))
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
            next(new ErrorResponse("Invalid Password!",401 ))
        }
  
        var token = jwt.sign({ user_id: user.user_id, user_name : user.name, user_email : user.email}, process.env.jwtSecretKey, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          userData : user,
          accessToken: token
        });
      });
};

