const validationEmail = (email: string): boolean | undefined => {
  const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (!pattern.test(email)) return false;
};

const validationPassword = (password: string): boolean | undefined => {
  if (password.length < 5 || password.length > 8) {
    return false;
  }
}

const validationFirstName = (firstName: string): boolean | undefined => {
  if (firstName.length < 3 || firstName.length > 20) {
    return false;
  }
}

export { validationEmail, validationPassword, validationFirstName };
