import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '5aeed324f8ca4e2cacd73d56d92549b5'
   });
  
const handleAPI = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(400).json('Can not work with API');
        });
}

export default handleAPI;