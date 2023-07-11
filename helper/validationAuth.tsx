const validationAuth = (email: string): boolean | undefined => {
  const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (!pattern.test(email)) return false;
};

export default validationAuth;
