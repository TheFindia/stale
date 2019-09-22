export const rootRoute = {
    path: '/',
    method: 'GET',
    options: {
        handler: (request, h) => {
            console.log('in root', h);
            return h.redirect('/login');
        }
    }
};
