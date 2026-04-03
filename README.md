# ascension<sup>SYS</sup>
###### v. 1
Sistema configurabile per giochi di carte (deck building) come Ascension<sup>TM</sup>. Il seguente progetto, senza alcuna finalità di lucro, prevede un tavolo virtuale dove fino a 2 giocatori possono sfidarsi utilizzand le carte del gioco. Il progetto ha lo scopo di essere anche configurabile per creare giochi simili a patto che abbiano la stessa struttura.

#### Tecnologie utilizzate
- Angular 21;
- Angular Material cdk;
- Google Firebase (Firestore, Authentication, Hosting);
- Typescript;

#### Utenti e autorizzazioni
Per il progetto è previsto un solo tipo di utente, l'_autenticazione è necessaria_ per accedere al gioco (email + password). 

Modello dell'utente suggerito:

```typescript
export interface User {
  uid: string;
  nickname: string;
  statistics: Statistics;
  photoURL: string;
  playmatURL: string;
  createdAt: Timestamp; // Firebase Timestamp
  updatedAt: Timestamp; // Firebase Timestamp
}

interface Statistics {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
}
```

#### Firebase
Verrà utilizzato **Firestore** a supporto di tutto ciò che deve immagazzinare dati e **Firebase Authentication** per gestire l'autenticazione degli utenti. Il progetto sarà ospitato su **Firebase Hosting**.

#### Struttura del gioco
_Ascension_ prevede che due giocatori si sfidino ad accumulare più punti entro la fine della partita. Un _pool_ di punti determina anche la durata dello scontro, quando il _pool_ è esaurito la partita termina. Ad ogni turno i giocatori possono giocare carte per accumulare, temporaneamente, rune e potere da utilizzare rispettivamente per acquisire nuove carte e per sconfiggere mostri. Le carte acquistate finiscono in un mazzo personale, quando il mazzo è esaurito le carte vengono rimescolate e riutilizzate. Basandosi sulle combinazioni tra le varie carte un giocatore deve scegliere quelle giuste per ottenere il vantaggio sull'avversario. Il giocatore con più punti alla fine della partita vince.

Elementi chiave:

- **Due risorse**. Le _rune_ sono la monete di gioco, servono per acquistare nuove carte. Il _potere_ è la forza che permette di sconfiggere i mostri, più potere si ha più punti si ottengono. Le carte forniscono effetti più disparati oltre che rune e potere.
- **Pool di punti**. Una raccolta di punti non rende la partita infinita. Quando questi sono esauriti la partita termina. Anche le carte ottenute valgono dei punti vittoria che vanno sommati a quelli accumulati.
- **Fazioni**. Le carte sono divise in 4 fazioni, ognuna con caratteristiche e stili di gioco differenti. Alcune carte forniscono bonus se si possiedono altre carte della stessa fazione, questo rende importante la scelta delle carte da acquistare. 

<u>Questi elementi potranno essere configurabili ma ogni gioco coperto da questo sistema dovrà rispettare questa struttura di base.</u>

#### Configurabilità
Il Sistema è pensato per essere configurabile in alcune sue parti. Affinchè si possa creare un gioco diverso da _Ascension_ è necessario che questo rispetti la struttura di base descritta sopra.

Esempio di configurazione:

```json
{
    "id": "abcd1234",
    "version": "1.0.0",
    "author": "User",
    "createdAt": "2024-06-01T12:00:00Z",
    "updatedAt": "2024-06-01T12:00:00Z",
    "public": false,
    "gameTitle": "Ascension",
    "victoryPoints": 100,
    "resources": [
        {
            "name": "rune",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            "name": "power",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ],
    "factions": [
        {
            "name": "Light",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "hex": "#f5f5dc"
        },
        {
            "name": "Darkness",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "hex": "#000000"
        },
        {
            "name": "Void",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "hex": "#4b0082"
        },
        {
            "name": "Elemental",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "hex": "#ff4500"
        }
    ]
}
```

Lo stesso elenco delle carte sarà un JSON o un CSV che dovrà essere caricato per poter giocare. In questo modo sarà possibile creare giochi diversi da _Ascension_ purché rispettino la struttura di base descritta sopra. 

Tutti questi elementi di configurazione saranno caricati su Firebase, legati al proprio autore. Per poter giocare una configurazione sarà opportuno pubblicarla online tramite l'app e trovare un avversario. 

<u>Ancora da valutare come sarà possibile scegliere che gioco giocare e come trovarlo.</u>

#### Sviluppo
Ecco un elenco delle componenti fondamentali da sviluppare per arrivare ad avere una versione 1.0. funzionante:

- **Landing page**. Pagina di benvenuto, con possibilità di accedere o registrarsi (tramite dialog).
- **Home page** (Guard). Da questa pagina è possibile accedere alla propria area personale dove si trovano dialog dedicate alle _impostazioni_, agli _amici_ e alle _partite_. Da questa pagina si può arrivare a quella di gioco.
- **Game page**. Trovato un avversario e scelto il gioco si può effettivamente andare a giocare.
- **Chat**. Una chat per comunicare in tempo reale con l'avversario durante la partita.

#### Sviluppo futuro
- **Editor**. Un form di creazione di confugurazioni e mazzi di gioco direttamente in app, senza dover caricare file esterni.
- **Classifiche**. Una classifica globale o per gioco che mostri i migliori giocatori in base alle vittorie o ai punti accumulati.
- **Espansioni**. La possibilità di aggiungere pacchetti di carte aggiuntivi per arricchire l'esperienza di gioco. Questi pacchetti potrebbero essere creati dagli utenti o forniti dagli sviluppatori. La funzionalità principale sarà scegliere quali pacchetti di carte includere nella partita, in modo da personalizzare l'esperienza di gioco e aumentare la varietà delle partite.

#### Motore di gioco
Nessuno. Il sistema si limita a fornire un tavolo virtuale e a gestire le regole di base, ma non implementa un vero e proprio motore di gioco. Sarà compito dei giocatori rispettare le regole del gioco scelto e utilizzare le carte in modo corretto. Feature come _drag n drop_ e _timer_ possono essere implementate per rendere l'esperienza più fluida, ma non è previsto un sistema di controllo delle mosse o di intelligenza artificiale. Ogni interazione dell'utente viene salvata su firebase per mostrare all'avversario le mosse effettuate, ma non ci sarà un sistema di validazione o di controllo delle regole.