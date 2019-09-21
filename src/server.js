import * as Hapi from '@hapi/hapi';
import {loginRoute} from './controllers/login';
import {registerRoute} from './controllers/register';

var server = new Hapi.server({
    host: 'localhost',
    port: 3000
});

const init = async () => {
    try {
        console.log("hello");
        server.route([loginRoute, registerRoute]);
        await server.start();
        console.log("server started at: ", server.settings.port);
    } catch (err) {
        console.log(err)
    }
};

init();
