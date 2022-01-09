import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'

const login = asyncHandler(async(req, res, next) => {

    // try to add IP validation
    var { email, password } = req.body;

    if( !email || !password)
    {
        return res.status(400).json({
            msg:'Please send all fields'
        });
    }

    const user = await User.findOne({ email });

    if(user)
    {
        bcrypt.compare(password,user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

                jwt.sign(
                    {id:user.id},
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err,token) => {
                        if(err) throw err;
                        return res.json({
                            token,
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name
                            }
                        })
                    }
                )
            })
    }
    else
    {
        return res.status(404).json({
            msg:"No user found"
        })
    }
});

const signup = asyncHandler(async(req, res, next) => {

    // try to add IP validation
    var { name,email, password } = req.body;

    if(!name || !email || !password)
    {
        return res.status(400).json({
            msg:'Please send all fields'
        });
    }

    const user = await User.findOne({ email });

    if(!user)
    {
        const newUser = new User({
            name,
            email,
            password
        });

        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(newUser.password,salt, (err,hash) => {
                if(err) throw err;
                newUser.password=hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            {id:user.id},
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 },
                            (err,token) => {
                                if(err) throw err;
                                return res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                })
                            }
                        )
                    })
            })
        })
    }
    else
    {
        return res.status(404).json({
            msg:"User Already exists"
        })
    }
});

export {login,signup};