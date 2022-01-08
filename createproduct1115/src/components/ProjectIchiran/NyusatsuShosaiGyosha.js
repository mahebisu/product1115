import React,{useState,useEffect} from 'react'
import { Button, Container, Stack, TextField,Typography } from "@mui/material";
import ResponsiveAppBarGyosha from '../Appbar/ResponsiveAppBarGyosha'
import { Link,useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';

// firebaseのデータベース関連
    import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp, orderBy, doc, where } from "firebase/firestore";
    import { db } from "../../firebase";

// googlemapを挿入する
    import Gmap from '../Gmap/Gmap';



const NyusatsuShosaiGyosha = () => {

    // ProjectBaikyakuから?id=のprojectidをゲット
        const urlidquery = new URLSearchParams(useLocation().search);
        const NyusatsuId = urlidquery.get("NyusatsuId");
        const ProjectId = urlidquery.get("ProjectId");
        console.log("NyusatsuId>", NyusatsuId);
        console.log("ProjectId>", ProjectId);

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
        const qnyusatsu = doc(db, "nyusatsu", NyusatsuId);
        const unSub3 = onSnapshot(qnyusatsu, (d) => {

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

            setNyusatsudata(
                {
                    NyusatsuId: d.id,
                    NakoudoId: d.data().NakoudoId,
                    GyoshaId: d.data().GyoshaId,
                    ProjectId: d.data().ProjectId,
                    CommentToNakoudo: d.data().CommentToNakoudo,
                    NyusatsuFee: d.data().NyusatsuFee,
                    RegTimestamp: formatTime,
                    NameGyosha: d.data().NameGyosha,
                    NameGyoshaCompany: d.data().NameGyoshaCompany,
                    Gyoshashurui: GyoshaShuruiSent
                }
            )

        });

        return () => {
            unSub3();
            console.log("unSub3を実行しました");
        };
    }, [NyusatsuId]);



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

    }, [ProjectId]);

    console.log("Bukkendata.BukkenTeian>", Bukkendata.BukkenTeian);
    console.log("NakoudoId>", Bukkendata.NakoudoId);
    console.log("Bukkendata>", Bukkendata);

    const [Nakoudoname, setNakoudoname] = useState("");
    console.log("NameNakoudo>", Nakoudoname);
    const [Teiantext, setTeiantext] = useState("");
    console.log("Teiantext>", Teiantext);
    const [NakoudoId, setNakoudoId] = useState("");
    console.log("NakoudoId>", NakoudoId);

    // useEffectを使ってNakoudoIdからNameNakoudoのデータを取得する
    useEffect(() => {

        //Firebase ver9 compliant (modular)
        const q2 = query(collection(db, "user"));
        const unSub2 = onSnapshot(q2, (snapshot) => {

            snapshot.docs.map((doc) => {

                // console.log("doc.id>", doc.id, "NakoudoId>", NakoudoId);
                // console.log("doc.data().NameNakoudo>", doc.data().NameNakoudo);

                if (doc.id === NakoudoId) {
                    let k = doc.data().NameNakoudo;
                    setNakoudoname(k);
                    console.log("doc.id == NakoudoId一致しました");
                } else {
                    // console.log("doc.id == NakoudoId一致しませんでした");
                }

            });

        });

        return () => {
            unSub2();
            console.log("unSub2を実行した");
        };
    }, [NakoudoId]);
    

    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarGyosha />

            <Container sx={{ pt: 2, maxWidth: "100%" }}>

                <Stack spacing={2}>

                    {/* googlemapを挿入する */}
                    <Gmap Address={Bukkendata.BukkenAddress}/>

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

                            <Card variant="outlined" sx={{width:375 ,overflowWrap: "break-word"}}>
                                <CardActionArea>
                                    <CardContent>
                                        <Stack spacing={1}>
                                            <Typography variant="h7" color="text.secondary" gutterBottom>
                                                入札メッセージ
                                            </Typography>
                                            <Typography variant="h6" color="text.success">{Nyusatsudata.RegTimestamp}</Typography>
                                            <Typography variant="h6" color="text.success">
                                                {Nyusatsudata.CommentToNakoudo}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                            <Card variant="outlined" sx={{width:375}}>
                                <CardActionArea>
                                    <CardContent>
                                        <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} sx={{justifyContent:"space-between"}}>
                                            <Typography variant="h6" color="text.success">紹介料入札額</Typography>
                                            <Typography variant="h6" color="text.success">{`${Nyusatsudata.NyusatsuFee}万円`}</Typography>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </Stack>

                    </Stack>

                </Stack>

            </Container>

            <hr/>

            <Stack spacing={3} sx={{alignItems:"center",pt:3,margin:"0 auto"}} >


                <Stack  direction="row" spacing={3}>
                    <Button variant="contained"
                        // successは緑っぽい色
                        color="success"
                        size="large"
                        sx={{margin:"0 auto 1000",
                            maxWidth:"300",
                        }}
                    >
                        <Link to="/ProjectIchiran"
                            style={{textDecoration:"none",
                            color:"#e9fef7",
                            fontSize:"1vw"
                        }}>
                            入札一覧に戻る
                        </Link>
                    </Button>

                </Stack>


                
            </Stack>


        </div>
    )
}

export default NyusatsuShosaiGyosha
