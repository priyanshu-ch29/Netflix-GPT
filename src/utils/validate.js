export const formValidate = (email, password, name, phone) => {
  const emailValid = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(
    email
  );
  const passwordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const nameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
  const phoneValid = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);

  if (!emailValid) return "Email is not valid";
  if (!passwordValid) return "Password is not valid";
  //   if (!nameValid) return "Name is not valid";
  //   if (!phoneValid) return "Phone is not valid";
};
