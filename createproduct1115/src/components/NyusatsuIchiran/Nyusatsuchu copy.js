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
import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp, orderBy, doc } from "firebase/firestore";
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

                console.log(index, doc.data().EmailNakoudo, EmailNakoudo);

            })

        });

        return () => {
            unSub2();
        };
    }, [EmailNakoudo]);


    const [Nyusatsudata, setNyusatsudata] = useState(
        [{
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
            const qnyusatsu = query(collection(db, "nyusatsu"), orderBy("RegTimestamp", "desc"));
            const unSub3 = onSnapshot(qnyusatsu, (snapshot) => {

                setNyusatsudata(

                    snapshot.docs.map((d) => {

                        let qgi = d.data().GyoshaId;
                        let NameGyoshax =  "";
                        let NameGyoshaCompanyx = "";
                        let Gyoshashuruix = "";            
                        const unSub6 = onSnapshot(doc(db, "gyosha", qgi), (snap) => {
                            NameGyoshax = snap.data().NameGyosha;
                            NameGyoshaCompanyx = snap.data().NameGyoshaCompany;
                            Gyoshashuruix = snap.data().Gyoshashurui;
                            console.log("中>",NameGyoshax,NameGyoshaCompanyx,Gyoshashuruix);
                        });


                        console.log("GyoshaInfo>",NameGyoshax,NameGyoshaCompanyx,Gyoshashuruix);

                        return {
                            NakoudoId: NakoudoId,
                            GyoshaId: d.data().GyoshaId,
                            ProjectId: d.data().ProjectId,
                            CommentToNakoudo: d.data().CommentToNakoudo,
                            NyusatsuFee: d.data().NyusatsuFee,
                            RegTimestamp: d.data().RegTimestamp,
                            NameGyosha: NameGyoshax,
                            NameGyoshaCompany: NameGyoshaCompanyx,
                            Gyoshashurui: Gyoshashuruix
                
                        };

                    })

                )

            });

            return () => {
                unSub3();
                console.log("unSub3を実行しました");
            };
        }, [NakoudoId]);


    console.log("Nyusatsudata>", Nyusatsudata);
    console.log("Nyusatsudata.GyoshaInfo>", Nyusatsudata[0].NameGyosha);


    let navigate = useNavigate();

    const onClickCard = (props) => {
        console.log("クリックしたよ");
        navigate("/NyusatsuShosai")
    };


    return (
        <div>
            <Stack spacing={2} sx={{ alignItems: "center" }}>

                {/* mapで物件情報の要約情報を登録しよう */}

                {Nyusatsudata &&
                    Nyusatsudata.map((item, index) => (

                        <Card variant="outlined" sx={{ maxWidth: "375" }} onClick={onClickCard}>
                            <CardActionArea>
                                <CardContent>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>

                                        </div>
                                        <div>
                                            <Stack spacing={1}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="h6" color="text.success">{item.NameGyosha}</Typography>
                                                    <Typography variant="h6" color="text.success">/</Typography>
                                                    <Typography variant="h6" color="text.success">{item.CommentToNakoudo}</Typography>
                                                </Stack>
                                                <div>
                                                    <Typography variant="h6" color="text.success">{item.CommentToNakoudo}</Typography>
                                                </div>

                                            </Stack>
                                        </div>
                                        <div>
                                            <Stack spacing={1}>
                                                <div>
                                                    <Chip label={item.CommentToNakoudo} />
                                                    <Chip label={`${item.NyusatsuFee}万円`} variant="outlined" />
                                                </div>
                                                <div>
                                                    <Typography variant="h7" color="text.success">{`{item.RegTimestamp.toDate().getFullYear()}年`}</Typography>
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
