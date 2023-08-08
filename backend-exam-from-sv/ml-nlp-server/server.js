/* !
Bu api kullanıcı şikayet oluştururken kullanılacak. Şikayet oluşturduğu sırada dil işleme modelleri ile birlikte girilen metinleri analiz ederek
1 - Şikayetin kategorisini belirler
2 - Şikayetin içeriğini analiz eder
3 - Şikayetin içeriğindeki kelimeleri analiz eder
4 - Şikayetin içeriğindeki kelimelerin anlamlarını analiz eder
5 - Küfür filtresi uygular
6 - Kişisel verileri analiz eder
7 - Şikayetin hangi kategoride olduğunu belirler
8 - Şikayetin hangi markaya ait olduğunu belirler
9 - Şikayetin hangi ürüne ait olduğunu belirler
...more

** Natural Language Processing (NLP) **
** Machine Learning (ML) **
! */
'use strict';

const fastify = require('fastify')({logger: true});
const webSocket = require('@fastify/websocket');
const cors = require('@fastify/cors');

const webSocketOptions = {
    options: {
        maxPayload: 1048576, // 1MB
    },
};

const corsOptions = {
    origin: '*',
};

fastify.register(cors, corsOptions);

fastify.register(webSocket, webSocketOptions);

fastify.get('/', () => {
    return {
        success: true,
        message: 'Welcome To The Socket API',
    };
});
fastify.register(async function (fastify) {
    await fastify.get('/ws', {websocket: true}, (connection, req) => {
        connection.socket.on('message', message => {
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage);
            connection.socket.send(JSON.stringify({message: 'Hello from server'}));
        });
    });
});

fastify.listen({port: 5002}, err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`server listening on ${fastify.server.address().port}`);
});
