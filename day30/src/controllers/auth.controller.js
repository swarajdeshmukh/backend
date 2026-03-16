export async function register(req, res, next) {

    // try {
    //     throw new Error("Error while registering user");
    // } catch (error) {
    //     error.status = 400; 
    //     next(error)
    // }
    
    res.status(201).json({
        message:"User register successfully."
    })

}

