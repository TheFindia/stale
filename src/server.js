import * as Hapi from '@hapi/hapi';
import config from 'config';
import open from 'open';
import requireDir from 'require-dir';

var server = new Hapi.server({
    host: config.host,
    port: config.port
});

const getEndpoints = () => {
    const controllers = requireDir('./controllers');

    return Object.values(controllers)
        .reduce((acc, controller) => {
            return acc.concat(controller.endpoints);
        }, [])
};

const init = async () => {
    try {
        console.log("hello");
        server.route(getEndpoints());
        await server.start();
        console.log("server started at: ", server.settings.port);

        if (process.env.NODE_ENV === 'localhost') {
            open(`http://localhost:${config.port}/login`);
        }

    } catch (err) {
        console.log(err)
    }
};

init();
