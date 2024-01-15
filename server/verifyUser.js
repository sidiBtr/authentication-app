import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json('need to login')
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        req.user = user;
        next()
    })

}