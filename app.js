const newsletterCheckbox = document.getElementById("newsletter");
const email = document.getElementById("email");
const submitBtn = document.querySelector("button");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");

function isValidInput(){
  return firstName.value.trim().length >= 1 && lastName.value.trim().length >= 1;
}

newsletterCheckbox.addEventListener("click", ()=>{
  email.classList.toggle('hide');
});

[firstName, lastName].forEach(inputField => {
  inputField.addEventListener("input", ()=>{
    submitBtn.disabled = !isValidInput(); 
  })
})

document.querySelector("form").addEventListener("submit", (e)=>{
  e.preventDefault();
  console.log("[DEBUG] checkbox status", newsletterCheckbox.checked);
})