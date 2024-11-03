require('dotenv').config();

const contactController = async (req, res) => {
    const session = await req.session;

    res.render('contact', { header: 'header', footer: 'footer', user: session.user });
};

export default contactController;
