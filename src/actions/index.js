'use server';

import connectToDB from "@/database";
import User from "@/models";
import bcrypt from 'bcrypt';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function registerUserAction(formData) {
    await connectToDB();
    try {
        const { userName, email, password } = formData;

        // Check if the user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return {
                success: false,
                message: "User already registered!"
            };
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user
        const newlyCreatedUser = new User({
            userName,
            email,
            password: hashedPassword
        });
        const savedUser = await newlyCreatedUser.save();

        if (savedUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(savedUser))
            };
        } else {
            return {
                success: false,
                message: "Failed to save the user."
            };
        }
    } catch (e) {
        console.error("Error in registerUserAction:", e);
        return {
            success: false,
            message: "An error occurred during registration."
        };
    }
}

export async function loginUserAction(formData) {
    await connectToDB();
    try {
        const { email, password } = formData;

        // Check if user exists
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return {
                success: false,
                message: "User not found"
            };
        }

        // Verify password
        const checkPassword = await bcryptjs.compare(password, checkUser.password);
        if (!checkPassword) {
            return {
                success: false,
                message: "Invalid credentials. Please try again."
            };
        }

        // Generate JWT token
        const createTokenData = {
            id: checkUser._id,
            userName: checkUser.userName,
            email: checkUser.email
        };
        const token = jwt.sign(createTokenData, "DEFAULT_KEY", { expiresIn: '1d' });

        // Set token as a cookie
        const getCookies = cookies();
        getCookies.set('token', token);

        return {
            success: true,
            message: "Login successful"
        };

    } catch (e) {
        console.error("Error in loginUserAction:", e);
        return {
            success: false,
            message: "An error occurred during login."
        };
    }
}

export async function fetchAuthUserAction(){
    await connectToDB();
    try{
        const getCookies = cookies();
        const token = getCookies.get('token')?.value || "";
        if(token === ''){
            return{
                success: false,
                message:"token is invalid"
            }
        }
        const  decodedToken=jwt.verify(token,'DEFAULT_KEY');
        const getuserInfo= await User.findOne({_id : decodedToken.id});
        if(getuserInfo){
            return{
                success: true,
                data:JSON.parse(JSON.stringify(getuserInfo))
            }
        }else{
            return{
                success:false,
                message:"Some error occured"
            }
        }
    }catch (e) {
        console.log(e);
        return{
            success: false,
            message: "Something went wrong "
        }
    }
}
export async function logOutAction(){
    const getCookies=cookies();
    getCookies.set('token','');
}
