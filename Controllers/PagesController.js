const Product = require('../Models/Product')
const get_landing_page = (req,res)=>{

    Product.find().then((result)=>{
        console.log(result);
        res.render('landingpage',{products:result}); 
    });
}
const get_allpics = (req,res)=>{
    Product.find().then((result)=>{
        console.log(result);
        res.render('Allpics',{products:result}); 
    });
}
const dashboard_page = (req,res)=>{
    Product.find().then((result)=>{
        console.log(result);
        res.render('dashboard/mainPage',{products:result}); 
    });
}
module.exports = {
    get_landing_page,get_allpics,dashboard_page
}