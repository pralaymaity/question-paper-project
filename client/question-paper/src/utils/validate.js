
// email condition
export const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
};

// password condition   
export const validatePassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{2,}$/;
    return passwordPattern.test(password.trim());
};

// name condition  
export const validateName = (name) => {
    return name !== '';
};


// form validation criteria
export const checkValidData = (email, password, name, isSignInForm) => {
    
    
    
    let message = '';
  
    if (!email || !password) {
      message = '*Email and password are required.';
        
        
      return { isValid: false, message };
    }
  
    if (!validateEmail(email)) {
      message = '*Invalid email address.';
    
      return { isValid: false, message };
    }
  
    if (!validatePassword(password)) {
      message = '*Password must be 2 characters with special character and uppercase';
    
      return { isValid: false, message };
    }
  
    if (!isSignInForm && !validateName(name)) {
      message = '*Full name is required.';
      return { isValid: false, message };
    }
  
    return { isValid : true, message: '' };
  };
  

