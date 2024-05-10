# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

# React Grupp Projekt

## Deltagare
- Ahmed Tememi
- Ibrahim Sheikh
- Mustafa Altaie
- Moutasem Abou Arshid

## Projektinformation
- **Projektnamn:** React-grupp-project
- **Skolnamn:** Chas academy
- **Gruppnamn:** Team Anywhere

## Installation
git clone https://github.com/MustafaAltaie/React-grupp-project.git

## Team Göteborgs vidareutveckling
### Deltagare:
- Nyat
- Emil
- David
- Jens
- Oscar
- Toleen

### Upplevelser
Det var svårt att sätta sig in i koden då det var en större fil än vad vi själva arbetat med tidigare men även att mycket kod var beroende av annan kod som var svår att hitta i alla filer, vilket gjorde det lite rörigt. 
Det fanns inte mycket kommentarer att utgå ifrån så man fick leta och testa sig fram mycket för att kunna hitta det man vill arbeta med. 

### Vårt valda fokus för vidareutveckling
Då det redan fanns mycket funktionalitet valde vi att fokusera på de buggar vi kunde hitta och att göra koden mer robust. Vi började med att testa hemsidan för att lära känna den och antecknade de buggar som vi kunde hitta. Därefter delade vi upp dessa i tasks som vi sedan arbetade med under veckans gång. Vi fick ihop det till 25 tasks men vi hann inte med att göra alla. Med tanke på att vissa tasks blev mer komplicerade än vi väntat oss, pga att mycket saker var beroende av annan kod som gjorde att annat började bugga, tog det längre tid än vi tänkt oss. Vi har försökt att beta av så många som vi hunnit.

### Fixade buggar: 
- Inte tillåta bokstäver i "End Date" 
- column namn går ej att redigera 
- ingen varning när man ska ta bort column 
- skapar man en kolumn med ett namn som har samma som ett som raderats tidigare kommer de gamla tasksen tillbaka som raderats med kolumnen tidigare
- Det ska vara tydligt vart man befinner sig 'Show all, Done eller den kolumnen man har skapapt själv
- ändra man columnSize så anpassar sig inte task "diven s" storlek där efter 
- borde kunna bestämma startdate själv istället för att det blir när tasken skapades
- Går inte att stänga menyn med "..."-knappen
- "Delete"-knappen kanske ska vara blå utan röd?

### Buggar vi inte lyckats/hunnit lösa: 
- Sidan är inte responsiv 
- tasks försvinner inte när man raderar column
- progress grejen uppdateras inte korrekt, de tasks som är "borta" spökar fortfarande, försvinner inte från localstorage när man raderar kolumn
- Försöker du logga in med ett felaktigt inlogg, är hela sidan vit, du måste rensa local storage för att kunna se den igen, får ingen error att det är fel användarnamn. Detta gäller om du försöker logga in på "already have an account" och sedan navigerar till startsidan

### Reflektion: 
Det var kul att få testa vidareutveckling av annan kod, men kunde bli lite frustrerande att inte lyckas lösa buggar som man tänkt varit enkla att fixa. Det tog oss längre tid än vi räknat med, det var mycket hårdkodat som gjorde det svår att ändra på saker. Vi upplevde att det var för stora och långa komponenter och funktioner som gjorde fler saker, t.ex. home returnen är över 100 lines. Vi hade gärna sett att det var uppdelat i fler komponenter så man inte behöver läsa massa lines för att förstå vad en komponent gör. Vi uppskattade all cool funktionalitet som fanns på sidan, t.ex. live klockan tyckte vi var cool, men även inställningarna för att kunna ändra på stilen på sidan efter sina egna preferenser. I helhet tyckte vi att det var ett bra arbete med mycket tanke bakom, men det var även kul för oss att få se annan stil på kodning än hur vi själva brukar koda. 
