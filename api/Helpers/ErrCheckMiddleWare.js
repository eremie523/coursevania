function checkError (err, req, res, next) {
    if(!err) next();
    res.status(400).json(JSON.stringify({message: err, status: "Error/400"}))
}

module.exports = {
    checkError,
}
