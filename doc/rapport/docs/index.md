# Challenge Open Data

## Introduction

L'objectif de ce projet est de mettre en oeuvre une visualisation d'un grand nombre de données open data. En effet, on se retrouve aujourd'hui à avoir de plus en plus de données. Mais sans pouvoir interpréter ces données, il serait inutile de les récolter.  
Ainsi, à partir d'un jeu de données préalablement choisi, nous allons mettre en valeur certains aspects des données afin de pouvoir en extraire le plus d'information possible. Pour cela, il sera nécessaire de choisir une représentation graphique adaptée des données afin d'avoir une visualisation lisible et compréhensible pour un humain.

## Jeux de données choisis

Nous avons donc choisi le jeu de données fourni par : [Environmental impacts of food (Clark et al. 2022)](https://github.com/owid/owid-datasets/blob/master/datasets/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022)/Environmental%20impacts%20of%20food%20(Clark%20et%20al.%202022).csv)

Ce set de données indique, pour une liste étendue d'ingrédients, leurs impacts environnementaux (eau requise, espace nécessaire, quantité de gaz à effet de serre émise) ramené au poids, nombre de calories ou de protéines.

Le but est alors d'évaluer selon ces critères, l'impact de plats typiquement français. On peut notamment prendre comme exemple les plats suivants, composés d'ingrédients simples :

- ratatouille : courgette, sauce tomate, aubergine
- gratin dauphinois : patates, crème, fromage
- boeuf bourguignon : boeuf, vin, carottes, patate.

On notera que ces données proviennent du Royaume-Uni et on peut donc supposer que cela faussera nos résultats puisque la majorité des produits peuvent provenir de France. 

On peut cependant on peut ajouter deux suppositions plausibles pour contrer ces inquiétudes.  
La première réside dans le fait que le climat et les pratiques du Royaume-Uni et de la France sont suffisamment proches pour estimer un coût similaire pour les différentes denrées.  
La seconde découle de l'étude proposée par Hannah Ritchie sur [l'impact du transport vis-à-vis de la production de la nourriture](https://ourworldindata.org/food-choice-vs-eating-local). Cet article indique donc que l'on peut considérer que l'impact du transport depuis le Royaume-Uni vers la France, comme nul en comparaison avec l'impact de la production en elle-même.

## Interface et interactions

Nous souhaitons créer un dashboard qui permet de sélectionner des ingrédients (qui sont disposés dans la colonne de droite) dans la base de données pour composer une assiette (qui est disposée au centre de l'image), ainsi que la quantité de chaque ingrédient et son unité de mesure.  
On peut aussi choisir des plats typiquement français (qui sont disposés en dessous de l'image), sélectionnés à l'avance par les membres de l'équipe.  
Une fois les ingrédients sélectionnés dans une assiette, le graphique indique la contribution de chaque ingrédient du plat à l'empreinte carbone, mesurée en équivalent de gaz à effet de serre.  
Nous disposons de différentes assiettes qui peuvent être assemblées séparément, ce qui nous permet de comparer l'empreinte carbone de chaque plat.

## Architecture et bibliothèques

Pour afficher les données sous forme de page web, nous avons choisi de rester sur un fonctionnement assez simple, en n'utilisant aucun framework Javascript autre que D3.Js pour l'affichage des différents graphiques.

Cette approche nous permet de nous concentrer sur les graphiques et les données affichées, sans avoir trop de fichiers à gérer, ce qui pourrait être le cas si nous utilisons un framework comme React ou Vue. En n'incluant pas ces framework, nous pouvons être plus sereins quant à la taille finale du rendu, ce dernier étant limité à 10 Mo.

Les données seront directement récupérées à leur source, aucune copie ne sera faite sur le serveur d'hébergement de notre page web.
