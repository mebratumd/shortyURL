window.onload = () => {

  let form = document.getElementById('urlForm');
  let errors = document.querySelector('.alert-danger');
  let success = document.querySelector('.alert-success');


  form.addEventListener('submit', async ($event) => {

    $event.preventDefault();

    const response = await fetch("http://localhost:5000/short",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url:$event.target[0].value})
    });

    response.json().then((resObject) => {

      if (resObject.success && response.ok) {

        const classesDivError = errors.className.split(" ");
        if (classesDivError.indexOf('inactive') == -1) {
          errors.classList.toggle('inactive');
        }


        const classesDivSuccess = success.className.split(" ");
        if (classesDivSuccess.indexOf('inactive') != -1) {
          success.classList.toggle('inactive');
        }

        success.innerHTML = `😊 Share this Shorty URL with others: ${resObject.truncated}`;

      } else {
        // error
        throw new Error(resObject.errors[0].msg);

      }
    }).catch((err) => {

      const classesDivSuccess = success.className.split(" ");
      if (classesDivSuccess.indexOf('inactive') == -1) {
        success.classList.toggle('inactive');
      }

      const classesDivError = errors.className.split(" ");
      if (classesDivError.indexOf('inactive') != -1) {
        errors.classList.toggle('inactive');
      }

      errors.innerHTML = err.message;


    });



  })
}
