$(document).ready(function() {
    var $mainMenuItems = $("#main-menu ul").children("li"),         /* ici on récupère tout les li  dans notre variable*/
        totalMainMenuItems = $mainMenuItems.length,                 /* ici on récupère le nb d'items/ de li */
        openedIndex = 2,                                           /* variable de stockage de l'élément sur lequel j'ai cliqué que j'initilase à -1 */

        init = function() {                                          /* cette fonction va permettre qu'on voit la photo d'un item en couleur et sa description quand on clique dessus */
            bindEvents();
            if(validIndex(openedIndex)) {                           /* animation de départ sur Jessica Alba */
                animateItem($mainMenuItems.eq(openedIndex), true,700);
            }
        },

        bindEvents = function(){
            $mainMenuItems.children(".images").click(function(){        /* si je clique sur une image ... */
                var newIndex = $(this).parent().index();                /* ici on récupère l'index/numéro  du li sur lequel j'ai cliqué car This = $mainMenuItems.children(".images") = div partN de class images donc $(this).parent() = li sur lequel j'ai cliqué */
                checkAndAnimateItem(newIndex);
            });

            $(".button").hover(
                function(){
                    $(this).addClass("hovered");
                },
                function(){
                    $(this).removeClass("hovered");
                }
            );

            $(".button").click(function(){
                var newIndex = $(this).index();
                $item = $mainMenuItems.eq(newIndex)  ;               /* ici on récupère notre élément li sur lequel on a cliqué. Précisément on cherche parmi les li de ma variable $mainMenuItems (qui regroupe tous mes li), le li dont l'index correspond à la position récupéré à la ligne au-dessus.  */
                checkAndAnimateItem(newIndex);
            })

        },

        validIndex = function(indexToCheck) {
            return(indexToCheck >= 0) && (indexToCheck < totalMainMenuItems);
        },
        
        animateItem = function($item, toOpen, speed) {
            var $colorImage = $item.find(".color"),                          /* ici on récupère la classe color de l'élément li sur lequel on a cliqué */
                itemParam = toOpen ? {width:"420px"} : {width:"140px"},      /* ici on stocke la largeur voulue de mon élément li : 420px si mon booléen "toOpen" = True, 140px si "toOpen" =False */
                colorImageParam = toOpen ? {left:"0px"} : {left:"140px"};
            $colorImage.animate(colorImageParam,speed);                      /* ici on fait en sorte que l'image en couleur passe "au-dessus" de celle en noir et blanc */
            $item.animate(itemParam,speed);                                  /* Ici on définit la taille de notre élément li selon qu'il faut afficher le paragraphe description ou non */
        },

        checkAndAnimateItem = function(indexTocheckAndAnimate){
            if(openedIndex === indexTocheckAndAnimate)                            /* si je clique une 2e fois sur un élément déjà ouvert, je referme cet élément + je réinitialise ma variabled'index d'actrice à -1 */
            {
                animateItem($mainMenuItems.eq(indexTocheckAndAnimate), false,250);
                openedIndex = -1;
            }
            else                                                    /* si je clique sur une nouvelle photo, je ferme l'élément de l'ancienne photo et j'ouvre l'élément de la photo sur laquelle on a cliqué */
            {
                if(validIndex(indexTocheckAndAnimate))
                {
                    animateItem($mainMenuItems.eq(indexTocheckAndAnimate), true,250);
                    animateItem( $mainMenuItems.eq(openedIndex), false,250);
                    openedIndex = indexTocheckAndAnimate;
                }
            }
        }

    init();
})