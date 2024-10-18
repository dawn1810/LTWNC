require('dotenv').config();

const aboutController = async (req, res) => {
    res.render('about', { header: 'header', footer: 'footer' });
};

export default aboutController;
