# 02324 Videregående Programmering - Web Udvikling
## Backend
Projektet er bygget på Spring, som er et Java Framework til udvikling af webapplikationer og har en lagdelt arkitektur.

Alle endpoints er defineret i GameController klassen, controlleren gør ikke andet end at mappe DTO'er og kalde ned i servicelaget, det vil sige at controlleren skal ikke indeholde noget logik.

Klienten/frontenden skal ikke kende til applikationens modeller, den skal kun kende til DTO'er, vi bruger DtoMapper klassen til at konvertere DTO'er til deres tilsvarende model og vice versa.
Da klienten ikke kender til projektets modeller vil det også sige, at der ikke behøver at være et 1:1 forhold mellem en DTO og en Model.

Projektets service lag indeholder alt spillets logik (se GameService klassen). Læg mærke til at GameService konstruktøren kun er afhængig af interfaces og ikke konkrete implementationer, dette gør vi kan tilføje nye implementerniger af f.eks. vores DAO'er uden at ændre i Service klassen.

ExceptionHandler klassen i Exception pakken definerer hvordan vores exceptions skal håndteres.

Dao klasserne er kun ansvarlige for at hente og gemme data, der skal ikke være noget spillogik, på nuværende tidspunkt gemmes alt spil data i forskellige datastrukturer. Når der skal tilkobles en database laves der blot en ny dao klasse der implementerer det tilhørende interface.

DataLoader klassen er ansvarlige for at "seede" data.

Backenden kan åbnes som et Maven-projekt i Intellij IDEA, alle nødvendige dependencies skulle gerne installeres. Projektet startes fra DemoApplication klassen. 

## Frontend
Projektets frontend er opbygget i React ved hjælp af TypeScript. TypeScript tilføjer typesikkerhed til JavaScript.

"api" mappen definerer hvordan vi kontakter vores backend, det vil sige når der tilføjes et nyt endpoint skal der også tilføjes en ny metode i "GameApi.ts" for at kalde det nye endpoint.

"components" mappen indeholder de forskellige komponenter der renderes. Vælger man at introducere nye ting på spillepladen skal de nok laves som deres egne komponenter.

"context" mappen håndterer frontendens state. (det data frontenden skal gemme/holde styr på, f.eks. hvilken spiller der står hvor).

"styling" mappen definerer hvordan komponenter skal styles.

"types" mappen definerer vores typer, de skal for det meste afspejle hvordan vores DTO'er ser ud.

For at starte frontenden skal man installere "Node.js" (https://nodejs.org/en/, LTS versionen er fin). Frontend mappen åbnes i terminalen, hvorefter kommandoen "npm install" skal køre, som vil installere de nødvendige dependencies for frontenden. For at starte projektet kan man skrive "npm start". Projektet kan importeres i WebStorm for at gøre processen nemmere.
