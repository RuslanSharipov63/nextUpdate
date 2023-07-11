const validationAuth = (email: string, password: string): number | void => {
    const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

    let code: number = 0;

    if (!pattern.test(email)) {
        code = 1
    }
    if (password.length < 5 || password.length > 9) {
        code = 2
    }

    if (pattern.test(email) || password.length > 5 || password.length < 9) {
        code = 3
    }
    return code
}

export default validationAuth;