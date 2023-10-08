document.addEventListener("DOMContentLoaded", function () {
    // Add your DOM-related JavaScript here
    // This function will be executed when the page is fully loaded.

    // Example DOM manipulation:
    // document.getElementById("elementId").addEventListener("click", function () {
    //     // Your code here
    // });

    // Form submission event listener
    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const formData = new FormData(event.target);

        // Send the data to the server-side script (you will need to implement this on your server)
        fetch("/sendEmail", {
            method: "POST",
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                alert("Email sent successfully!");
            } else {
                alert("Email could not be sent. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});


const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000; // Adjust the port as needed

app.use(bodyParser.urlencoded({ extended: false }));

// Create a route to handle form submissions
app.post("/sendEmail", (req, res) => {
    const formData = req.body;

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "teeshaduseja81@gmail.com", // Replace with your Gmail email address
            pass: "reetaranwal", // Replace with your Gmail password
        },
    });

    // Email content
    const mailOptions = {
        from: "your_email@gmail.com",
        to: "teeshaduseja81@gmail.com", // Destination email address
        subject: "Form Submission",
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nContact: ${formData.contact}\nMessage: ${formData.message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).send("Email could not be sent.");
        } else {
            console.log("Email sent:", info.response);
            res.status(200).send("Email sent successfully!");
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
