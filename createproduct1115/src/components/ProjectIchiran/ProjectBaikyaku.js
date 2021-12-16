import React,{useState, useEffect} from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ログイン機能（講義からコピペ）
    import { auth } from "../../firebase";
    import {
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
    } from "firebase/auth";

// firebaseのデータベース関連
    import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp,orderBy,doc } from "firebase/firestore";
    import { db} from "../../firebase";

const Nyusatsuchu = (props) => {

    // useStateでfirebaseから読み込む、bukkendataをデフォルトで定義  
        const [Bukkendata, setBukkendata] = useState(
            [{
                id: "",
                BukkenAddress: "",
                BukkenShurui: "",
                BukkenTeian: {
                        Baikyaku: true,
                        Reform: true,
                        Rent: true,
                        Sonota: true
                    },
                NameJinushi: "",
                EmailJinushi: "",
                CommentTo: "",
                KibouFee: "",
                RegTimestamp:"",
            }]
        );

    console.log("Bukkendata>",Bukkendata);

    // useEffectを使ってdb>projectのデータを取得する
    useEffect(() => {

        //Firebase ver9 compliant (modular)
            const q = query(collection(db, "project"), orderBy("RegTimestamp", "desc"));
            const unSub = onSnapshot(q, (snapshot) => {

                setBukkendata(
                    snapshot.docs.map((doc) => {
                        
                        // firebaseのtimestampを文字列に変換する
                        let formatTime = `
                            ${doc.data().RegTimestamp.toDate().getFullYear()}年
                            ${doc.data().RegTimestamp.toDate().getMonth()+1}月
                            ${doc.data().RegTimestamp.toDate().getDate()}日
                        `
                        console.log("formatTime>",formatTime);

                        let BukkenShuruiSent = "";
                        if (doc.data().BukkenShurui == "Kodate"){
                            BukkenShuruiSent = "建物＋土地";
                        } else if(doc.data().BukkenShurui == "Tochi"){
                            BukkenShuruiSent = "土地のみ";
                        } else {
                            BukkenShuruiSent = "分譲マンション";
                        }

                        console.log("BukkenShuruiSent>",BukkenShuruiSent);

                        return ({
                            id: doc.id,
                            BukkenAddress: doc.data().BukkenAddress,
                            BukkenShurui: doc.data().BukkenShurui,
                            BukkenTeian: {
                                    Baikyaku: doc.data().BukkenTeian.Baikyaku,
                                    Reform: doc.data().BukkenTeian.Reform,
                                    Rent: doc.data().BukkenTeian.Rent,
                                    Sonota: doc.data().BukkenTeian.Sonota
                                },
                            NameJinushi: doc.data().NameJinushi,
                            EmailJinushi: doc.data().EmailJinushi,
                            CommentTo: doc.data().CommentTo,
                            KibouFee: doc.data().KibouFee,
                            RegTimestamp: formatTime,
                            BukkenShuruiSent: BukkenShuruiSent
                        })
                    
                    })
                );

            });

        return () => {
            unSub();
            console.log("Bukkendata>",Bukkendata);
        };
    }, []);


    let navigate = useNavigate();

    // const onClickCard = (props) =>{
    //     console.log("クリックしたよ");
    //     navigate("/ProjectShosai")
    // };
    

    return (
        <div>
            <Container sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>

                {/* mapで物件情報の要約情報を登録しよう */}
                
                {Bukkendata &&
                    Bukkendata.map((item,index) => (

                        <Card variant="outlined" sx={{maxWidth:"375"}}>
                            <CardActionArea>
                                <CardContent>
                                    <Stack spacing={1} style={{minWidth:375,maxWidth:800}}>
                                            <Typography variant="h7" color="text.success">{item.BukkenShuruiSent}</Typography>
                                            <Typography variant="h6" color="text.success">{`${item.BukkenAddress.slice(0,10)} ...`}</Typography>

                                            <Stack direction="row" spacing={1} sx={{justifyContent:"space-between"}}>
                                                <Typography variant="h7" color="text.success">希望の紹介料</Typography>
                                                <Typography variant="h6" color="text.success">{item.KibouFee}万円</Typography>
                                            </Stack>

                                            <Stack direction="row" spacing={1} sx={{justifyContent:"space-between"}}>

                                                <Typography variant="h7" color="text.success">{item.RegTimestamp}</Typography>

                                                <Button variant="contained"
                                                    // successは緑っぽい色
                                                    color="success"
                                                    sx={{width:200,
                                                        margin:"auto"
                                                    }}
                                                >
                                                    <Link to= {`/ProjectShosai?id=${item.id}`}
                                                        style = {{textDecoration:"none",
                                                        color:"#e9fef7",
                                                        fontSize:"1vw",
                                                    }}


                                                    >
                                                        詳細確認(有料)＋
                                                        {item.id}
                                                    </Link>
                                                </Button>
                                            </Stack>

                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    ))
                
                
                };
            </Container>
        </div>
    )
}

export default Nyusatsuchu
