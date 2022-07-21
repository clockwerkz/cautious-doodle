(function() {
  const newsletterCheckbox = document.getElementById("newsletter");
  const email = document.getElementById("email");
  const submitBtn = document.querySelector("button");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const commentBox = document.getElementById("submission-comments");
  const toast = document.querySelector(".toast");
  const toastText = document.querySelector(".toast-text");
  let timerId = null;

  function isValidInput(){
    return firstName.value.trim().length >= 1 && lastName.value.trim().length >= 1;
  }

  function displayToast({ text, error = false}){
    if (error){
      toast.classList.add("toast-error");
    } else {
      toast.classList.remove("toast-error");
    }
    toastText.textContent = text;
    if (timerId) return;
    toast.classList.add("show");
    timerId = setTimeout(()=>{
      toast.classList.remove("show");
      timerId = null;
    }, 2000);
  }

  function clearInput() {
    firstName.value = '';
    lastName.value = '';
    commentBox.value = '';
    email.value = '';
    if (!email.classList.contains('hide')) {
      email.classList.add('hide');
      email.tabIndex = -1;
      email.ariaHidden = true;
    }
    newsletterCheckbox.checked = false;
    submitBtn.disabled = true;
    firstName.focus();
  }

  function submitUserInfo(){
    const url = 'https://jsonplaceholder.typicode.com/users';
    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
      isSubscribed: newsletterCheckbox.checked,
      comment: commentBox.value
    };
    if (newsletterCheckbox.checked){
      body.email = email.value;
    }
    fetch(url, {
      method: 'POST',
      body
    })
    .then(res => res.json())
    .then(data => {
      displayToast({ text: `Thanks for your submission, ${firstName.value}!` });
      clearInput();
    })
    .catch(error => displayToast({ text: "Oops, something went wrong!", error: true }));
  }

  newsletterCheckbox.addEventListener("click", ()=>{
    email.classList.toggle('hide');
    if (!newsletterCheckbox.checked){
      email.tabIndex = -1;
      email.ariaHidden = true;
    } else {
      email.tabIndex = 0;
      email.ariaHidden = false;
    }
  });

  [firstName, lastName].forEach(inputField => {
    inputField.addEventListener("input", ()=>{
      submitBtn.disabled = !isValidInput(); 
    })
  })

  document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    submitUserInfo();
  });
})();