import React, { useState, useEffect } from 'react'
import { Button, Container, Stack, TextField, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ResponsiveAppBarGyosha from '../Appbar/ResponsiveAppBarGyosha'
import { Link, useLocation } from "react-router-dom";
import pic2 from "./mappic2.png"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

// radioボタンをつくるために導入
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { width } from '@mui/system';

// ログイン機能（講義からコピペ）
import { auth } from "../../firebase";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

// firebaseのデータベース関連
import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp, orderBy, doc } from "firebase/firestore";
import { db } from "../../firebase";

// googlemapを挿入する
    import Gmap from '../Gmap/Gmap';


const ProjectShosai = () => {

    // ProjectBaikyakuから?id=のprojectidをゲット
    const urlidquery = new URLSearchParams(useLocation().search);
    const ProjectId = urlidquery.get("id");
    console.log("ProjectId>", ProjectId);

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
            RegTimestamp: "",
            NakoudoId: "",
            BukkenShuruiSent: ""
        }]
    );

    const [Nakoudoname, setNakoudoname] = useState("");
    console.log("NameNakoudo>", Nakoudoname);
    const [Teiantext, setTeiantext] = useState("");
    console.log("Teiantext>", Teiantext);
    const [NakoudoId, setNakoudoId] = useState("");
    console.log("NakoudoId>", NakoudoId);

    // useEffectを使ってdb>projectのデータを取得する
    useEffect(() => {

        //Firebase ver9 compliant (modular)
        const q = query(doc(db, "project", ProjectId));
        const unSub = onSnapshot(q, (snapshot) => {

            console.log("snapshot>", snapshot.data());

            // firebaseのtimestampを文字列に変換する
            let formatTime = `
                            ${snapshot.data().RegTimestamp.toDate().getFullYear()}年
                            ${snapshot.data().RegTimestamp.toDate().getMonth() + 1}月
                            ${snapshot.data().RegTimestamp.toDate().getDate()}日
                        `

            let BukkenShuruiSent = "";
            if (snapshot.data().BukkenShurui == "Kodate") {
                BukkenShuruiSent = "建物＋土地";
            } else if (snapshot.data().BukkenShurui == "Tochi") {
                BukkenShuruiSent = "土地のみ";
            } else {
                BukkenShuruiSent = "分譲マンション";
            }

            console.log("BukkenShuruiSent>", BukkenShuruiSent);

            // 提案内容のテキストブロックを作成
            let a = "";
            let b = "";
            let c = "";
            let d = "";
            if (snapshot.data().BukkenTeian.Baikyaku) {
                a = "売却 ";
            }
            if (snapshot.data().BukkenTeian.Reform) {
                b = "建替え（リフォーム） ";
            }
            if (snapshot.data().BukkenTeian.Rent) {
                c = "貸出 ";
            }
            if (snapshot.data().BukkenTeian.Sonota) {
                d = "その他有効活用 ";
            }
            setTeiantext(a + b + c + d);

            setBukkendata({
                id: ProjectId,
                BukkenAddress: snapshot.data().BukkenAddress,
                BukkenShurui: snapshot.data().BukkenShurui,
                BukkenTeian: {
                    Baikyaku: snapshot.data().BukkenTeian.Baikyaku,
                    Reform: snapshot.data().BukkenTeian.Reform,
                    Rent: snapshot.data().BukkenTeian.Rent,
                    Sonota: snapshot.data().BukkenTeian.Sonota
                },
                NameJinushi: snapshot.data().NameJinushi,
                EmailJinushi: snapshot.data().EmailJinushi,
                CommentTo: snapshot.data().CommentTo,
                KibouFee: snapshot.data().KibouFee,
                RegTimestamp: formatTime,
                BukkenShuruiSent: BukkenShuruiSent,
                NakoudoId: snapshot.data().NakoudoId,
                BukkenShuruiSent: BukkenShuruiSent
            })

            setNakoudoId(snapshot.data().NakoudoId)

        });

        return () => {
            unSub();
        }

    }, []);

    console.log("Bukkendata.BukkenTeian>", Bukkendata.BukkenTeian);
    console.log("NakoudoId>", Bukkendata.NakoudoId);
    console.log("Bukkendata>", Bukkendata);

    // useEffectを使ってNakoudoIdからNameNakoudoのデータを取得する
    useEffect(() => {

        //Firebase ver9 compliant (modular)
        const q2 = query(collection(db, "user"));
        const unSub2 = onSnapshot(q2, (snapshot) => {

            snapshot.docs.map((doc) => {

                console.log("doc.id>", doc.id, "NakoudoId>", NakoudoId);
                console.log("doc.data().NameNakoudo>", doc.data().NameNakoudo);

                if (doc.id === NakoudoId) {
                    let k = doc.data().NameNakoudo;
                    setNakoudoname(k);
                    console.log("doc.id == NakoudoId一致しました");
                } else {
                    console.log("doc.id == NakoudoId一致しませんでした");
                }

            });

        });

        return () => {
            unSub2();
        };
    }, [NakoudoId]);


    // useformはreact-hook-formのコンポーネント、分割代入してる
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty, isSubmitting, touchedFields, submitCount },
        getValues,
        watch,
        reset
    } = useForm();

    // フォーム送信時の処理
    const onSubmit = (data) => {
        // バリデーションチェックOK！なときに行う処理を追加
        console.log("isDirty>", isDirty);
        console.log("isValid>", isValid);
        console.log(submitCount);

        // getValuesの値がエラーなく入れられているかのチェック、inValid?

        // formで入力した値をgetValuesで取得する
        const getValuetachi = getValues();
        console.log(getValuetachi);

        // errorsを表示させる
        console.log("errors>", errors);

        // getValuesの値をそれぞれfirebaseに送る工程



        // 次のページに遷移する

    };


    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarGyosha />

            <h1 style={{ textAlign: "center" }}>案件情報詳細</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container sx={{ pt: 2, maxWidth: "100%" }}>

                    <Stack spacing={2}>

                        {/* googlemapを挿入する */}
                        <Gmap />
                        
                        {/* ここには後でGooglemapsを入れる */}
                        {/* <Box sx={{
                            backgroundImage: `url(${pic2})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% auto",
                            width: "100%",
                            height: "500px"
                        }} /> */}

                        <Stack direction="row" spacing={5} sx={{ justifyContent: "space-around" }}>

                            <Stack spacing={2}>
                                <Card variant="outlined" sx={{ width: 500 }}>
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            物件の所在地
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {Bukkendata.BukkenAddress}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            物件の種類
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {Bukkendata.BukkenShuruiSent}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            希望の有効活用
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {Teiantext}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            被紹介者氏名
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {Bukkendata.NameJinushi}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            紹介者氏名
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {Nakoudoname}
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Stack>

                            <Stack spacing={2}>
                                {/* overflowWrap: "break-word"で文章を自動で折り返す */}
                                <Card variant="outlined" sx={{ width: 500, overflowWrap: "break-word" }}>
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            物件の大きさ/古さ/検討動機など知っていること
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {Bukkendata.CommentTo}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h7" color="text.secondary" gutterBottom>
                                            希望の紹介料
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {Bukkendata.KibouFee}万円
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Stack>

                        </Stack>

                    </Stack>



                    <hr />

                    <Stack direction="row" spacing={2} sx={{ justifyContent: "space-around" }}>
                        <Button
                            onClick={onSubmit}
                            color="warning"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{ margintop: 500, width: 300 }}
                        >
                            <Link to="/ProjectIchiran"
                                style={{
                                    textDecoration: "none",
                                    color: "#e9fef7",
                                    fontSize: "1.5vw"
                                }}>
                                質問する(対応予定)
                            </Link>
                        </Button>

                        <Button
                            onClick={onSubmit}
                            color="warning"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{ margintop: 500, width: 300 }}
                        >
                            <Link to={`/ProjectNyusatsu?NakoudoId=${Bukkendata.NakoudoId}&ProjectId=${ProjectId}`}
                                style={{
                                    textDecoration: "none",
                                    color: "#e9fef7",
                                    fontSize: "1.5vw"
                                }}>
                                紹介料入札
                            </Link>
                        </Button>
                    </Stack>

                </Container>
            </form>

        </div>
    )
}

export default ProjectShosai
