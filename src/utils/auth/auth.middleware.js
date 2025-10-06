/*
'next' is a function that comes from the express framework
what it does:
    - hand over control to the next middleware/route handler if
        you don’t end the response.
    - signal an error by calling next(err). In that case, Express 
        will skip the remaining middleware and call the 
        error-handling middleware (if any)
*/
export function authRequest(req, res, next) {
    let header = req.headers.authorization

    /*
    This section checks if the token exists and if it starts 
    with 'Bearer', as JWT authentication tokens do.
    */
    if (!header || !header.startsWith("Bearer")) {
        return next({status: 401, message: "Unauthorized request"});
    }

    const token = header.split(" ")[1];

    if (!token) {
        return next({ status: 401, message: "Unauthorized request" });
    }

    //'async' is used to indicate that this function doesn't stop the runtime
    jwt.verify(token, process.env.JWT_PASS, async (err, decoded) => {
        if (err) {
            return next({status: 401, message: "Unauthorized request"});
        }

        /*
        - 'await' is a keyword used in async functions to pause them until they
            get the result of an operation like accessing the database, reading a
            file, or making an API call.
        */
        const user = await prisma.user.findFirst({
            // which db records must be returned
            where: { 
                id: decoded.id, 
                is_active: true, 
                blocked: false
            },
            // brings every user data field, except these
            /*
                - brings every user data field, except these
                - it's important to never bring the password field
                for security concerns
            */
            select: {
                password: false,
                is_active: false,
                blocked: false
            }
        });

        if (!user) {
            return next({ status: 401, message: "Unauthorized request" });
        }

        req.user = user;
        return next();
    });

}