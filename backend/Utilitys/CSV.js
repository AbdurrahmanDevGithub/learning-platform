const fs = require('fs');
const csvParser = require('csv-parser');
const CourseCsv = require('../models/CourseCSV.model');

const loadCSVData = () => {
  fs.createReadStream('course.csv')
    .pipe(csvParser())
    .on('data', async (row) => {
      try {
        await CourseCsv.updateOne(
          { _id: row._id },
          { ...row },
          { upsert: true }
        );
      } catch (err) {
        console.error('Error saving data:', err);
      }
    })
    .on('end', () => {
      console.log('CSV file data loaded into MongoDB.');
    });
};

module.exports = loadCSVData;
