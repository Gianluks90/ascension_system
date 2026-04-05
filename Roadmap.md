# Roadmap
###### v.1

## Versione 0.0.1 - Initial commit, setup del progetto
- [x] Aggiornare Angular all'ultima versione disponibile;
- [x] Aggiornare Node.js all'ultima versione disponibile;
- [x] Creare una nuova app Angular con `ng new ascension-system --skip-tests`;
- [x] Creare cartelle necessarie dentro `src/app` per organizzare gli elementi: `components\ui`, `components\shared`, `services`, `models`, `pages`, `consts`;
- [x] Creare un file dentro `consts` chiamato `app-version.ts` per tenere traccia della versione dell'app. Al suo interno esportare una costante `APP_VERSION` con il numero di versione attuale dell'app;
- [x] Creare un nuovo progetto Firebase per iniziare la configurazione;
- [x] Installare Firebase `npm i firebase`;
- [x] Installare FirebaseTools `npm i -g firebase-tools`;
- [x] Creare un file dentro `consts` chiamato `firebase-config.ts` per salvare la configurazione di Firebase;
- [x] Creare un nuovo servizio dentro `services` chiamato `firebase.ts` con `ng generate service services/firebase`. Il servizio si occuperà di inizializzare Firebase e di esportare un'istanza del database per poterlo usare in tutta l'app, iniettarlo nel costruttore di `app.ts`;

```typescript
@Injectable({
  providedIn: "root",
})
export class Firebase {
  constructor() {
    const app = initializeApp(FIREBASE_CONFIG);
  }
}
```

- [x] (Opzionale) In package.json aggiungere i comandi npm run `host` per buildare e deployare su Firebase (`npm run build && firebase deploy --only hosting` per deployare online);

> È buona prassi nominare le costanti di questo genere con tutte le lettere maisucole e gli underscore al posto degli spazi, in questo modo è facile riconoscerle all'interno del codice e si capisce subito che si tratta di valori che non devono essere modificati.

- [x] Creare una cartella `images` dentro `public` per le immagini statiche;
- [x] _Installare_ le Material Symbols Icons tramite link nell'head (link dinamico, style rounded, istruzioni [qui](https://fonts.google.com/icons?icon.size=24&icon.color=%23e3e3e3&icon.style=Rounded&icon.set=Material+Symbols)); 
- [x] Resettare lo stile globale in `styles.scss` per avere una base pulita su cui lavorare, ad esempio:

```scss
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
}
```
- [x] Terminare configurazione su console firebase prima di procedere a collegare il progetto Angular tramite `firebase login` e `firebase init`. PRIMA di eseguire questi comandi assicurarsi di essere nella cartella di progetto, quindi appena fuori dalla cartella `src`;
- [x] Build e Deploy su Firebase (`npm run host` se abbiamo aggiunto lo script in angular.json, altrimenti `firebase deploy --only hosting`).
- [x] Prima commit su main;
- [x] Nuovo branch `dev` per lo sviluppo delle funzionalità basato su main;
- [x] Nuovo branch `feature/landing-page` per sviluppare la landing page basato su `dev`;

<u>Per ora ignorare responsive design.</u>

## Versione 0.0.2 - Landing page + UI components
- [x] Aggiornare versione dell'app nella costante dedicata;
- [x] Creare un nuovo componente dentro `pages` chiamato `landing-page` con `ng generate component pages/landing-page`;
- [x] Ripulire `app.html` da tutto eccetto che da `<router-outlet></router-outlet>`;
- [x] Nuova route dentro `app.routes.ts` '' (come stringa vuota) per la landing page e legare il nuovo componente a questa route;
- [x] _Wildcard_ route per reindirizzare a '' in caso di route non trovata;

```typescript
// esempio di routes;
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing-page').then(m => m.LandingPage)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
```

- [x] Mostrare al centro della pagina il titolo "Ascension<sup>SYS</sup>" e l'`APP_VERSION` come sottotitolo (`import { APP_VERSION } from '../consts/app-version';`);
- [x] Creare un nuovo componente dentro `components/ui` chiamato `base-btn` con `ng generate component components/ui/base-btn`. Il componente prende in _input_: `label`, `icon` (opzionale), `fullWidth` (booleano, opzionale, default false), `disabled` (booleano, opzionale, default false) e _output_: `clicked`. Il componente ha una sola funzione `handleClick()` che emette l'evento `clicked`. Compilare anche il template con un `button` che mostra la label e l'icona se presente, e che chiama `handleClick()` al click. Il bottone deve essere disabilitato se `disabled` è true e deve occupare tutta la larghezza del contenitore se `fullWidth` è true;

```typescript
// esempio di input e output per il componente base-btn;
public label = input<string>('missing-label');
public clicked = output<void>();
```

- [x] Creare un nuovo componente dentro `components/ui` chiamato `icon-btn` con `ng generate component components/ui/icon-btn`. Il componente prende in _input_: `icon`, `disabled` (booleano, opzionale, default false) e _output_: `clicked`. Il componente ha una sola funzione `handleClick()` che emette l'evento `clicked`. Compilare anche il template con un `button` che mostra la label e l'icona se presente, e che chiama `handleClick()` al click. Il bottone deve essere disabilitato se `disabled` è true;

>`Components/ui` lo usiamo per tutti quei componenti grafici che non hanno una logica specifica, tendenzialmente avranno tanti input per personalizzarli e un output `clicked` per gestirne il click. Qui dentro quindi vanno bene: bottoni, contenitori, card, ecc... L'importante è che inserendoli qui si abbia l'intenzione di riusarli in vari punti.

- [x] Inserire i due nuovi componenti nella pagina in alto a destra in un contenitore. Il `base-btn` con label "Accedi" e icona di "login", il `icon-btn` con icona "dark_mode", per ora non fanno nulla al click;

> Normalmente ogni nuovo progetto nasce con una branch di origine chiamata `main` o `master` che viene usata per le release. Creando una branch `dev` basata su `main` possiamo sviluppare tutte le funzionalità su `dev` e fare merge su `main` solo quando vogliamo rilasciare una nuova versione stabile. Per ogni nuova funzionalità invece è buona pratica creare una branch dedicata basata su `dev`, in questo modo si mantiene la storia del progetto più pulita e organizzata. Faremo quindi una nuova branch per ogni funzionalità, la testeremo, la mergeremo su `dev` e alla fine quando avremo un numero sufficiente di funzionalità stabili faremo un merge da `dev` a `main` per rilasciare una nuova versione. Come nome usiamo `feature/nome-funzionalità` per identificare facilmente a cosa serve la branch, oppure `bugfix/nome-bug` per le correzioni di bug.

- [x] Deploy in anteprima su Firebase creando in `package.json` un nuovo script `preview` che lancia il seguente comando: `npm run build && firebase hosting:channel:deploy preview --expires 1d`;

> Firebase mette a disposizione dei _canali di anteprima_ per evitare di effettuare il deploy di un errore _sull'ambiente di produzione_, in questo modo è possibile testare una nuova implementazione in un ambiente sicuro. Al termine dell'operazione viene rilasciata nel terminale una url temporanea (nel nostro caso dalla durata di 24h).

- [x] Testare le modifiche in anteprima e se tutto funziona correttamente procedere al deploy su produzione.
- [x] Commit su `feature/landing-page` e merge su `dev`, è possibile eliminare il branch `feature/landing-page` dopo il merge.

<u>Per comodità (ma è del tutto opzionale, e più complesso) è possibile installare Git sul computer per gestire commit, branch e merge direttamente da VSCode. </u>

## Versione 0.0.3 - Toggle theme
- [x] Aggiornare versione dell'app nella costante dedicata;
- [x] Creare un nuovo branch `feature/toggle-theme` basato su `dev`;
- [x] Creare due classi all'interno di `styles.scss` chiamate `.light-theme` e `.dark-theme` lasciandole temporaneamente vuote;
- [x] Creare un nuovo servizio dentro `services` chiamato `theme.service` con `ng generate service services/theme`. Il servizio avrà una proprietà `_currentTheme` che può essere "light" o "dark", inizialmente impostata su "light". Il servizio avrà un metodo pubblico `toggleTheme()` che cambia il valore di `_currentTheme` e aggiorna la classe del body di conseguenza. Il servizio avrà anche un metodo privato `applyTheme()` che applica la classe corretta al body in base al valore di `_currentTheme` e la setta anche nel _localStorage_. Per agevolare il tutto utilizzeremo un _getter_ e un _setter_ lasciando tutto il resto privato;

```typescript
private _currentTheme: "light" | "dark" = "light";
get currentTheme() {
    return this._currentTheme;
}

set currentTheme(value: "light" | "dark") {
    this._currentTheme = value;
    this.applyTheme();
}

private applyTheme(): void {
    const body = document.body;
    if (this.currentTheme === "light") {
        body.classList.add("light-theme");
        body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
    } else {
        body.classList.add("dark-theme");
        body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
    }
}
```

<u>Lo sapevi che pui _indentare_ il codice in VSCode automaticamente? Basta selezionare tutto e poi digitare la combinazione Cmd, K, F.</u>

- [x] Torniamo nello `styles.scss` e definiamo in quelle due classi delle variabili CSS per i colori principali dell'app, più avanti definiremo ulteriori colori.

```scss
// Valori di default, se non viene applicato alcun tema o se qualcosa va in errore l'app avrà questi colori;
:host {
    --fg-color: #212121;
    --bg-color: #efefef;

    --btn-fg-color: #ffffff;
    --btn-bg-color: #212121;
}

.light-theme {
    --fg-color: #212121;
    --bg-color: #efefef;

    --btn-fg-color: #ffffff;
    --btn-bg-color: #212121;

    color: var(--fg-color);
    background-color: var(--bg-color);
}

.dark-theme {
    --fg-color: #ffffff;
    --bg-color: #212121;

    --btn-fg-color: #212121;
    --btn-bg-color: #ffffff;

    color: var(--fg-color);
    background-color: var(--bg-color);
}
```

> Regola da usare d'ora in poi per le variabili globali: -- seguito da, gerarchicamente, la categoria a cui appartiene l'elemento. Esempio: --btn-fg-color (button > foreground color);

- [x] Aggiorniamo lo stile dei componenti _ui_ per usare le variabili e non colori fissi la impostati (ora assumeranno i valori di _defaul_ ovvero quelli inseriti in `:host`);

```scss
// esempio di uso di una variabile CSS;
button {
    color: var(--btn-fg-color);
    background-color: var(--btn-bg-color);
}
```

- [x] Iniettare il servizio `ThemeService` nel `AppComponent` e chiamare il metodo `applyTheme()` all'interno del `ngOnInit()` per applicare il tema iniziale, questo assicura che quando l'app viene caricata venga applicato il tema corretto in base al valore di `currentTheme` (che salveremo anche su localStorage per mantenere la preferenza dell'utente);
- [x] Iniettare il servizio `ThemeService` anche nella `LandingPage` e collegare il metodo `toggleTheme()` al click del `icon-btn` per permettere all'utente di cambiare tema;

> Ci sono due modi per effettuare una _dependency injection_ (iniezione di dipendenza, ovvero tiriamo dentro qualcosa che ci serve a cui il componente diventerà dipendente) in Angular. Il primo è tramite il costruttore:
> ```typescript
> constructor(private themeService: Theme) {}
> ```
> In questo modo la dipendenza viene iniettata quando viene creata un'istanza del componente, ed è disponibile in tutta la classe. Il secondo modo è tramite il decoratore `inject` che permette di iniettare la dipendenza direttamente in una variabile, senza doverla dichiarazione nel costruttore:
> ```typescript
> private themeService = inject(Theme);
> ```
> In questo modo la dipendenza viene iniettata quando viene usata per la prima volta, ed è disponibile solo nella variabile in cui viene iniettata. Questo secondo metodo è essenziale dove non esiste un costruttore.


- [x] Nell'html della `LandingPage` l'icona del `icon-btn` deve cambiare in base al tema attivo, se il tema è "light" mostra l'icona "dark_mode", se il tema è "dark" mostra l'icona "light_mode";

> Per aiutarci possiamo creare un _getter_ (un piccolo metodo che restituisce qualcosa e fa solo quello) nel componente che ci da l'icona da mostrare in base al tema attivo, in questo modo evitiamo di scrivere logica direttamente nell'html e rendiamo il codice più pulito e leggibile:
> ```typescript
> get themeIcon() {
>    return this.themeService.currentTheme === 'light' ? 'dark_mode' : 'light_mode';
>}
>```
> E poi nel template:
>```html
>  <app-icon-btn [icon]="themeIcon" (clicked)="toggleTheme()"></app-icon-btn>
>```
> Notare che `icon` ora è _bindato_ (bind) a `themeIcon` tramite le parentesi quadre, questo permette di aggiornare dinamicamente l'icona in base al tema attivo. Un valore statico invece verrebbe passato, come abbiamo fatto finora, senza parentesi.

- [x] Deploy in anteprima su Firebase e testare la funzionalità, se tutto funziona correttamente procedere al deploy su produzione.;
- [x] Commit su `feature/toggle-theme` e merge su `dev`, è possibile eliminare il branch `feature/toggle-theme` dopo il merge.

## Versione 0.0.4 - Responsive design + avviso full screen che le dimensioni dello schermo non sono sufficienti per giocare

> Qui, anzichè seguire la prassi, non ci occuperemo di sviluppare un design al di sotto di 768px di larghezza. Quando l'app rileva le dimensioni inferiori, a tutto schermo, viene mostrato un avviso che il dispositivo va tenuto almeno in orizzontale o che è necessario usare uno schermo più grande. 

- [x] Aggiornare versione dell'app nella costante dedicata;
- [x] Creare un nuovo branch `feature/responsive-warning-message` basato su `dev`;
- [x] In `components/shared` creare un nuovo componente chiamato `full-screen-warning` con `ng generate component components/shared/full-screen-warning`. Il componente mostra un messaggio di avviso e un'icona, non ha input o output. Le sue regole di stile mettono al centro il messaggio e lo estendono a tutto schermo con sfondo scuro e gli danno uno z-index elevato per sovrapporsi a tutto il resto;

> Non mettiamo il componente in `components/ui` perchè non è un componente che vogliamo riutilizzare in più punti, ma è un componente specifico per l'`app.ts`, quindi lo mettiamo in `components/shared` per indicare che è un componente condiviso tra più pagine ma non necessariamente riutilizzabile in qualsiasi punto dell'app.

- [x] Creare due nuove variabili CSS in `styles.scss` per il colore dell'icona di errore: `--warning-color` e `--error-color` (rispettivamente: goldenrod e crimson);
- [x] Installare Angular Material CDK `npm i @angular/cdk` (una libreria di comportamenti e funzionalità che agevolano nello sviluppo, tutto ciò che fornisce può essere creato anche con del semplice javascript ma è complesso, risparmia tempo e insegna ad utilizzare elementi altrui);
- [x] Creiamo un _signal_ booleano `isMobile` in `app.ts` che verrà settato a true quando le dimensioni dello schermo sono inferiori a 768px di larghezza, e a false altrimenti;

> Un signal è un nuovo tipo di variabile introdotta in Angular di recente e permette di gestire lo stato in modo più semplice e performante. A differenza delle normali variabili, i signal sono reattivi, quindi quando il loro valore cambia, tutte le parti dell'app che dipendono da quel signal vengono aggiornate automaticamente. Per creare un signal basta importare `signal` da `@angular/core` e usarlo come una normale variabile, ma con la differenza che è una funzione che accetta un valore iniziale e restituisce un oggetto con il valore attuale e un metodo per aggiornarlo:

```typescript
// esempio di signal booleano;
public isMobile = signal<boolean>(false);
```
- [x] Nel costruttore di `app.ts` iniettare il servizio `BreakpointObserver` di Angular CDK e usarlo per osservare le dimensioni dello schermo;

```typescript
this.bo.observe('(max-width: 768px)').subscribe(result => {
  this.isMobile.set(result.matches);
});
```
- [x] Nel template di `AppComponent` mostrare il componente `FullScreenWarning` se `isMobile` è true. Attenzione che per usare un signal non ci si deve dimenticare della coppia di parentesi tonde;

```html
@if(isMobile()) {
    <app-full-screen-warning></app-full-screen-warning>
}
```
- [x] Deploy in anteprima su Firebase e testare la funzionalità, se tutto funziona correttamente procedere al deploy su produzione (per questo test provare davvero ad aprire l'app da uno smartphone e a ruotare lo schermo per verificare che il messaggio venga rimosso correttamente);
- [x] Commit su `feature/responsive-warning-message` e merge su `dev`, è possibile eliminare il branch `feature/responsive-warning-message` dopo il merge.

## Versione 0.0.5 - Dialog wrapper + apertura dialog di autenticazione

- [x] Aggiornare versione dell'app nella costante dedicata;
- [x] Creare un nuovo branch `feature/dialog-wrapper-auth` basato su `dev`;
- [x] Creare un nuovo componente dentro `components/ui` chiamato `dialog-wrapper` con `ng g c components/ui/dialog-wrapper`. Il componente prenderà in input un `title` (stringa) e `hideActions` (boolean, opzionale, default false). Nel template faremo largo uso di `ng-content` (un _placeholder_) per permettere di inserire qualsiasi contenuto all'interno della dialog;

> Creare questo componente _wrapper_ ci aiuta a definire una singola volta l'aspetto di un componente senza preoccuparci di quello che andremo a mettere al suo interno. Man mano questo componente si può personalizzare man mano per renderlo più utile ad ogni evenenienza. Ecco un esempio:
>```html
><div class="dialog-wrapper-container">
>    <div class="dialog-wrapper-header">
>       <h1>{{title()}}</h1>
>    </div>
>    <div class="dialog-wrapper-content">
>        <ng-content></ng-content>
>    </div>
>    @if (!hideActions()) {
>    <div class="dialog-wrapper-actions">
>        <ng-content select="[dialog-action]"></ng-content>
>    </div>
>    }
></div>
>```

- [x] Creare una nuova cartella dentro components chiamata `dialogs`;
- [x] Creare un nuovo componente dentro `components/dialogs/auth-dialog` con `ng g c components/dialogs/auth-dialog`, per adesso resterà vuoto.
- [x] Creiamo dentro `consts` un nuovo file chiamato `dialogsConfig.ts` in cui inseriamo alcuni parametri da importare nel metodo di apertura, delle opzioni che definiremo così una sola volta.

```typescript
export const DIALOGS_CONFIG = {
    width: '90%',
    maxWidth: '540px',
    maxHeight: '80vh',
    backdropClass: 'dialog-backdrop',
    autoFocus: false
};
```
- [x] In `styles.scss` definiamo la classe `dialog-backdrop` con due semplici regole per dare allo sfondo un colore scuro molto trasparente e un effetto blur; 
- [x] Andiamo adesso a `landing-page.ts` per iniettare il `Dialog` (angular/cdk/dialog) che ci permetterà di aprire, chiudere e interagire con le dialog. Sempre qui creiamo una funzione `openAuthDialog()` in cui effettuare questa operazione. Diamo questo metodo al `(clicked)` (il nostro evento - _output_ - personalizzato) del bottone "Accedi" che abbiamo creato in precedenza. Allo stato attuale però il metodo non fa nulla, implementiamolo;

```typescript
public openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthDialog, {
      ...DIALOGS_CONFIG
    });

    dialogRef.closed.subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
}
```

> Il `Dialog` iniettato nel costruttore ci permette di usare il metodo `open()` a cui passiamo come primo argomento il componente da mostrare in vece alla dialog e come secondo delle opzioni. I _tre puntini_ inseriti di fronte alla costante sono un costrutto dal nome _spread operator_ e serve per prendere una ad una le proprietà di un oggetto e inserirle in uno nuovo (non è l'unico caso in cui usarlo). Sempre nel metodo infine ci _sottoscriviamo_ all'evento `closed` che viene emesso quando la dialog viene chiusa, possiamo così eseguire del codice al momento della chiusura. `Closed` è un _observable_ ovvero qualcosa che resta li e può essere ascoltato e acchiappato all'occorrenza con il `subscribe`.

- [x] Testare l'apertura della dialog premendo su "Accedi", tutto è andato a buon fine se viene mostrato il paragrafo di default del componente aperto: 'auth-dialog works!' o qualcosa del genere.
- [x] Aggiorniamo il componente `auth-dialog.ts` inserendo un metodo `close()` e nel suo template il `dialog-wrapper` dopodichè aggiorniamo anche lo stile del `dialog-wrapper`, ora molto semplice avendo alcuni elementi al suo interno;

```html
<app-dialog-wrapper title="Autenticazione">
    <p>Contenuto della dialog.</p>
    
    <app-base-btn dialog-action label="Annulla" icon="close" (clicked)="close()"></app-base-btn>
    <app-base-btn dialog-action label="Accedi" icon="login" [disabled]="true"></app-base-btn>
</app-dialog-wrapper>
```
- [x] Ultimo passo, in `auth-dialog.ts`, definiamo l'interfaccia di risposta `AuthDialogResult`, iniettiamo il `DialogRef` (angular/cdk/dialog) e usiamolo per chiudere la dialog quando viene cliccato il bottone "Annulla";

```typescript
// fuori dal componente, appena sopra il decoratore @Component;
interface AuthDialogResult {
    success: boolean;
}

// dentro il componente;
constructor(private dialogRef: DialogRef<AuthDialogResult>) {}

public close(): void {
    this.dialogRef.close({ success: false });
}
```

<u>Ogni elemento del cdk ha una sua pagina di documentazione ufficiale che spiega come utilizzarlo e quali opzioni sono disponibili. Per esempio ecco la pagina dedicata al `Dialog` ([clicca qui](https://material.angular.dev/cdk/dialog/overview)). Sotto _API_ è spiegato come importare l'elemento e cosa espone, sotto _Examples_ sono mostrati alcuni esempi pratici.</u>

- [x] Deploy in anteprima + deploy in _prod_ dopo la verifica;
- [x] Commit su `feature/dialog-wrapper-auth` e merge su `dev`, è possibile eliminare il branch `feature/dialog-wrapper-auth` dopo il merge.

## Versione 0.0.6 - /home + autenticazione

- [x] Aggiornare versione dell'app nella costante dedicata;
- [x] Creare un nuovo branch `feature/authentication` basato su `dev`;
- [x] Creare un nuovo componente dentro `components/pages` chiamato `HomePage` con `ng g c components/pages/home-page`, per ora lasciamolo vuoto;
- [x] Creare una nuova route con path `/home` a cui arrivare quando ci si autentica e collegarci il componente `HomePage`;

```typescript
{
    path: 'home',
    loadComponent: () => import('./pages/home-page').then(m => m.HomePage)
}
```
- [x] Configurare su Firebase Console l'Autenticazione abilitando il provider _email/password_. Aggiungiamo anche manualmente un utente che ci servirà come test: immettiamo `admin@email.com` e `test1234` come credenziali;

> Firebase mette a disposizione diversi _provider_ (attori che si occupano di gestire le credenziali, controllarle e restituire un token di conferma in caso di successo). Il più semplice e gestibile è _email/password_ mentre il più automatico è sicuramente Google.

- [x] Creiamo dentro la cartella `models` un nuovo file chiamato `UserData.ts` (avremo potuto chiamarlo semplicemente User ma è troppo generico - anche Firebase espone un modello con quel nome per esempio - quindi per non sbagliare a sceglierlo successivamente diamogli un nome più specifico);

> Un _modello_ è un'interfaccia o una classe che permette di dare forma a qualcosa. Il nostro SysUser avrà mappato dentro di esso le proprità tipiche di un utente (emai, nickname, ecc...).

- [x] Modellare la nuova interfaccia inserendo all'interno le informazioni base che vogliamo definire per l'utente:

```typescript
export interface UserData {
    uid: string;
    nickname: string;
    email: string;
    createdAt: Timestamp; // fornito da Firebase
    updatedAt: Timestamp;
    photoURL?: string;
    playmatURL?: string;
    statistics?: any; // Ci servirà più avanti
}
```
> Un'interfaccia è solo uno scheletro _statico_ che può ospitare dati automaticamente solo se vengono rinvenuti dalla _fonte di verità_ scritti allo stesso modo. Se scarichiamo da Firebase un utente che non ha _nickname_ o se lo ha scritto come _nickName_ questo non verrà mappato. Una classe invece è un costrutto più potente che può ospirare anche dei metodi e un costruttore.

- [x] Creare un nuovo signal nel service `Firebase.ts` rappresentante lo user, utilizziamo per _tipizzare_ l'interfaccia creata poco fa ma per non far _arrabbiara_ Typescript dobbiamo anche inizializzare il signal con qualcosa e se lo inizializziamo a null dobbiamo specificare che può assure anche questo _tipo_;

```typescript
private _user = signal<UserData | null>(null);
```
- [x] Nel costruttore dello stesso service serviamoci di `getAuth()`, un metodo esposto da `firebase/auth` per verificare l'autenticazione. Questo metodo restituisce un tipo proprietario `Auth` da cui possiamo chiamare un secondo metodo `onAuthStateChanged()` che ci fornisce un'osservabile di quello che avviene nell'autenticazione. Questo metodo sarà la nostra chiave per sapere quando "siamo dentro", perchè reagisce, come dice il nome, al cambio di stato dell'auth;

```typescript
// da inserire nel blocco del costruttore;
getAuth(app).onAuthStateChanged(async user => {
    if (user) {
        console.log(user);
    }
});
```

- [x] Creare un nuovo service `Auth.ts` dentro la cartella `services` con `ng g s services/auth`;
- [x] Il service appena creato avrà tre metodi: `createWithEmailAndPassword()` , `loginWithEmailAndPassword()` e `logout()`;

```typescript
// fuori dal service, appena sopra il decoratore @Injectable;
interface GrantedCredential {
    email: string;
    password: string;
}

// dentro il service;
public createWithEmailAndPassword(credential: GrantedCredential) {
    // TODO: Da implementare nella prossima versione;
}
public loginWithEmailAndPassword(credential: GrantedCredential) {}

public logout() {
    getAuth().signOut();
};
```

> Immettiamo un nome così specifico per questo metodo e non un semplice `create()` o `login()` per prepararci all'eventualità di avere più modi per autenticarsi, questa è sempre buona prassi (aspettarsi eventuali evoluzioni);

- [x] Iniettiamo nel costruttore di `landing-page` il service `Auth` per poter accedere ai metodi da quel componente;
- [x] Nello stesso componente abbiamo già scritto in precedenza il metodo che apre la `authDialog` che ha un subscribe che ascolta la chiusura dell'elemento. In questo punto inseriremo la logica di autenticazione ma solo se dalla dialog arriva un messaggio di conferma. Aggiorniamo il metodo in questo modo:

```typescript
public openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthDialog, {
      ...DIALOGS_CONFIG
    });

    dialogRef.closed.subscribe((result: any) => {
        if (!result?.success) return;
        this.authService.loginWithEmailAndPassword(result?.credentials);
    });
}
```

- [x] Passiamo al componente `AuthDialog` dove saranno inseriti dall'utente gli elementi che ci servono per tentare l'autenticazione: email e password. Importiamo nel componente, tramite `imports` in alto: `ReactiveFormsModule` (la libreria di Angular per gestire i form in maniera intelligente);
- [x] Creiamo una nuova variabile chiamata `authForm` di tipo `FormGroup`, iniettiamo nel costruttore `FormBuilder` (un servizio che ci aiuta a creare i form) e usiamolo per inizializzare `authForm` con due campi: `email` e `password`, entrambi di tipo stringa e con validazione di required (obbligatori);

```typescript
public authForm: FormGroup;
constructor(private dialogRef: DialogRef<AuthDialogResult>, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
```

> Il _FormGroup_ è un oggetto molto potente e facile da configurare che si aspetta delle proprietà chiamate _controls_ che hanno bisogno di un valore ed eventualmente dei _validatori_. Questi ultimi impediscono al form di essere valido finchè tutte le loro condizioni non sono soddisfatte, se non si fornisce un _Validator_ il campo può anche non essere compilato.

- [x] Creiamo un nuovo metodo `submit()` che si occuperà di prendere i dati dal form, passarli al metodo di login del service `Auth` e chiudere la dialog in caso di successo;

```typescript
public submit(): void {
    if (this.authForm.invalid) return;
    const result = this.authForm.value;
    this.dialogRef.close({
        success: true,
        credentials: result
    })
}
```

- [x] Aggiorniamo il template di `AuthDialog` con il form e i due input per email e password, infine colleghiamo al tasto di conferma il metodo `submit()`;

```html
<form [formGroup]="authForm">
    <div class="form-field">
        <label for="email">Email</label>
        <input id="email" formControlName="email" type="email" placeholder="Inserisci la tua email">
    </div>
    <div class="form-field">
        <label for="password">Password</label>
        <input id="password" formControlName="password" type="password" placeholder="Inserisci la tua password">
    </div>
</form>

<app-base-btn dialog-action label="Accedi" icon="login" (clicked)="submit()" [disabled]="authForm.invalid"></app-base-btn>

```

- [x] In `styles.scss` definiamo uno stile globale per il `.form-field` in modo che tutti gli input che utilizzeremo mai saranno identici;

```scss
.form-field {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    gap: 8px;

    &>label {
        font-size: 14px;
        color: var(--fg-color);
        font-weight: bold;
    }

    &>input {
        padding: 8px;
        border: 1px solid transparent;
        border-radius: 4px;
        background-color: var(--btn-bg-muted-color);
        color: var(--fg-color);

        &:focus {
            outline: none;
            border-color: var(--btn-bg-color);
        }
    }
}
```
- [x] Nel metodo `loginWithEmailAndPassword()` del service `Auth` proviamo a _stampare_ (con un `console.log()`) le credenziali che dovrebbero giungere una volta premuto "Accedi" nella dialog, effettuare un test per verificare che tutto funzioni;
- [x] Implementiamo la logica di autenticazione con Firebase nel metodo di cui sopra secondo documentazione ufficiale:

```typescript
public loginWithEmailAndPassword(credential: GrantedCredential) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, credential.email, credential.password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Login successful:', user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login failed:', errorCode, errorMessage);
    });
}
```
- [x] Tentare l'autenticazione tenendo sott'occhio la console per verificare che tutto funzioni. Immettere prima le credenziali errate per verificare che venga restituito un errore, poi quelle corrette per verificare che venga restituito l'utente;

> `signInWithEmailAndPassword()` è un metodo esposto da Firebase (asincrono) che accetta le credenziali e restituisce la _promise_ di un utente in caso di successo. Le `Promise` sono un costrutto di JavaScript che rappresenta un'operazione asincrona che può essere completata con successo o con un errore. Per gestire il risultato di una promise si usano i metodi `then()` e `catch()`, il primo viene eseguito quando la promise viene risolta con successo, il secondo quando viene rigettata con un errore. Con il test precedente dovremo aver innescato entrambi almeno una volta.

<u>Occorre ricordare che Firebase è capace di tenere viva la sessione di autenticazione quindi ad ogni riavvio della pagina, il `console.log()` che abbiamo inserito nel metodo `onAuthStateChanged()` ci mosterà in console in caso di successo, l'utente. Attualmente, non abbiamo ancora inserito un metodo di _logout_.</u>

- [x] Quando l'utente si autentica la route deve cambiare e portarci ad `/home`. Torniamo nel `subscribe` della chiusura della _dialog_ in `landing-page.ts` e aggiungiamo la logica per far ciò. Trasformiamo il metodo `loginWithEmailAndPassword` del nostro service `Auth.ts` in una _promise_ rendendolo così un metodo asincrono dopodichè aggiungiamo un `.then()` dove chiamiamo il metodo per effettuare infine il redirect alla pagina che ci interessa. Servirà un nuovo strumento da iniettare in `landing-page` ovvero `Router` che espone metodi per navigare;

```typescript
// Auth.ts 
public async loginWithEmailAndPassword(credential: GrantedCredential): Promise<any> {
    // ...
  }

// LandingPage.ts
constructor(private dialog: Dialog, private authService: Auth, private router: Router) {}

dialogRef.closed.subscribe((result: any) => {
    if (!result?.success) return;
    this.authService.loginWithEmailAndPassword(result?.credentials).then(() => {
        this.router.navigate(['/home']);
    })
});
```

- [x] Deploy in anteprima + deploy in _prod_ dopo la verifica;
- [x] Commit su `feature/authentication` e merge su `dev`, è possibile eliminare il branch `feature/authentication` dopo il merge.

## Versione 0.0.7 - Auth guard + Home page
