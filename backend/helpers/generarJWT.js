import jwt from "jsonwebtoken"

const generarJWT=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
<<<<<<< HEAD
        expiresIn:"365d",
=======
        expiresIn:"30d",
>>>>>>> ba37c3450a41cdca14008b6b8c88d683414a86ca
    })
};

export default generarJWT