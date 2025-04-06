import smtplib
import sys
 
EMAIL = "piefest2025@gmail.com"
PASSWORD = ""
 
def send_message(email, message):
    auth = (EMAIL, PASSWORD)
 
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(auth[0], auth[1])
 
    output = server.sendmail(auth[0], email, message)

    print(output)
 
 
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(f"Usage: python3 {sys.argv[0]} <EMAIL> <MESSAGE>")
        sys.exit(0)
 
    email = sys.argv[1]
    message = sys.argv[2]
    
    send_message(email, message)