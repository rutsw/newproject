function check(form) {
    var c = document.getElementById("subject").value;
        console.log(c);
        if(c == "chosse")
        {
            alert("אנא בחר נושא");
            form.subject.focus();
            return false;
        }
    alert("תודה על פנייתך, נציג מטעמנו יצור עמך קשר בהקדם");
    return true;
}