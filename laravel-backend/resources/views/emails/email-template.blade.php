<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cloud Bill App - OTP Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #4a90e2, #007bff);
      color: #fff;
      text-align: center;
      padding: 20px;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .content h3 {
      color: #007bff;
      margin-bottom: 10px;
    }
    .otp-box {
      background: #f1f5ff;
      border: 1px solid #cdddfc;
      border-radius: 8px;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      padding: 15px;
      margin: 20px 0;
      letter-spacing: 4px;
      color: #004aad;
    }
    .footer {
      background: #f9f9f9;
      text-align: center;
      padding: 15px;
      font-size: 13px;
      color: #777;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <h2>Cloud Bill App</h2>
      <p>Your trusted billing platform</p>
    </div>
    <div class="content">
      <h3>OTP Verification</h3>
      <p>Dear User,</p>
      <p>We received a request to verify your login for <strong>Cloud Bill App</strong>. Please use the following One-Time Password (OTP) to complete your verification process:</p>

      <div class="otp-box">{{$otp}}</div>

      <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share this code with anyone for security reasons.</p>

      <p>Thank you for using <strong>Cloud Bill App</strong>.<br>
      — The Cloud Bill Team</p>
    </div>
    <div class="footer">
      &copy; {{ date('Y') }} Cloud Bill App. All rights reserved.
    </div>
  </div>
</body>
</html>
