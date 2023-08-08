const morgan = require('morgan');
const isDev = require('../isDev');
const colorize = status =>
    status >= 500
        ? '\x1b[31m' + status + '\x1b[0m'
        : status >= 400
        ? '\x1b[33m' + status + '\x1b[0m'
        : status >= 300
        ? '\x1b[36m' + status + '\x1b[0m'
        : status >= 200
        ? '\x1b[32m' + status + '\x1b[0m'
        : status >= 100
        ? '\x1b[34m' + status + '\x1b[0m'
        : status;
const colorizeItem = (item, value, color) => `${item}: ${color ? '\x1b[' + color + value + '\x1b[0m' : value}`;

const defaultFormat = (tokens, req, res) => `
    ${colorizeItem('Method', tokens.reqMethod(req), '31m')}
    ${colorizeItem('URL', tokens.reqUrl(req), '32m')}
    Status: ${colorize(tokens.resStatus(req, res))}
    ${colorizeItem('Response Seconds', tokens.resTime(req, res).toFixed(2) + 'ms', '34m')}
    ${colorizeItem('Request Body', tokens.reqBody(req), '35m')}
    ${colorizeItem('Request Query', tokens.reqQuery(req), '36m')}
    ${colorizeItem('Request Params', tokens.reqParams(req), '36m')}
     `;
morgan.token('reqId', req => req.reqId);
morgan.token('reqIp', req => req.ip);
morgan.token('reqBody', req => JSON.stringify(req.body));
morgan.token('remoteAddress', req => req.headers['x-forwarded-for'] || req.connection.remoteAddress);
morgan.token('userAgent', req => req.headers['user-agent']);
morgan.token('reqMethod', req => req.method);
morgan.token('reqUrl', req => req.originalUrl);
morgan.token('reqProtocol', req => req.protocol);
morgan.token('reqHost', req => req.hostname);
morgan.token('reqPath', req => req.path);
morgan.token('reqQuery', req => JSON.stringify(req.query));
morgan.token('reqParams', req => JSON.stringify(req.params));
morgan.token('reqHeaders', req => JSON.stringify(req.headers));
morgan.token('resStatus', (req, res) => res.statusCode);
morgan.token('resStatusMessage', (req, res) => res.statusMessage);
morgan.token('resBody', (req, res) => JSON.stringify(res.body));
morgan.token('resHeaders', (req, res) => JSON.stringify(res.getHeaders()));
morgan.token('resTime', (req, res) => res.responseTime);
morgan.token('resContentLength', (req, res) => res.get('Content-Length'));
morgan.token('resContentType', (req, res) => res.get('Content-Type'));
morgan.token('resContentEncoding', (req, res) => res.get('Content-Encoding'));
morgan.token('resContentLanguage', (req, res) => res.get('Content-Language'));
morgan.token('resContentDisposition', (req, res) => res.get('Content-Disposition'));
morgan.token('resContentRange', (req, res) => res.get('Content-Range'));
morgan.token('resContentLocation', (req, res) => res.get('Content-Location'));
morgan.token('resContentVersion', (req, res) => res.get('Content-Version'));
morgan.token('resContentSecurityPolicy', (req, res) => res.get('Content-Security-Policy'));
morgan.token('resContentSecurityPolicyReportOnly', (req, res) => res.get('Content-Security-Policy-Report-Only'));

morgan.format('json', (tokens, req, res) =>
    JSON.stringify({
        reqId: tokens.reqId(req),
        reqIp: tokens.reqIp(req),
        reqBody: tokens.reqBody(req),
        remoteAddress: tokens.remoteAddress(req),
        userAgent: tokens.userAgent(req),
        reqMethod: tokens.reqMethod(req),
        reqUrl: tokens.reqUrl(req),
        reqProtocol: tokens.reqProtocol(req),
        reqHost: tokens.reqHost(req),
        reqPath: tokens.reqPath(req),
        reqQuery: tokens.reqQuery(req),
        reqParams: tokens.reqParams(req),
        reqHeaders: tokens.reqHeaders(req),
        resStatus: tokens.resStatus(req, res),
        resStatusMessage: tokens.resStatusMessage(req, res),
        resBody: tokens.resBody(req, res),
        resHeaders: tokens.resHeaders(req, res),
        resTime: tokens.resTime(req, res),
        resContentLength: tokens.resContentLength(req, res),
        resContentType: tokens.resContentType(req, res),
        resContentEncoding: tokens.resContentEncoding(req, res),
        resContentLanguage: tokens.resContentLanguage(req, res),
        resContentDisposition: tokens.resContentDisposition(req, res),
        resContentRange: tokens.resContentRange(req, res),
        resContentLocation: tokens.resContentLocation(req, res),
        resContentVersion: tokens.resContentVersion(req, res),
        resContentSecurityPolicy: tokens.resContentSecurityPolicy(req, res),
        resContentSecurityPolicyReportOnly: tokens.resContentSecurityPolicyReportOnly(req, res),
    })
);

module.exports = morgan(isDev ? defaultFormat : 'json', {
    stream: isDev ? null : require('./winston').stream,
});
