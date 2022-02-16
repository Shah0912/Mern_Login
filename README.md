A simple login system using the mern stack.

The project is deployed at https://loginsystem5862.herokuapp.com/

# Work Flow

- On the landing page, the user is first presented with a login form. Here the user can either input login details if already registered. They also have options to either reset the password if they have forgotten it or to go to the Signup page.
- If, the user clicks on the Sign-Up button, the form transitions into a signup form. Here users can input details such as Name, email-id, password and click on signup. Once registered successfully, the success message is shown, and the form automatically transitions back to the login form for the user to log in.
- If the user selects the forgot-password option, the form transitions into a forgot password form. Here the user can input their registered email id. If valid, the user is sent a link via email to their registered email id to reset their password, and a success message is displayed.
- Once the user clicks on the reset password link sent to their email, which is valid only for a fixed time, they are redirected to a reset password page. Here they are given the input to enter their new password. Once submitted, a success message is shown, and the user is redirected automatically back to the landing page, from where they can log in using their new password.
- If the user inputs a valid email-id and password, a welcome message is shown indicating successful login into the system.
- At any point, if there is any invalid input given to the system, an error message is displayed to the user in the form of toast notifications.
