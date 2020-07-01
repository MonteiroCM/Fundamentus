const FundamentusService = require('./fundamentus')

function routes(App) {
    App.get('/api/fundamentus/ativo', FundamentusService.dadosAtivo)
    App.get('/api/fundamentus/listaativo', FundamentusService.listaAtivos)
}


exports.routes = routes