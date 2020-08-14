const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'jain.jainsakshi31@gmail.com',
    subject: 'Welcome Message from Task Mangaer Api',
    text: `Hello ${name} , \n Thanks for joining in!!, Let me kow how you get along with the app.`
  })
}

const sendCancellationMail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'jain.jainsakshi31@gmail.com',
    subject: 'Sorry to see you go',
    text: `GoodBye ${name} , \n Thanks for joining us!!, We have regret for the inconvieninces you face , I hope to see you sometime soon!!.`
  })
}

module.exports = {
  sendWelcomeMail,
  sendCancellationMail
}
