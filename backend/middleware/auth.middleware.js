import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
    
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        console.log("token verified", decoded);
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        console.log('Error in token verification:');
        res.status(401).json({ message: 'Invalid token' });
    }
}; 