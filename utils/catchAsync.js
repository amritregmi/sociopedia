
/**
 * @DESC Attach .catch function to all async function
 *       and uses global error handler mechanism 
 * @WRAPPER for async function 
 */
module.exports = (fn) => {
    return (req, res, next)=>{
        fn(req, res, next).catch(err => next(err))
    }
}