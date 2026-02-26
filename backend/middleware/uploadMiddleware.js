import multer from 'multer';



// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }       
};

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});

const upload = multer({ storage, fileFilter });

export default upload;