const { getFileName, handleUpload } = require('../helpers/upload');

module.exports = {
	singleUpload: async (req, res) => {
		try {
			const path = await getFileName(req, res);
			const cldRes = await handleUpload(path);
			res.send({ url: cldRes });
		} catch (error) {
			res.status(500).send('Cannot upload image');
		}
	}
};
