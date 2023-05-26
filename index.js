const fs = require('fs');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Email configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Set to true if using SSL/TLS
  auth: {
    user: 'opbwebapp@gmail.com',
    pass: 'xguaswnbevxxwwic',
  },
});

// Function to check file count and send email if necessary
const checkFileCount = (folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    const fileCount = files.length;

    // Check if the file count has increased
    if (fileCount > checkFileCount.prevCount) {
      checkFileCount.prevCount = fileCount;
    } 
    else if (fileCount === checkFileCount.prevCount) {
      // File count remains the same, send email notification
      const mailOptions = {
        from: 'opbwebapp@gmail.com',
        to: ['rafaykhan3015@gmail.com','rafaykhan3012@gmail.com'],
        subject: 'File count not increasing',
        text: 'The file count in the specified folder is not increasing.',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
  });
};

// Initialize previous file count
checkFileCount.prevCount = 0;

// Schedule the method to run every 10 minutes
cron.schedule('*/1 * * * *', () => {
    console.log('Running a task every 10 minutes');
  checkFileCount('/Users/Abdul Rafay/Documents/Publish/.Net/Dawlance_tech/WEB');
});
