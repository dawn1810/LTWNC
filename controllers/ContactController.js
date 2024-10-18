require('dotenv').config();

const contactController = async (req, res) => {
    res.render('contact', { header: 'header', footer: 'footer' });
};

export default contactController;
