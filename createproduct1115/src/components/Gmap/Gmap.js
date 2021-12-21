import React from 'react'


// googlemap読み込むぞ
    import { GoogleMap, LoadScript } from "@react-google-maps/api";


const Gmap = () => {

    // ENVファイルを読み込む（キャッシュの更新注意）
    const env = process.env
    console.log("process.env>",process.env);

    const containerStyle = {
        width: "100%",
        height: "500px",
      };
      
      const center = {
        lat: 35.69575,
        lng: 139.77521,
      };

    return (
        <div>
            {/* process.env.HOGEで読み込めます。 */}
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={17}
                >

                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default Gmap
