export const formValidate = (email, password, name, phone) => {
  const emailValid = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(
    email
  );
  const passwordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!emailValid) return "Email is not valid";
  if (!passwordValid) return "Password is not valid";
  return null;
};
