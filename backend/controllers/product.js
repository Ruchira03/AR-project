const { nanoid } = require("nanoid");
const db = require("../Models");
const Product = db.product;
const firebase = require('../utils/firebaseDB')
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const storage = getStorage(firebase); // create a reference to storage
global.XMLHttpRequest = require("xhr2"); // must be used to avoid bug

// Add Image to Storage and return the file path
exports.addImage = (req, res) => {
    try {

        const product_id = nanoid(10);
        
        // Grab the file
        const file = req.file;
        const fileName = file.originalname;
        
         // Step 1. Create reference for file name in cloud storage 
        const imageRef = ref(storage, `${product_id}/${fileName}`)
       
        // Step 2. Upload the file in the bucket storage
        uploadBytes(imageRef, req.file.buffer).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            // Step 3. Grab the public url
                getDownloadURL(imageRef)
                .then((url) => {
                    console.log(url)
                    
                    const product = new Product({
                        product_id: product_id,
                        name: req.body.name,
                        desc : req.body.desc,
                        price : req.body.price,
                        model_3D_path : "",
                        image_path : url,
                        quantity : req.body.quantity,
                        category_id : req.body.category_id
                    })

                    product.save((err, category) => {
                        if (err) {
                            return console.log(err)
                        }
                        else{
                            res.status(200).send({ message: "Product Added successfully!", category_data : category});  
                        }    
                    }); 
                })
          });
        
        // res.send(downloadURL);
     }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}

