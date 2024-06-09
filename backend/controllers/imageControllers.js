const imageModel = require("../models/imageModel");

const generateImage = async (req, res) => {
    const body = req.body;
    const searchText = body.searchText;
    const userId = body.userId;
    console.log({ searchText, userId });

    let imageUrl = "";
    try {
        const res = await fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${searchText}`, {
            headers: {
                Authorization: `Client-ID ${process.env.ACCESS_TOKEN}`
            }
        });
        // console.log(res);
        const data = await res.json();
        // console.log(data);
        const photos = data.results;
        const randomIndex = Math.floor(Math.random() * photos?.length);
        const randomPhoto = photos[randomIndex];
        imageUrl = randomPhoto.urls.regular
        imageModel.create({ searchText, imageUrl, userId });

    }
    catch (err) {
        console.log(err);
    }

    res.json({
        status: 'success',
        data: {
            imageUrl: imageUrl,
        }
    })
}

const getImageHistory = async (req, res) => {
    try {
        const userId = req.query.userId;
        const images = await imageModel.find({ userId });

        if (!images.length) {
            return res.status(404).json({ message: 'No images found for this user.' });
        }

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching image history', error: error });
    }
};



module.exports = {
    generateImage,
    getImageHistory
}