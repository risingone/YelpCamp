const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors,places} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30)+20;
        const camp = new Campground({
            author: '62669e09eca9eea6df023e99',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'The accommodation provided is world class and the tents simply leave you connecting with nature like never before!',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dfmnz0mof/image/upload/v1651168830/YelpCamp/jctvoc0iupng83lrswri.jpg',
                  filename: 'YelpCamp/jctvoc0iupng83lrswri'
                },
                {
                  url: 'https://res.cloudinary.com/dfmnz0mof/image/upload/v1651168829/YelpCamp/sb0mm81ufcod6do0yqui.jpg',
                  filename: 'YelpCamp/sb0mm81ufcod6do0yqui'
                },
                {
                  url: 'https://res.cloudinary.com/dfmnz0mof/image/upload/v1651168829/YelpCamp/ayykkr4hy5ol2tuoexd1.jpg',
                  filename: 'YelpCamp/ayykkr4hy5ol2tuoexd1'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});