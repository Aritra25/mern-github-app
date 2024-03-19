export async function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    else
    res.send(process.env.CLIENT_BASE_URL+"/login")
}