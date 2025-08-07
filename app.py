from flask import Flask, render_template, url_for, request
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/services")
def services():
    return render_template("services.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    success = False
    if request.method == "POST":
        name = request.form.get("name")
        phone = request.form.get("phone")
        email = request.form.get("email")
        service = request.form.get("service")
        message = request.form.get("message")

        # Email config
        sender_email = "garv.mittal07@gmail.com"  # Replace with your email
        receiver_email = "sales.hemanttyrezone91@gmail.com"  # Replace with your email
        smtp_server = "smtp.gmail.com"    # Change if not using Gmail
        smtp_port = 587
        smtp_user = "garv.mittal07@gmail.com"  # Replace with your email
        smtp_password = "eraopwjnyjkvpxxp"  # Replace with your email password or app password

        subject = f"New Contact Inquiry from {name}"
        body = f"""
        Name: {name}
        Phone: {phone}
        Email: {email}
        Service Needed: {service}
        Message: {message}
        """

        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
            server.quit()
            success = True
        except Exception as e:
            print("Error sending email:", e)
            success = False

    return render_template("contact.html", success=success)
