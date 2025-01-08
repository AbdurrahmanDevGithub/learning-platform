// const multer = require('multer');

// // Storage configuration
// const storage = multer.memoryStorage(); // Store files in memory for processing

// // File filter for validation
// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file type!'), false);
//   }
// };

// // Multer middleware
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
// });

// module.exports = upload;


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0]; // Check the type of file (e.g., 'image', 'video')
    let uploadPath;

    if (fileType === 'image') {
      uploadPath = path.join(__dirname, '../Public/Uploads/Images');
    } else if (fileType === 'video') {
      uploadPath = path.join(__dirname, '../Public/Uploads/Videos');
    } else {
      return cb(new Error('Invalid file type'), false); // Handle invalid file types
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
