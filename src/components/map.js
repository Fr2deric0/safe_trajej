import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styles from '../css/csscomponents/cssmap.css'

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const styleDeConteneur = {
    width: '75vw',
    height: '98vh',
    borderRadius: '20px',
};

const styleDeCarteSombre = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#1e1e1e' }]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#1e1e1e' }]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#e0e0e0' }]
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f5f5f5' }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f5f5f5' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263238' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#90a4ae' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#424242' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212121' }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#616161' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212121' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#424242' }]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f5f5f5' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#51bce7' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#b0bec5' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#0d47a1' }]
    }
];

function Carte() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBT-Ae5JMnlCLbX5zi8BViKF40zjCKrx1g"
    });

    const [position, setPosition] = useState(null);
    const [marqueurs, setMarqueurs] = useState([]);
    const [modeMarqueurUnique, setModeMarqueurUnique] = useState(false);
    const [afficherCoordonnees, setAfficherCoordonnees] = useState(false);

    const handleChangeSelect = (evenement) => {
        setMotSelectionne(evenement.target.value);
    };

    const [motSelectionne, setMotSelectionne] = useState('');

    const gererClicCarte = useCallback((evenement) => {
        if (modeMarqueurUnique) {
            const nouveauMarqueur = {
                lat: evenement.latLng.lat(),
                lng: evenement.latLng.lng(),
            };
            setMarqueurs([nouveauMarqueur]);
        }
    }, [modeMarqueurUnique]);

    const obtenirLocalisation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (erreur) => {
                    console.log(erreur.message);
                },
                options
            );
        } else {
            console.log("La géolocalisation n'est pas prise en charge par votre navigateur");
        }
    };

    useEffect(() => {
        obtenirLocalisation();
    }, []);

    const rendreFormulaireCoordonnees = () => {
        // Votre fonction ici
    };

    const refreshLocation = () => {
        obtenirLocalisation(); // Met à jour la position actuelle
    };

    return isLoaded ? (
        <div>
            <GoogleMap
                mapContainerStyle={styleDeConteneur}
                center={position}
                zoom={15}
                onClick={gererClicCarte}
                options={{styles: styleDeCarteSombre}}
            >
                {position && !modeMarqueurUnique && <Marker position={position}/>}
                {marqueurs.map((marqueur, index) => (
                    <Marker key={index} position={marqueur} />
                ))}
            </GoogleMap>
            <div className={'ContainerSignalisation'}>
                <div>
                    <button onClick={refreshLocation}>Actualiser la géolocalisation</button>
                    <button className={'BoutonSignalisation'}
                            onClick={() => setAfficherCoordonnees(!afficherCoordonnees)}>
                        {afficherCoordonnees ? 'Cacher' : 'Signaler'}
                    </button>
                </div>
                <div>
                    {afficherCoordonnees && rendreFormulaireCoordonnees()}
                </div>
            </div>
        </div>
    ) : <></>;
}

export default Carte;
