const axios = require("axios");

module.exports = async (req, res) => {
    try {
        const { data } = await axios.post("https://api.zaddy.dev/upload_pdf", req.body, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload file" });
    }
};
