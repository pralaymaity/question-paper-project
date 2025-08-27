// email condition
export const validateEmail = (email) => {
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // return emailPattern.test(email.trim());

  email = email.trim();

  let at = 0; 
  let dot = 0;

  for (let i = 0; i < email.length; i++) {
    const char = email[i];

    if (" ,;<>\"".includes(char)){
      return false;
    } 

    if (char === "@") {
      at++;
      if (at > 1 || i === email.length - 1){
        return false;
      } 
    }

    if (char === ".") {
      if (i === email.length - 1 || email[i - 1] === "." || email[i + 1] === ".") {
        return false;
      }
      dot++;
    }
  }

  return at === 1 && dot > 0;
};

// password condition
export const validatePassword = (password) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{2,}$/;
  return passwordPattern.test(password.trim());
};

// name condition
export const validateName = (name) => {
  return name !== "";
};

// form validation criteria
export const checkValidData = (email, password, name, isSignInForm) => {
  let message = "";

  if (!email || !password) {
    message = "*Email and password are required.";

    return { isValid: false, message };
  }

  if (!validateEmail(email)) {
    message = "*Invalid email address.";

    return { isValid: false, message };
  }

  if (!validatePassword(password)) {
    message =
      "*Password must be 2 characters with special character and uppercase";

    return { isValid: false, message };
  }

  if (!isSignInForm && !validateName(name)) {
    message = "*Full name is required.";
    return { isValid: false, message };
  }

  return { isValid: true, message: "" };
};
