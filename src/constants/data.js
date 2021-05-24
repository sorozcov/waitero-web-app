import cantina from '../assets/cantina.png';
import frisco from '../assets/frisco.png';
import jkming from '../assets/jkming.png';
import tefra from '../assets/tefra.png';

import cantina_food from '../assets/cantina-food.png';
import frisco_food from '../assets/frisco-food.png';
import jkming_food from '../assets/jkming-food.png';
import tefra_food from '../assets/tefra-food.png';


export const restaurants = [
    {
        id: 1,
        name: "TreFratelli",
        logo: tefra,
        food: tefra_food
    },
    {
        id: 2,
        name: "La Cantina",
        logo: cantina,
        food: cantina_food
    },
    {
        id: 3,
        name: "Frisco Grill",
        logo: frisco,
        food: frisco_food
    },
    {
        id: 4,
        name: "J.K. Ming",
        logo: jkming,
        food: jkming_food
    }
];

export const branches = [
    {
        id: 1,
        name: 'Majadas Once',
        restaurant_id: "5e21df4c-5cdd-41ba-ac8a-7b6f988f02c2",
        location: '27 ave. 6-40, Zona 11'
    },
    {
        id: 2,
        name: 'Condado Naranjo',
        restaurant_id: 2,
        location: '22 calle 7-15 zona 4 de Mixco'
    },
    {
        id: 3,
        name: 'Paseo Cayalá',
        restaurant_id: "5e21df4c-5cdd-41ba-ac8a-7b6f988f02c2",
        location: 'Boulevard Rafael Landívar 10-05 Paseo Cayalá, Zona 16, Guatemala, - Guatemala'
    },
    {
        id: 4,
        name: 'Plaza Fontabella',
        restaurant_id: 4,
        location: '56 Plaza Fontabella, 14 Calle 2, Cdad. de Guatemala'
    },
];

export const API_BASE_URL_WEB = 'http://127.0.0.1:8000/api/v1';
export const API_BASE_URL_ANDROID = 'http://192.168.1.10:8000/api/v1';
export const MEDIA_BASE_URL = 'http://192.168.1.8:8000';