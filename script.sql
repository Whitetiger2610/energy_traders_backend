CREATE DATABASE energy_traders;
\c energy_traders;

CREATE TABLE usuarios (id SERIAL, rol VARCHAR(50), nombre VARCHAR(50), apellido VARCHAR(50), email VARCHAR(50) NOT NULL, password VARCHAR(60) NOT NULL);

INSERT INTO usuarios values
(DEFAULT, 'Mauricio','Gonzalez', 'admin@energy-traders.com', '123456', 'administrador'),
(DEFAULT, 'Daniel', 'Gonzalez', 'manager@energy-traders.com', 'abcdefg', 'administrador');

CREATE TABLE productos (id SERIAL, codigo VARCHAR(50), nombre VARCHAR(50) NOT NULL, marca VARCHAR(50), precio INTEGER NOT NULL, stock INTEGER NOT NULL, imagen1 TEXT NOT NULL, imagen2 TEXT NOT NULL, descripcion TEXT NOT NULL);

INSERT INTO productos values
(DEFAULT,'ET-98373', 'Panel Solar', 'Jinko', 5950, 1000,'https://www.vicoexport.com/wp-content/uploads/2024/01/JINKO-575W.jpg','https://mercadossolar.com/cdn/shop/products/Jinko-Solar-Tiger-Pro-72HC-TV-525-545-Watt-Solar-Panel-2.jpg?v=1701815560&width=900', 'Los paneles solares Jinko son módulos fotovoltaicos de alta eficiencia fabricados por JinkoSolar, una de las empresas líderes en la industria solar a nivel mundial. Destacan por su tecnología avanzada, durabilidad y excelente rendimiento en diversas condiciones climáticas'),
(DEFAULT,'AB-95402', 'Inversor Solar', 'Sungrow', 7250, 100,'https://www.solar-center.mx/cdn/shop/products/036a347c62b2b87a9990f763a8a818d9_e681fbb6-5eb8-4a1c-97ca-53083fc0f2ca_2251x.jpg?v=1667339678','https://ae01.alicdn.com/kf/S3d86c02d84354b19805349161597e21fZ.jpg_640x640q90.jpg?width=4961&height=6732&hash=11693', 'Los inversores residenciales Sungrow son dispositivos de alta eficiencia diseñados para convertir la energía de corriente continua (DC) generada por paneles solares en corriente alterna (AC) utilizable en hogares. Sungrow es una de las marcas líderes en tecnología fotovoltaica, reconocida por su innovación, confiabilidad y eficiencia energética'),
(DEFAULT,'KY-87634', 'Controlador solar mppt', 'Victron', 5990, 200,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSors9MZ7MwqM2HXjcTx3eii8-7UgpnOmyJmQ&s','https://www.victronenergy.com/media/pg/Manual_BlueSolar_MPPT_75-10_up_to_100-20/es/image/16628ec7c8fc6e.png', 'Los controladores MPPT BlueSolar de Victron Energy son dispositivos avanzados diseñados para optimizar la carga de baterías en sistemas solares, maximizando la eficiencia energética. Utilizan la tecnología MPPT (Maximum Power Point Tracking) para extraer la mayor cantidad de energía posible de los paneles solares, incluso en condiciones de baja irradiación o sombreado parcial'),
(DEFAULT,'BG-83736', 'Bateria litio', 'Pylontech', 9590, 50,'https://orumenergia.com.mx/wp-content/uploads/2022/10/BLP-US5000.jpeg','https://dojiw2m9tvv09.cloudfront.net/10729/product/pw_845/baterialitio48v2-4kwhpylontechespecificaciones-medidas6889.png', 'Las baterías de litio Pylontech son soluciones avanzadas de almacenamiento de energía diseñadas para aplicaciones solares residenciales, comerciales e industriales. Son reconocidas por su alta eficiencia, larga vida útil y compatibilidad con múltiples inversores, lo que las convierte en una de las opciones más populares para sistemas de almacenamiento de energía'),
(DEFAULT,'RJ-09383', 'Soporte Panel solar', 'Gonvarri', 6450,200,'https://siflumsa.com/wp-content/uploads/2020/08/ESTRUCTURAS-PARA-PANELES-SOLARES-VENTOX.jpg','https://image.made-in-china.com/202f0j00iIFogPQGaEqA/Capacity-Solar-Farm-Mounting-Structure-Solar-Power-Racking-for-Farmland-Irrigation.webp', 'Los soportes para paneles solares Gonvarri son estructuras de alta resistencia diseñadas para la instalación segura y eficiente de sistemas fotovoltaicos en diversas superficies. Gonvarri Solar Steel, una división de Gonvarri Industries, es líder en la fabricación de soluciones estructurales para proyectos solares a gran escala, comerciales y residenciales');




SELECT * FROM eventos;
SELECT * FROM usuarios;