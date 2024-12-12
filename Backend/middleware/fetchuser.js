import jst from 'jsonwebtoken';

const JST_SECRET = 'Shubhamisagood$oy';
const fetchUser = (req,res,next) => {

    //Get the user from the jwt token and id
    const token = req.header("auth-token");
    if(!token)
    {
        res.send(401).send({error : "Please authenticate using the valid token"})
    }
    try {
        const data = jst.verify(token , JST_SECRET);
    req.user = data.user;
    next();
    } catch (error) {
        res.send(401).send({error : "Please authenticate using the valid token"})
    }
    
}


export default fetchUser;