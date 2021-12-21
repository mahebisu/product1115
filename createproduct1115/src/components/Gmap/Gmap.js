import React,{useState,useEffect} from 'react'


// googlemap読み込むぞ
    import { GoogleMap, LoadScript,Marker } from "@react-google-maps/api";

// geocodeを読み込んだ
    import Geocode from "react-geocode";


const Gmap = ({Address}) => {

    const BukkenAddress = Address;
    console.log("BukkenAddress>",BukkenAddress);//OK、読み込めてる

    // ENVファイルを読み込む（キャッシュの更新注意）
    const env = process.env
    console.log("process.env>",process.env);

    const [MapCenter, setMapCenter] = useState({});

    const containerStyle = {
        width: "100%",
        height: "500px",
      };

    // 住所から緯度経度を取り出す関数の定義
    const FromAddressToLat = (ad) => {

        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
        Geocode.fromAddress(ad).then(
            response => {

                setMapCenter(response.results[0].geometry.location);
                console.log("response.results[0].geometry.location>",response.results[0].geometry.location);

            },
            error => {
                console.error(error);
            }
        );
    }

    useEffect(() => {

        FromAddressToLat(BukkenAddress);

    }, [BukkenAddress]);

    // マーカーの書式を定義する
    const markerLabel = {
        color: "green",
        background: "black",
        fontFamily: "sans-serif",
        fontSize: "1.5vw",
        fontWeight: "100",
        text: BukkenAddress,
      };
    

    return (
        <div>
            {/* process.env.HOGEで読み込めます。 */}
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={MapCenter}
                    zoom={18}
                >
                    <Marker position={MapCenter} label={markerLabel} />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default Gmap
