// Laden der Umgebungvariablen
require('dotenv-extended').load();

// Importieren von notwendigen Modulen
var builder = require('botbuilder');
var restify = require('restify');

// Einstellen des restify Servers
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Cheatconnector einstellen 
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

//Bot einstellen mit einer Array von Funktionen
var bot = new builder.UniversalBot(connector, [
    function (session) {
        //Kategorien werden in einem Array gespeichert
        builder.Prompts.choice(session, 'Welche Kategorie möchten Sie sich anschauen?', CardNames, {
            maxRetries: 3,
            retryPrompt: 'Du hast Dich wohl vertippt. Versuch es nochmal'
        });
    },

    
    function (session, results) {

        // create the card based on selection
        var selectedCardName = results.response.entity;
        var card = createCard(selectedCardName, session);

        // attach the card to the reply message
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg);
    }
]);
//4 Hero Cards werden zur Verfügung gestellt
var HeroCardName1 = 'Digitale Transformation - Industrie';
var HeroCardName2= 'Digitale Transformation - Banken';
var HeroCardName3 = 'Digitale Transformation - Einzelhandel';
var HeroCardName4 = 'Digitale Transformation - Bots';

var CardNames = [HeroCardName1, HeroCardName2, HeroCardName3, HeroCardName4];

// Case Funktion, welche auf die Auswahl reagiert vom User

function createCard(selectedCardName, session) {
    switch (selectedCardName) {
        case HeroCardName1:
            return createHeroCard1(session);
        case HeroCardName2:
            return createHeroCard2(session);
        case HeroCardName3:
            return createHeroCard3(session);
        case HeroCardName4:
            return createHeroCard4(session);

        default:
            return createHeroCard4(session);
    }
}

// Standardfunktion zur Erstellung eines HeroCards
function createHeroCard1(session) {
    return new builder.HeroCard(session)
        .title('Digitale Transformation - Industrie')
        .subtitle('Jetzt oder Nie? Digitale Transformation!')
        .text('Die Industrie bebt. Ja, die digitale Transformation it bereits angekommen. Und viele Mitarbeiter müssen sich umschulen.')
        .images([
            builder.CardImage.create(session, 'http://internetretailing.de/wp-content/uploads/2017/02/innovative-maschine-272x182.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://internetretailing.de/digitale-transformation/digitale-transformation-in-der-industrie/', 'Lesen')
        ]);
}

function createHeroCard2(session) {
    return new builder.HeroCard(session)
        .title('Digitale Transformation Banken')
        .subtitle('Wie digital sollte eine Bank werden?')
        .text('Banken stehen unter Druck. Sie scheinen die digitale Transformation wegen den regulatorischen Themen zu verpassen.')
        .images([
            builder.CardImage.create(session, 'http://internetretailing.de/wp-content/uploads/2016/02/bank-1-300x216.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://internetretailing.de/digitale-transformation/digitale-transformation-bei-banken/', 'Lesen')
        ]);
}
function createHeroCard3(session) {
    return new builder.HeroCard(session)
        .title('Digitale Transformation - Einzelhandel')
        .subtitle('Online shops, wir kommen!')
        .text('Täglich steigt die Zahl der Händler, die online Ihre Waren präsentieren. Digitale Transformation hat im Einzelhandel sehr früh angefangen.')
        .images([
            builder.CardImage.create(session, 'http://internetretailing.de/wp-content/uploads/2015/10/Bild-Subway-272x182.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://internetretailing.de/digitale-transformation/digitale-transformation-im-einzelhandel/', 'Lesen')
        ]);
}

function createHeroCard4(session) {
    return new builder.HeroCard(session)
        .title('Digitale Transformation Bots')
        .subtitle('Branchenunabhängig werden Bots eingesetzt.')
        .text('Bots, Bots, Bots der Support von morgen? Ein Trendthema im Jahr 2017.')
        .images([
            builder.CardImage.create(session, 'http://internetretailing.de/wp-content/uploads/chat-bot-service-604x270.jpeg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://internetretailing.de/digitale-transformation/digitale-transformation-bots/', 'Lesen')
        ]);
}





     







