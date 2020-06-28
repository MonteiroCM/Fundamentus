const FundamentusService = require('./fundamentus')

function routes(App) {
    App.get('/api/fundamentus/ativo', FundamentusService.dadosAtivo)
}

exports.routes = routes