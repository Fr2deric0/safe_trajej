import React from 'react';
import styles from '../css/csscomponents/cssresultatsearch.css';

const Resultatsearch = () => {
    return (
        <div className="resultatsearch_container">
            <h1>SafeTraJeJ</h1>
            <script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.67/build/spline-viewer.js"></script>
            <spline-viewer url="https://prod.spline.design/E0vBTw9J7FWo9zaf/scene.splinecode"></spline-viewer>
        </div>
    );
};

export default Resultatsearch;
