DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM users LIMIT 1) THEN
    RETURN;
  END IF;
END $$;

INSERT INTO users (name, email, password) VALUES
  ('Admin', 'admin@guarani.com', '$2b$10$KEUdPJF082uwfU9V1JmsyehvVc/pw81EqOWwLiiklDbbNIGwkMRYu'),
  ('Test User', 'usuario@guarani.com', '$2b$10$rk0c.fx4zhGHW36PRMVHeeqWYvGSasdkLGuAd2XwU3I.fVkwD4ArG');

INSERT INTO categories (name, icon, description) VALUES
  ('Animales',      '🐾', 'Mascotas y animales del campo'),
  ('Colores',       '🎨', 'Colores del arcoiris'),
  ('Familia',       '👨‍👩‍👧‍👦', 'Miembros de la familia'),
  ('Comida',        '🍽️', 'Alimentos y bebidas'),
  ('Numeros',       '🔢', 'Del uno al diez'),
  ('Saludos',       '👋', 'Formulas de cortesia'),
  ('Profesiones',   '👷', 'Trabajos y oficios'),
  ('Partes del Cuerpo', '🦴', 'Anatomia basica');

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('jaguar',   'jaguarete', 'jaguar',    1),
  ('perro',    'jagua',     'perro',     1),
  ('gato',     'mbói',      'gato',      1),
  ('caballo',  'kavaju',    'caballo',   1),
  ('vaca',     'ho''u',     'vaca',      1),
  ('cerdo',    'kure',      'cerdo',     1),
  ('gallina',  'ka''aguy',  'gallina',   1),
  ('pájaro',   'guyra',     'pajaro',    1),
  ('pez',      'pira',      'pez',       1),
  ('tortuga',  'jasá',      'tortuga',   1),
  ('loro',     'tuy''a',    'loro',      1),
  ('mono',     'mbarete',   'mono',      1);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('rojo',     'pytã',       'rojo',      1),
  ('azul',     'hovy',       'azul',      1),
  ('verde',    'hatã',       'verde',     1),
  ('amarillo', 'sa''yju',    'amarillo',  1),
  ('blanco',   'morotĩ',     'blanco',    1),
  ('naranja',  'kaguy',      'naranja',   1),
  ('morado',   'anambusu',   'morado',    1),
  ('negro',    'ho''u',      'negro',     1);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('madre',      'sy',             'madre',       1),
  ('padre',      'taita',          'padre',       1),
  ('hijo',       'mitära''y',      'hijo',        1),
  ('hija',       'mitäkuña',       'hija',        1),
  ('hermano',    'javegua',        'hermano',     1),
  ('hermana',    'javegua kuña',   'hermana',     1),
  ('abuela',     'jarýi',          'abuela',      1),
  ('abuelo',     'taita ruvicha',  'abuelo',      1),
  ('tío',        'taitaja',        'tio',         1),
  ('primo',      'javegua',        'primo',       1);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('agua',     'ysý',        'agua',      1),
  ('pan',      'mbujape',    'pan',       1),
  ('carne',    'so''o',      'carne',     1),
  ('fruta',    'ysaja',      'fruta',     1),
  ('leche',    'ka''aguy',   'leche',     1),
  ('maíz',     'avatiky',    'maiz',      1),
  ('mandioca', 'mandiova',   'mandioca',  1),
  ('café',     'taperyva',   'cafe',      1),
  ('azúcar',   'azúcar',     'azucar',    1),
  ('pollo',    'po''o',      'pollo',     1);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('uno',   'petei',    'uno',    1),
  ('dos',   'mbokoi',   'dos',    1),
  ('tres',  'mbohapy',  'tres',   1),
  ('cuatro','irundy',   'cuatro', 1),
  ('cinco', 'po''a',    'cinco',  1),
  ('seis',  'ypite',    'seis',   1),
  ('siete', 'pakoi',    'siete',  1),
  ('ocho',  'pano',     'ocho',   1),
  ('nueve', 'pora',     'nueve',  1),
  ('diez',  'pa',       'diez',   1);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('hola',        'maitei',        'hola',        1),
  ('gracias',     'aguyje',        'gracias',     1),
  ('adiós',       'jajapo',        'adios',       1),
  ('bueno',       'porä',          'bueno',       1),
  ('sí',          'he''ẽ',         'si',          1),
  ('no',          'ndahai',        'no',          1),
  ('bienvenido',  'jajapo porä',   'bienvenido',  1),
  ('amigo',       'angirü',        'amigo',       1),
  ('por favor',   'por favor',     'por favor',   1),
  ('lo siento',   'che siento',    'lo siento',   1);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('médico',     'pyhä',          'medico',      1),
  ('abogado',    'mo''ähára',     'abogado',     1),
  ('profesor',   'mbo''ehára',    'profesor',    1),
  ('enfermera',  'pohano',        'enfermera',   1),
  ('carpintero', 'yvyra apo',     'carpintero',  1),
  ('cocinero',   'tembi''u apo',  'cocinero',    1),
  ('agricultor', 'chokokue',      'agricultor',  1),
  ('policía',    'ndepo''i',      'policia',     1);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('cabeza',   'akä',       'cabeza',   1),
  ('mano',     'jyva',      'mano',     1),
  ('pie',      'tetã',      'pie',      1),
  ('ojo',      'tesa',      'ojo',      1),
  ('oreja',    'natã',      'oreja',    1),
  ('boca',     'juru',      'boca',     1),
  ('nariz',    'angopy',    'nariz',    1),
  ('diente',   'täi',       'diente',   1),
  ('corazón',  'akã',       'corazon',  1),
  ('espalda',  'katu',      'espalda',  1);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('mariposa',  'guembepy',      'mariposa',   2),
  ('rana',      'syva''i',       'rana',       2),
  ('serpiente', 'mboi',          'serpiente',  3),
  ('águila',    'pŷchĩ',        'aguila',     3);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('turquesa', 'hovy morotĩ',   'turquesa',   2),
  ('celeste',  'hovy pytã',     'celeste',    3);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('suegra',  'kueñái',   'suegra',   2),
  ('cuñado',  'kyña',      'cunado',   2);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('arroz',     'avatí',      'arroz',     2),
  ('miel',      'ra''ã',      'miel',      2),
  ('cerveza',   'kusa',       'cerveza',   3),
  ('chocolate', 'chocolatë',  'chocolate', 3);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('once',  'pa petei',    'once',  2),
  ('doce',  'pa mbokoi',   'doce',  2),
  ('cien',  'paha',        'cien',  3),
  ('mil',   'hegua pa',    'mil',   3);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('hasta luego',    'ha upéi',          'hasta luego',    2),
  ('buen provecho',  'tembi''u porä',    'buen provecho',  2),
  ('felicidades',    'ijerovia',         'felicidades',    3),
  ('con permiso',    'ñe''ẽme',          'con permiso',    3);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('doctor',      'doktár',          'doctor',       2),
  ('enfermero',   'poháva',          'enfermero',    2),
  ('programador', 'apopyra kuaai',   'programador',  3);

INSERT INTO words (spanish, guarani, search_key, difficulty_level) VALUES
  ('dedo',    'jyva''i',      'dedo',    2),
  ('pecho',   'katupyry',     'pecho',   2),
  ('rodilla', 'pytã''i',      'rodilla', 3);

INSERT INTO word_category (word_id, category_id)
SELECT w.id, c.id FROM words w, categories c
WHERE c.name = 'Animales'
  AND w.spanish IN (
    'jaguar', 'perro', 'gato', 'caballo', 'vaca', 'cerdo',
    'gallina', 'pájaro', 'pez', 'tortuga', 'loro', 'mono',
    'mariposa', 'rana', 'serpiente', 'águila'
  );

INSERT INTO word_category (word_id, category_id)
SELECT w.id, c.id FROM words w, categories c
WHERE c.name = 'Colores'
  AND w.spanish IN (
    'rojo', 'azul', 'verde', 'amarillo', 'blanco',
    'naranja', 'morado', 'negro', 'turquesa', 'celeste'
  );

INSERT INTO word_category (word_id, category_id)
SELECT w.id, c.id FROM words w, categories c
WHERE c.name = 'Familia'
  AND w.spanish IN (
    'madre', 'padre', 'hijo', 'hija', 'hermano', 'hermana',
    'abuela', 'abuelo', 'tío', 'primo', 'suegra', 'cuñado'
  );

INSERT INTO word_category (word_id, category_id)
SELECT w.id, c.id FROM words w, categories c
WHERE c.name = 'Comida'
  AND w.spanish IN (
    'agua', 'pan', 'carne', 'fruta', 'leche', 'maíz',
    'mandioca', 'café', 'azúcar', 'pollo',
    'arroz', 'miel', 'cerveza', 'chocolate'
  );

INSERT INTO word_category (word_id, category_id)
SELECT w.id, c.id FROM words w, categories c
WHERE c.name = 'Numeros'
  AND w.spanish IN (
    'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
    'siete', 'ocho', 'nueve', 'diez',
    'once', 'doce', 'cien', 'mil'
  );

INSERT INTO word_category (word_id, category_id)
SELECT w.id, c.id FROM words w, categories c
WHERE c.name = 'Saludos'
  AND w.spanish IN (
    'hola', 'gracias', 'adiós', 'bueno', 'sí', 'no',
    'bienvenido', 'amigo', 'por favor', 'lo siento',
    'hasta luego', 'buen provecho', 'felicidades', 'con permiso'
  );

INSERT INTO word_category (word_id, category_id)
SELECT w.id, c.id FROM words w, categories c
WHERE c.name = 'Profesiones'
  AND w.spanish IN (
    'médico', 'abogado', 'profesor', 'enfermera', 'carpintero',
    'cocinero', 'agricultor', 'policía',
    'doctor', 'enfermero', 'programador'
  );

INSERT INTO word_category (word_id, category_id)
SELECT w.id, c.id FROM words w, categories c
WHERE c.name = 'Partes del Cuerpo'
  AND w.spanish IN (
    'cabeza', 'mano', 'pie', 'ojo', 'oreja', 'boca',
    'nariz', 'diente', 'corazón', 'espalda',
    'dedo', 'pecho', 'rodilla'
  );

INSERT INTO phrases (spanish, guarani, category, difficulty_level) VALUES
  ('Hola, ¿cómo estás?',           'Maitei, ¿akói ndéve?',                'Saludos',  1),
  ('Me llamo...',                   'Aho''arde...',                        'Saludos',  1),
  ('¿Cuánto cuesta?',               'Mbovy pa ára?',                       'Comida',   1),
  ('Quiero agua',                   'Pote''ysy',                           'Comida',   1),
  ('Buenos días',                   'Aro aty',                             'Saludos',  1),
  ('Buenas noches',                 'Pyhare aty',                          'Saludos',  1),
  ('Muchas gracias',                'Aguyjeetépa',                         'Saludos',  1),
  ('No entiendo',                   'Ndaikuaai',                           'Saludos',  1),
  ('¿Dónde está el baño?',          'Ko''ápe pe jahuha?',                  'Saludos',  2),
  ('Tengo hambre',                  'Ahupái',                              'Comida',   1),
  ('Soy de Argentina',              'Che Argentinagui',                    'Saludos',  2),
  ('¿Cómo se dice en guaraní?',     'Mba''épa guaraníme?',                 'Saludos',  2),
  ('Está muy rico',                 'Heterei ára',                         'Comida',   2),
  ('Necesito ayuda',                'Aikotevë pytyvö',                     'Saludos',  2),
  ('El gato está durmiendo',        'Omba''e ojoja py''ahu',                'Animales', 2),
  ('Mi casa es tu casa',            'Ko óga ndéve ko óga',                 'Familia',  2),
  ('¿Qué hora es?',                 'Peteĩ ára pa?',                       'Saludos',  2),
  ('Me gusta el Paraguay',          'Aho''arde Paraguái',                  'Saludos',  2),
  ('Hoy es un día lindo',           'Ko ára porä ára',                     'Saludos',  1),
  ('Aprender guaraní es bonito',    'Ñe''ëkuaa guaraní porä',             'Saludos',  3);

INSERT INTO achievements (name, description, icon, condition_type, condition_value) VALUES
  ('Primera Palabra',    'Busca tu primera palabra',       '🌱', 'words_learned',      1),
  ('Racha de 7',         'Usa la app 7 días seguidos',     '🔥', 'streak',             7),
  ('Bibliotecario',      'Aprende 100 palabras',           '📚', 'words_learned',      100),
  ('Maestro Guaraní',    'Completa 50 quizzes',            '🏆', 'quizzes_completed',  50),
  ('Coleccionista',      'Guarda 50 favoritos',            '⭐', 'favorites_added',    50),
  ('Precisión Perfecta', 'Quiz sin errores',               '🎯', 'perfect_quiz',       1);

INSERT INTO user_progress (user_id, level, xp, words_learned, quizzes_completed, current_streak, last_active_date) VALUES
  (1, 1, 0, 0, 0, 0, CURRENT_DATE),
  (2, 1, 0, 0, 0, 0, CURRENT_DATE);
