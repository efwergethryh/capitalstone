const Product = require('../Models/Product')
const get_landing_page = (req,res)=>{
    res.render('landingpage');
}
const get_allpics = (req,res)=>{
    Product.find().then((result)=>{
        console.log(result);
        res.render('Allpics',{products:result}); 
    });
}
const dashboard_page = (req,res)=>{
    res.render('dashboard/mainPage')
}
module.exports = {
    get_landing_page,get_allpics,dashboard_page
}