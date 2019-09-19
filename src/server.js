import * as Hapi from '@hapi/hapi';
import {loginRoute} from "./controllers/login";

var server = new Hapi.server({
    host: 'localhost',
    port: 3000
});

const init = async () => {
    try {
        console.log("hello");
        server.route([loginRoute()]);
        await server.start();
        console.log("server started at: ", server.settings.port);
    } catch (err) {
        console.log(err)
    }
};

init();