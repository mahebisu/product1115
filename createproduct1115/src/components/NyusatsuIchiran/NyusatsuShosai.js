import React,{useState,useEffect} from 'react'
import { Button, Container, Stack, TextField,Typography } from "@mui/material";
import ResponsiveAppBar from '../Appbar/ResponsiveAppBar'
import { Link,useLocation } from "react-router-dom";
import Nyusatsuchu from './Nyusatsuchu';
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


const NyusatsuShosai = () => {

    // ProjectBaikyakuから?id=のprojectidをゲット
        const urlidquery = new URLSearchParams(useLocation().search);
        const NyusatsuId = urlidquery.get("id");
        console.log("NyusatsuId>", NyusatsuId);

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
    

    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBar />

            <Stack spacing={3} sx={{alignItems:"center",pt:3,margin:"0 auto"}} >

                <Stack  spacing={1}>
                    <Typography variant="h6" color="text.success">{Nyusatsudata.NameGyosha}</Typography>
                    <Typography variant="h6" color="text.success">{Nyusatsudata.NameGyoshaCompany}</Typography>
                </Stack>

                <Card variant="outlined" sx={{width:375 ,overflowWrap: "break-word"}}>
                    <CardActionArea>
                        <CardContent>
                            <Stack spacing={1}>
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

                <Stack  direction="row" spacing={3}>
                    <Button variant="contained"
                        // successは緑っぽい色
                        color="success"
                        size="large"
                        sx={{margin:"0 auto 1000",
                            maxWidth:"300",
                        }}
                    >
                        <Link to="/NyusatsuIchiran"
                            style={{textDecoration:"none",
                            color:"#e9fef7",
                            fontSize:"1vw"
                        }}>
                            入札一覧に戻る
                        </Link>
                    </Button>

                    <Button variant="contained"
                        // successは緑っぽい色
                        color="success"
                        size="large"
                        sx={{margin:"0 auto 1000",
                            maxWidth:"300",
                        }}
                    >
                        <Link to="/NyusatsuIchiran"
                            style={{textDecoration:"none",
                            color:"#e9fef7",
                            fontSize:"1vw"
                        }}>
                            紹介する
                        </Link>
                    </Button>


                </Stack>


                
            </Stack>


        </div>
    )
}

export default NyusatsuShosai
