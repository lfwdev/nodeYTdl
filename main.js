const youtubedl = require('youtube-dl-exec')
const fs = require('fs');
// const Joi = require('joi');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.listen(port,() => console.log(`Listenning on port ${port}...`));

// Console will print the message
console.log('Server running at http://localhost:8080/');
console.log('Try http://localhost:8080/api/ydl/yIQcsvKnxqw');

const drive = 'downloads/';

app.get('/api/ydl/:id',(req, res) => {
   dl(req.params.id);
   return res.status(200).send();
});

function dl(youtubeLink) {
   Promise.resolve(youtubedl(youtubeLink, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: youtubeLink
   }).then(
      result => { 
         fs.writeFile(`${drive}${result.title}.json`,JSON.stringify(result),()=>{
            console.log('Processed: ',`${result.title} - ${result.creator}`); 
         })
      }
   ))
}
