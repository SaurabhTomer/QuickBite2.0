import jwt from 'jsonwebtoken'


//token generaion function
 const genToken = async( userId ) => {
    try {
        const token = await jwt.sign({ userId } , process.env.JWT_SECRET , {expiresIn : "7d"})
        return token
    } catch (error) {
        console.log("Gentoken error" , error.message);
    }
}

export default genToken