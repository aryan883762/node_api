const mongoose = require('mongoose')

module.exports = class DBManager {
    async connectToDatabase() {
        //const caBundle = fs.readFileSync("E:/Project/Project_Files/rds-combined-ca-bundle.pem", "utf8");
        //const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
        const testUri = process.env.MONGO_URL  //localmongoURL
        const options = {
            // ssl: true,
            // sslCA: caBundle,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        mongoose.connect(testUri, options)
            .then(client => {
                console.log("Connection Established !!");
            }).catch((error) => {
                console.log('Database connection failed !!')
            });
    }
}