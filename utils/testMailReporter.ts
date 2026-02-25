import { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import nodemailer from 'nodemailer';

class TestMailReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'passed') {
      try {
        await sendTestMailNotification(test.title);
      } catch (err) {
        // Log error but do not throw, so test run does not fail
        console.error('Email notification failed:', err);
      }
    }
  }
}

async function sendTestMailNotification(testTitle: string) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testmail.random123@gmail.com',
      pass: 'RANDOM_APP_PASSWORD'
    }
  });

  let mailOptions = {
    from: 'testmail.random123@gmail.com',
    to: 'testmail.random123@gmail.com',
    subject: 'Playwright Test Passed (Test Mail)',
    text: `The test "${testTitle}" has passed successfully.`
  };

  await transporter.sendMail(mailOptions);
}

export default TestMailReporter;
