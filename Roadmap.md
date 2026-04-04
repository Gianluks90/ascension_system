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
        loadComponent: () => import('./pages/landing-page/landing-page').then(m => m.LandingPage)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
```

- [x] Installare Angular Material CDK `npm i @angular/cdk`;
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
- [ ] Commit su `feature/toggle-theme` e merge su `dev`, è possibile eliminare il branch `feature/toggle-theme` dopo il merge.

## Versione 0.0.4 - Responsive design + avviso full screen che le dimensioni dello schermo non sono sufficienti per giocare

> Qui, anzichè seguire la prassi, non ci occuperemo di sviluppare un design al di sotto di 768px di larghezza. Quando l'app rileva le dimensioni inferiori, a tutto schermo, viene mostrato un avviso che il dispositivo va tenuto almeno in orizzontale o che è necessario usare uno schermo più grande. 

- [ ] Creare un nuovo branch `feature/responsive-landing-page` basato su `dev`;
- [ ] In `components/shared` creare un nuovo componente chiamato `full-screen-warning` con `ng generate component components/shared/full-screen-warning`. Il componente mostra un messaggio di avviso e un'icona, non ha input o output. Le sue regole di stile mettono al centro il messaggio e lo estendono a tutto schermo con sfondo scuro e gli danno uno z-index elevato per sovrapporsi a tutto il resto;

> Non mettiamo il componente in `components/ui` perchè non è un componente che vogliamo riutilizzare in più punti, ma è un componente specifico per l'`app.component`, quindi lo mettiamo in `components/shared` per indicare che è un componente condiviso tra più pagine ma non necessariamente riutilizzabile in qualsiasi punto dell'app.

- [ ] Nel costruttore di `AppComponent` iniettare il servizio `BreakpointObserver` di Angular CDK e usarlo per osservare le dimensioni dello schermo;
- [ ] Creiamo una variabile chiamata `isMobile` di tipo boolean che viene aggiornata in base alle dimensioni dello schermo, se la larghezza è inferiore a 768px `isMobile` è true, altrimenti è false;
- [ ] Nel template di `AppComponent` mostrare il componente `FullScreenWarning` se `isMobile` è true;

```html
@if(isMobile) {
    <app-full-screen-warning></app-full-screen-warning>
}
```

