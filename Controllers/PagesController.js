
const get_landing_page = (req,res)=>{
    res.render('landingpage');
}
const get_allpics = (req,res)=>{
    res.render('Allpics');
}
module.exports = {
    get_landing_page,get_allpics
}