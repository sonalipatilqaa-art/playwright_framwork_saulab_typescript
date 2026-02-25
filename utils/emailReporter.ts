import { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import nodemailer from 'nodemailer';

class EmailReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'passed') {
      await sendEmailNotification(test.title);
    }
  }
}

async function sendEmailNotification(testTitle: string) {
  // Configure the transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sonalipatil.qaa@gmail.com', // Replace with your email
      pass: 'YOUR_APP_PASSWORD' // Replace with your app password
    }
  });

  // Email options
  let mailOptions = {
    from: 'sonalipatil.qaa@gmail.com',
    to: 'sonalipatil.qaa@gmail.com',
    subject: 'Playwright Test Passed',
    text: `The test "${testTitle}" has passed successfully.`
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

export default EmailReporter;
