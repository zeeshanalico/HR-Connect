const jwt=require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token not provided' });
    }
    jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
      }
      req.user = decoded;
      // console.log('Decoded JWT Payload:', decoded);
      console.log('Token Verified');
      next();
    });
  };
  
  const checkUserRole = (requiredRole) => (req, res, next) => {
    // console.log(requiredRole);
    const userRole = req.user.role_id;
    if (userRole !== requiredRole) {
      return res.status(403).json({ success: false, message: 'Access denied. Insufficient role privileges.' });
    }
    console.log('Role Verified');
    next();
  };

  module.exports={verifyToken,checkUserRole};