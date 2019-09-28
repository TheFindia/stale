import * as Hapi from '@hapi/hapi';
import {loginRoute} from './controllers/login';
import {rootRoute} from './controllers/root';
import {usersRoute} from './controllers/users';
import config from 'config';
import open from 'open';
import {userPreferencesRoute} from './controllers/user-preferences';
import {citiesRoute} from './controllers/cities';

var server = new Hapi.server({
    host: config.host,
    port: config.port
});

const init = async () => {
    try {
        console.log("hello");
        server.route([rootRoute, loginRoute, ...userPreferencesRoute, ...usersRoute, ...citiesRoute]);
        await server.start();
        console.log("server started at: ", server.settings.port);

        if (process.env.NODE_ENV === 'localhost') {
            open(`localhost:${config.port}/login`);
        }

    } catch (err) {
        console.log(err)
    }
};

init();
