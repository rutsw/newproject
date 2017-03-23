function checkForm(form)
{
    if(form.password.value != "" && form.password.value == form.confirmpassword.value) {
          if(form.password.value.length < 6) {
            alert("Error: Password must contain at least six characters!");
            form.password.focus();
            return false;
          }
          if(form.password.value == form.username.value) {
            alert("Error: Password must be different from Username!");
            form.password.focus();
            return false;
          }
          re = /[0-9]/;
          if(!re.test(form.password.value)) {
            alert("Error: password must contain at least one number (0-9)!");
            form.password.focus();
            return false;
          }
    } 
    else {
      alert("Error: Please check that you've entered and confirmed your password");
      form.password.focus();
      return false;
    }
    
    return true;
}
