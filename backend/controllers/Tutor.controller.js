const tutorServices = require('../services/Tutor.services');

const Controller = {
  uploadCourse: async (req, res) => {
    try {
      const { category, title, tutor, duration, description } = req.body;

      const tutorId = req.user.id

      // Access uploaded files
      const imageFile = req.files?.image ? req.files.image[0] : null;
      const videoFile = req.files?.video ? req.files.video[0] : null;

      let image = null;
      let video = null;

      // Process image file
      if (imageFile) {
        const base64Image = imageFile.buffer.toString('base64');
        image = {
          filename: imageFile.originalname,
          content: base64Image,
        };
      }

      // Process video file
      if (videoFile) {
        const base64Video = videoFile.buffer.toString('base64');
        video = {
          filename: videoFile.originalname,
          path: `uploads/videos/${videoFile.originalname}`, // Set the path
          content: base64Video,
        };
      }
      

      const details = {
        category,
        title,
        tutor,
        duration,
        description,
        image,
        video,
        tutorId
      };

      const data = await tutorServices.uploadCourse(details);
      return res.status(201).json({ msg: 'Course uploaded successfully', data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error in uploadCourse controller' });
    }
  },

  updateCourse:async(req,res)=>{
    try{
      const {id} = req.params;
      const tuterId = req.user.id;
      const  { category, title, tutor, duration, description } = req.body;
      
      const imageFile = req.files?.image ? req.files.image[0] : null;
      const videoFile = req.files?.video ? req.files.video[0] : null;

      let image = null;
      let video = null;

      // Process image file
      if (imageFile) {
        const base64Image = imageFile.buffer.toString('base64');
        image = {
          filename: imageFile.originalname,
          content: base64Image,
        };
      }

      // Process video file
      if (videoFile) {
        const base64Video = videoFile.buffer.toString('base64');
        video = {
          filename: videoFile.originalname,
          path: `uploads/videos/${videoFile.originalname}`, // Set the path
          content: base64Video,
        };
      }


      const details = {
        category,
        title,
        tutor,
        duration,
        description,
        image,
        video,
        tuterId
      }

      const data = await tutorServices.updateCourse(id,details)
      return res.json({data})

    }catch(error){
      console.log(err);
    }
  },

  deleteCourse:async(req,res)=>{
    try{
      const {id} = req.params;
      const deletedId = await tutorServices.deleteCourse(id)
      res.json({deletedId})
    }catch(error){
      console.log(error,"Error in deleteCourse controller");
    }
  },

  fetchCourses:async(req,res)=>{
    try{
      const tutorId = req.user.id;
      const data = await tutorServices.fetchCourses(tutorId)
      res.json({data})
    }catch(error){
      console.log(error,"Error in deleteCourse controller");
    }
  }  

}

module.exports = Controller;
