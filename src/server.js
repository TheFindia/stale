import * as Hapi from '@hapi/hapi';
import {loginRoute} from './controllers/login';
import {registerRoute} from './controllers/register';
import config from 'config';
import open from 'open';

var server = new Hapi.server({
    host: config.host,
    port: config.port
});

const init = async () => {
    try {
        console.log("hello");
        server.route([loginRoute, registerRoute]);
        await server.start();
        console.log("server started at: ", server.settings.port);

        if (process.env.NODE_ENV === 'localhost') { // eslint-disable-line no-process-env
            open(`http://${process.env.COMPUTERNAME}.jdnet.deere.com:${config.port}/login`); // eslint-disable-line no-process-env
        }

    } catch (err) {
        console.log(err)
    }
};

init();
