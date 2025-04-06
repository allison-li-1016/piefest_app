import azure.functions as func
import logging
import smtplib
import sys

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

HOST_EMAIL = "piefest2025@gmail.com"
HOST_PASSWORD = ""

@app.route(route="send_email")
def send_email(req: func.HttpRequest) -> func.HttpResponse:
    email = ""
    cred = ""
    try:
        req_body = req.get_json()
    except ValueError:
        return func.HttpResponse("Please provide json in the body", status_code=400)
    else:
        email = req_body.get('email')
        cred = req_body.get('cred')

    if not (email and cred):
        return func.HttpResponse(
             "Please provide an email and cred",
             status_code=400
        )

    auth = (HOST_EMAIL, HOST_PASSWORD)
 
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(auth[0], auth[1])

    message = ("Subject: Your info for pie-fest.com.\n\n" f"user: {email} \npassword: {cred}")
 
    output = server.sendmail(auth[0], email, message)

    return func.HttpResponse(f"Successfully sent email to {email} with output {output} and message {message}")
