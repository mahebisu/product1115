import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// firebaseのデータベース関連
import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp, orderBy, doc, where } from "firebase/firestore";
import { db } from "../../firebase";

// ログイン機能（講義からコピペ）
import { auth } from "../../firebase";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";


const Nyusatsuchu = (props) => {

    // 物件データ内に、登録した仲人のIDを登録したいから
    const [EmailNakoudo, setEmailNakoudo] = useState("");
    const [NakoudoId, setNakoudoId] = useState("");
    console.log("EmailNakoudo>", EmailNakoudo);
    console.log("NakoudoId>", NakoudoId);


    // useEffectを使ってuser.emailデータを取得する
    useEffect(() => {

        // まずログインしているuserのメールアドレスを取得する
        //Firebase ver9 compliant (modular)
        const unSub1 = onAuthStateChanged(auth, (user) => {

            console.log("user情報>", user.email);
            // authにuser情報があれば、IsLoginをtrue
            user.email && setEmailNakoudo(user.email);

        });

        return () => {
            unSub1();
        };
    }, []);

    // useEffectを使ってuser.emailからuser.idデータを取得する
    useEffect(() => {

        // 次にデータを取得して、メールアドレスに対応するdoc.idを取得する
        //Firebase ver9 compliant (modular)
        const q = query(collection(db, "user"));
        const unSub2 = onSnapshot(q, (snapshot) => {

            snapshot.docs.map((doc, index) => {

                if (doc.data().EmailNakoudo == EmailNakoudo) {
                    setNakoudoId(doc.id);
                    console.log("ログイン中のidをNakoudoIdにsetした", doc.id);
                };

                // console.log(index, doc.data().EmailNakoudo, EmailNakoudo);

            })

        });

        return () => {
            unSub2();
        };
    }, [EmailNakoudo]);


    const [Nyusatsudata, setNyusatsudata] = useState(
        [{
            NyusatsuId: "",
            NakoudoId: "",
            GyoshaId: "",
            ProjectId: "",
            CommentToNakoudo: "",
            NyusatsuFee: "",
            RegTimestamp: "",
            NameGyosha: "",
            NameGyoshaCompany: "",
            Gyoshashurui: ""
        }]
    );

    // useEffectを使ってNakoudoIdが一致するNyusatsuデータを取得する
        useEffect(() => {

            //Firebase ver9 compliant (modular)
            const qnyusatsu = query(collection(db, "nyusatsu"), where("NakoudoId", "==", NakoudoId ));
            const unSub3 = onSnapshot(qnyusatsu, (snapshot) => {

                setNyusatsudata(

                    snapshot.docs.map((d) => {

                        // firebaseのtimestampを文字列に変換する
                            let formatTime = `
                            ${d.data().RegTimestamp.toDate().getFullYear()}年
                            ${d.data().RegTimestamp.toDate().getMonth() + 1}月
                            ${d.data().RegTimestamp.toDate().getDate()}日
                            `

                            let GyoshaShuruiSent = "";
                            if (d.data().Gyoshashurui == "Baishuu") {
                                GyoshaShuruiSent = "買取";
                            } else if (d.data().Gyoshashurui == "Reform") {
                                GyoshaShuruiSent = "建築";
                            } else if (d.data().Gyoshashurui == "Rent") {
                                GyoshaShuruiSent  = "賃貸";
                            }else {
                                GyoshaShuruiSent = "その他";
                            }
                        
                            return {
                                NyusatsuId: d.id,
                                NakoudoId: NakoudoId,
                                GyoshaId: d.data().GyoshaId,
                                ProjectId: d.data().ProjectId,
                                CommentToNakoudo: d.data().CommentToNakoudo,
                                NyusatsuFee: d.data().NyusatsuFee,
                                RegTimestamp: formatTime,
                                NameGyosha: d.data().NameGyosha,
                                NameGyoshaCompany: d.data().NameGyoshaCompany,
                                Gyoshashurui: GyoshaShuruiSent
                            };
                    })

                )

            });

            return () => {
                unSub3();
                console.log("unSub3を実行しました");
            };
        }, [NakoudoId]);


    // console.log("Nyusatsudata>", Nyusatsudata);


    let navigate = useNavigate();

    const onClickCard = (NyusatsuId,e) => {
        console.log("クリックしたよ>",NyusatsuId,e);
        navigate(`/NyusatsuShosai?id=${NyusatsuId}`)
    };


    return (
        <div>
            <Stack spacing={2} sx={{ alignItems: "center" }}>

                {/* mapで物件情報の要約情報を登録しよう */}

                {Nyusatsudata &&
                    Nyusatsudata.map((item,index) => (

                        // onClick={(e) => onClickCard(item.NyusatsuId,e)}の書き方学んだ
                        <Card variant="outlined" sx={{Width:400}} onClick={(e) => onClickCard(item.NyusatsuId,e)} key={index} value={`${item.NakoudoId}`}>
                            <CardActionArea>
                                <CardContent>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>
                                            <Stack  spacing={1}>
                                                <Typography variant="h7" color="text.success">{`${item.NameGyoshaCompany}/`}</Typography>
                                                <Typography variant="h6" color="text.success">{item.NameGyosha}</Typography>
                                                <Typography variant="h7" color="text.success">{`${item.CommentToNakoudo.slice(0,10)} ...`}</Typography>
                                            </Stack>
                                        </div>
                                        <div style={{paddingLeft:50}}>
                                            <Stack spacing={1}>
                                                <div>
                                                    <Chip label={item.Gyoshashurui} />
                                                    <Chip label={`${item.NyusatsuFee}万円`} variant="outlined" />
                                                </div>
                                                <div>
                                                    <Typography variant="h7" color="text.success">{item.RegTimestamp}</Typography>
                                                </div>
                                            </Stack>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    ))
                };

            </Stack>
        </div>
    )
}

export default Nyusatsuchu
