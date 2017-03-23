function checkForm(form)
{
    if(form.password.value != "" && form.password.value == form.confirmpassword.value) {
          if(form.password.value.length < 6) {
            alert("שגיאה: סיסמא צריכה להכיל לפחות 6 תוים");
            form.password.focus();
            return false;
          }
          if(form.password.value == form.username.value) {
            alert("שגיאה: סיסמא צריכה להיות שונה משם משתמש");
            form.password.focus();
            return false;
          }
          re = /[0-9]/;
          if(!re.test(form.password.value)) {
            alert("(שגיאה: סיסמא צריכ להכיל לפחות סיפרה אחת (0-9");
            form.password.focus();
            return false;
          }
    } 
    else {
      alert("שגיאה: אנא בדוק הכנסת סיסמא ואימותה");
      form.password.focus();
      return false;
    }
    
    return true;
}
