import { FullResult, Reporter } from '@playwright/test/reporter';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

class DailyAllureEmailReporter implements Reporter {
  private static sentToday = false;

  async onEnd(result: FullResult) {
    if (result.status === 'passed' && !DailyAllureEmailReporter.sentToday) {
      DailyAllureEmailReporter.sentToday = true;
      await sendAllureReportEmail();
    }
  }
}

async function sendAllureReportEmail() {
  // Find the latest Allure report zip or HTML folder
  const allureResultsDir = path.resolve(__dirname, '../allure-results');
  // You may need to generate the Allure report before sending
  // For now, just attach all files in allure-results as a zip
  const files = fs.readdirSync(allureResultsDir).map(f => path.join(allureResultsDir, f));

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sonalipatil.qaa@gmail.com',
      pass: 'YOUR_APP_PASSWORD'
    }
  });

  let mailOptions = {
    from: 'sonalipatil.qaa@gmail.com',
    to: 'sonalipatil.qaa@gmail.com',
    subject: 'Daily Playwright Allure Report - All Tests Passed',
    text: 'All tests passed. Please find the Allure results attached.',
    attachments: files.map(file => ({
      filename: path.basename(file),
      path: file
    }))
  };

  await transporter.sendMail(mailOptions);
}

export default DailyAllureEmailReporter;
