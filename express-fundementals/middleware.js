const accessControl = (req, res, next) => {
    const access=false;
    if (!access){
        res.status(401).json({
            success: false,
            message: 'Access denied!'
        });
    }
    next();
};
module.exports = {
    accessControl: accessControl
}
