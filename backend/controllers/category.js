const { nanoid } = require("nanoid");
const db = require("../Models");
const Category = db.category;
const ErrorResponse = require("../utils/errorResponse");

exports.addCategory = (req, res, next) => {
    const name = req.body.name;
    Category.findOne({
        name : name.replace(/\s+/g,' ').trim()
    }).exec((err, category_found) => {
        if (err) {
            next(new ErrorResponse(err, 500)) 
        }
        if (category_found) {
            next(new ErrorResponse("Category Already Exists",401))
        }
        
        const category = new Category({
            category_id: nanoid(10),
            name: name,
            desc : req.body.desc 
        })

        category.save((err, category) => {
            if (err) {
                next(new ErrorResponse(err, 500))
            }
            else{
                res.status(200).send({ message: "Category Added successfully!", category_data : category});  
            }    
        }); 
    })
}