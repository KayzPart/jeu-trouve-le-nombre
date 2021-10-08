/* Découvrir le language Javascript à travers la réalisation d'un jeu, comprendre son fonctionnement en commentant le script JS */

/* Présentation du jeu =>

- Jouer contre l'ordinateur afin de trouver un nombre aléatoire entre 0 et 100

- Il y a un système de vie représenter par des coeurs (5 essais)

- Un sytème de chaud/froid qui va indiquer au joeur si il se raproche ou non de la valeur à trouver 

- Nous manipulons donc le DOM en JS */

/* --- Nous décomposons la création de ce jeu en 8 étapes ---

- 1) = La mise en place
    => Editeur de code utiliser : Visual Studio Code avec les extensions : Color Highlight, Es Lint (raccourcies de commandes JS = écrire plus vite avec moins d'erreur) et Live Server

- 2) = HTML
- 3) = CSS

- 4) = Début JS
    => Objectifs :
    1) Récupérer les éléments du DOM (page HTML)
    2) Intégrer des ionicons
    3) Intégrer les dégrader 

- 5) = Logique globale du jeu
- 6) = Système chaud/froid
- 7) = Système de vies
- 8) = Bouton recommencer

*/


/* ------------------------------------------------------------------Début JS-----------------------------------------------------------*/

// Récupération des élements du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];
// getElementsByTagName renvoie une liste d'éléments. [0] selectionne le premier éléments donc le body


// Modèle de coeurs
// Générer des coeurs automatiquement en fonction du nombres de vies qu'il reste
 const coeursVide = '<ion-icon name="heart-outline"></ion-icon>';
 const coeurPlein = '<ion-icon name="heart"></ion-icon>';


 // Rajout des fond d'écran chaud/froid
 // Lors d'un copier/coller de gradient, ne pas oublier d'enlever le background-image, et de déplacer le ; après la balise fermante
 const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
 const bgTiede ='linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
 const bgChaud = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
 // tuto chaud = -60deg, #ff5858, #f09819
 // tuto brulant = to top, #ff0844, #ffb199
 const bgBrulant = 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)';


 //Fond d'écran pour le perdant 
const bgLoose = 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)';



 //Fond d'écran pour le gagnant 
const bgWin = 'background-image: linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)';
// essayer = background-image: linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);
// essayer background-image: linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%);
// essayer background-image: linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%);
// essayer background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);




/*--------------------------------------------------- Intégrer la logique du Jeu ------------------------------------------------------*/
//Objectifs : Initialisation & récupération de la valeurs du formulaire 


// Function PLAY :
// Fonction fléché
const play = () => {

    // Générer le nombre aléatoire
    //Math.random() fonction qui va générer un nombre aléatoire entre 0 et 1
    // Englober Math.random dans une autre fonction celle de Math.floor () qui va prednre le chiffre et l'arrondir à l'entier inférieur
    const randomNumber = Math.floor(Math.random() * 101);

    // Variable total de vies
    const totalVies = 6;

    // let vies va changer au fil du jeu
    let vies = totalVies;

    //Pour nous permettre de voir le nombre choisi par l'ordinateur
    console.log(randomNumber);
    

    // ---------------------------------- Actualisation à chaques essai - C'EST TOUTE LA LOGIQUE DU JEU ! ---------------------------

    //addEventListener va se déclencher à partir de telle action (la en loccurence ('submit))
    // Dès que le formulaire sera envoyer, on va lui dire déxécuter une fonction 
    // (e) représente l'élément en lui m^me sur lequel va se dérouler l'événement
    formulaire.addEventListener('submit', (e) => {

        //preventDefault empeche l'envoie du formulaire et donc le rechargement de la page lors de l'envoie (envoie du formulaire = requête au serveur) et donc d'abandonner tout le jeu et de le recommencer
        e.preventDefault();

        //Récupération de la valeur de l'input 
        const valeurInput = parseInt(input.value);
        //En défault la valeur de l'input est en string (chaîne de caractère) 
        // Nous voulons récupérer un chiffre donc on va utiliser la fonction parseInt

        // Passons aux 3 possibilité pour cette valeur (valeur de linput)

        /* 1) - Si la valeur de linput qu'on à récupérer est inférieur à 0 ou est supérieur à 100 alors on ne fait rien
        car cela ne rentre pas dans les valeurs que nous voulons utiliser*/
        //return va arrêter tout ce qui va suivre dans les instruction du if 
        if(valeurInput < 0 || valeurInput > 100) return;

        /* 2) - Si la valeur de l'input est égal au randomNumber (chiffre aléatoire choisi par l'ordinateur alors l'utilisateur à gagner */ 
        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;

            // alt gr + 7 = `` = nous permets de rajouter des variables dynamiquement dans le texte grâce au ${}
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }

        // SYSTEMES CHAUD/FROID
        // *- Fixer des fourchettes de valeurs et vérifier si on a perdu

        /* FOURCHETTES DE VALEURS EXPLICATIONS +>
        EXEMPLE DU CHIFFRE A DEVINER = 58
        L'utilisateur entre 64
        Brulant = +- 2 donc intervalles  de 62 à 66
        Chaud = +- 5 donc intervalles  de 59 à 69
        Tiede = +- 10 donc intervalles  de 54 à 74
        Froid = + 10 donc intervalles  qui va être à plus de 10 d'écart du chiffre entrée par l'utilisateur
        
        */

        /* 3) - Quand la valeur de l'input va être différente du randomNumber alors => */ 
        // !== => Si différent
        if (valeurInput !== randomNumber){
            if(randomNumber <= valeurInput + 2 && randomNumber -2){
                body.style.backgroundImage = bgBrulant;
                // Ctrl + i pour ajouter un emoji
                message.textContent = "C'est Brûlant !!! 🔥🔥🔥 ";
            }
            else if(randomNumber <= valeurInput + 5 && randomNumber -5){
                body.style.backgroundImage = bgChaud;
                // Ctrl + i pour ajouter un emoji
                message.textContent = "C'est Chaud ! 🔥 ";
            }
            else if(randomNumber <= valeurInput + 10 && randomNumber -10){
                body.style.backgroundImage = bgTiede;
                // Ctrl + i pour ajouter un emoji
                message.textContent = "C'est Tiède ! 😐 ";
            }
            else{
                body.style.backgroundImage = bgFroid;
                // Ctrl + i pour ajouter un emoji
                message.textContent = "C'est Froid ❄️ ";
            }
            //On prend la variable vies et on lui enlève 1
            vies--;
            // Une fois qu'on à baisser la vie on fait une fonction qui vérifie si on a perdu
            // Qui va être créer à l'exterieur du formulaire mais toujours dans la fonction play ()
            verifyLoose();

        }
    })

    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000'
            // Désactiver le bouton essayer
            // 2 paramètres rentre dans cette fonction 
            // Le premier c'est le nom de ce qu'on veut rajouter comme atribut
            // Et le deuxième c'est la valeur de cet attribut 
            // Donc disabled ne prend aucune valeur
            essayerBtn.setAttribute("disabled", "");
            message.textContent = `Vous avez perdu. LA réponse était ${randomNumber}`;
            // Quand on perd, boutton pour rejouer 
            rejouerBtn.style.display = "block";
        }
    }
}