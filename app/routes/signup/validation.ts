export const validateCredentials = (email: string, password: string) => {
    const errors: {email?: string, password? : string} = {};
    if(!email) {
      errors.email = "Email is required";
    } else if(!email.toString().includes("@")) {
      errors.email = "Invalid Email";
    }

    if(!password) {
      errors.password = "Enter password";
    } else if (password.toString().length < 8) {
      errors.password = "Weak password";
    }

    return Object.keys(errors).length > 0 ? errors : null;
}