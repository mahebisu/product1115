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


const BukkenIchiran = (props) => {

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


    const [ProjectData, setProjectData] = useState(
        [{
            id:"",
            BukkenAddress: "",
            BukkenShurui: "",
            BukkenTeian: "",
            NameJinushi: "",
            EmailJinushi: "",
            CommentTo: "",
            KibouFee: "",
            RegTimestamp:"",
        }]
);

    // useEffectを使ってNakoudoIdが一致するNyusatsuデータを取得する
        useEffect(() => {

            //Firebase ver9 compliant (modular)
            const q = query(collection(db, "project"), where("NakoudoId", "==", NakoudoId ));
            const unSub3 = onSnapshot(q, (snapshot) => {

                setProjectData(

                    snapshot.docs.map((d) => {

                        // firebaseのtimestampを文字列に変換する
                            let formatTime = `
                            ${d.data().RegTimestamp.toDate().getFullYear()}年
                            ${d.data().RegTimestamp.toDate().getMonth() + 1}月
                            ${d.data().RegTimestamp.toDate().getDate()}日
                            `

                            // 提案内容のテキストブロックを作成
                                let t1 = "";
                                let t2 = "";
                                let t3 = "";
                                let t4 = "";
                                if (d.data().BukkenTeian.Baikyaku) {
                                    t1 = "売却 ";
                                }
                                if (d.data().BukkenTeian.Reform) {
                                    t2 = "建替え（リフォーム） ";
                                }
                                if (d.data().BukkenTeian.Rent) {
                                    t3 = "貸出 ";
                                }
                                if (d.data().BukkenTeian.Sonota) {
                                    t4 = "その他有効活用 ";
                                }
                                let BukkenTeianSent = t1 + t2 + t3 + t4;
                        
                            return {
                                id:d.id,
                                BukkenAddress: d.data().BukkenAddress,
                                BukkenShurui: d.data().BukkenShurui,
                                BukkenTeian: BukkenTeianSent,
                                NameJinushi: d.data().NameJinushi,
                                EmailJinushi: d.data().EmailJinushi,
                                CommentTo: d.data().CommentTo,
                                KibouFee: d.data().KibouFee,
                                RegTimestamp: formatTime
                            };
                    })

                )

            });

            return () => {
                unSub3();
                console.log("unSub3を実行しました");
            };
        }, [NakoudoId]);


    // console.log("Nyusatsudata>", ProjectData);


    let navigate = useNavigate();

    const onClickCard = (ProjectId,e) => {
        console.log("クリックしたよ",ProjectId,e);
        navigate(`/ProjectShosaiUser?ProjectId=${ProjectId}`)
    };


    return (
        <div>
            <Stack spacing={2} sx={{ alignItems: "center" }}>

                {/* mapで物件情報の要約情報を登録しよう */}

                {ProjectData &&
                    ProjectData.map((item,index) => (
                        <Card variant="outlined"  style={{width:375}} onClick={(e) => onClickCard(item.id,e)} key={index} value={`${item.id}`}>
                            <CardActionArea>
                                <CardContent>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>
                                            <Stack  spacing={1}>
                                                <Typography variant="h7" color="text.success">{item.BukkenTeian}</Typography>
                                                <Typography variant="h6" color="text.success">{item.NameJinushi}</Typography>
                                                <Typography variant="h7" color="text.success">{item.BukkenAddress}</Typography>
                                            </Stack>
                                        </div>
                                        <div style={{paddingLeft:50}}>
                                            <Stack spacing={1}>
                                                <div>
                                                    <Chip label={`${item.KibouFee}万円`} variant="outlined" />
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

export default BukkenIchiran
