import jwt from "jsonwebtoken"

const generarJWT=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"365d",
    })
};

export default generarJWT