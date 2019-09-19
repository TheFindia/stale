import Nexmo from 'nexmo';

export const loginRoute = {
    path: '/login',
    method: 'GET',
    options: {
        handler: (request, h) => {
            console.log(request);
            const nexmo = new Nexmo({
                apiKey: '878bd97b',
                apiSecret: '17d4e80432b74b18'
            }, {debug:true});


            nexmo.message.sendSms(
                '12034848525',
                '+917767982950',
                'Hello from Nexmo',
                {type: 'unicode'},
                (err, a) => {
                     if(err) {
                         console.log('error', err);
                     } else {
                         console.log('success', a);
                     }
                }
            )
            return 0;
        }
    }
};

