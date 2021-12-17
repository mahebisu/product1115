import React,{useState,useEffect} from 'react'
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
    import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp,orderBy,doc } from "firebase/firestore";
    import { db} from "../../firebase";

// ログイン機能（講義からコピペ）
    import { auth } from "../../firebase";
    import {
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
    } from "firebase/auth";



const cardcontain = (
    <React.Fragment>
        <CardActionArea>
            <CardContent>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div>
                            
                    </div>
                    <div>
                        <Stack spacing={1}>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="h6" color="text.success">山田春子</Typography>
                                <Typography variant="h6" color="text.success">/</Typography>
                                <Typography variant="h6" color="text.success">株式会社XXXX不動産</Typography>
                            </Stack>
                            <div>
                                <Typography variant="h6" color="text.success">先日はどうもありがとうございました・・・・・</Typography>
                            </div>

                        </Stack>

                    </div>
                    <div>
                        <Stack spacing={1}>
                            <div>
                                <Chip label="売却" />
                                <Chip label="40万円" variant="outlined" />
                            </div>
                            <div>
                                    <Typography variant="h7" color="text.success">２月１７日</Typography>
                            </div>
                        </Stack>
                    </div>
                </div>
            </CardContent>
        </CardActionArea>
    </React.Fragment>
); 



const Nyusatsuchu = (props) => {

    // 物件データ内に、登録した仲人のIDを登録したいから
        const [EmailNakoudo, setEmailNakoudo] = useState("");
        const [NakoudoId, setNakoudoId] = useState("");
        console.log("EmailNakoudo>",EmailNakoudo);
        console.log("NakoudoId>",NakoudoId);


    // useEffectを使ってuser.emailデータを取得する
        useEffect(() => {

            // まずログインしているuserのメールアドレスを取得する
            //Firebase ver9 compliant (modular)
                const unSub1 = onAuthStateChanged(auth, (user) => {

                    console.log("user情報>",user.email);
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

                    snapshot.docs.map((doc,index) => {

                        if(doc.data().EmailNakoudo == EmailNakoudo){
                            setNakoudoId(doc.id);
                            console.log("ログイン中のidをNakoudoIdにsetした",doc.id);
                        };

                        console.log(index,doc.data().EmailNakoudo,EmailNakoudo);

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
            CommentToNakoudo:"",
            NyusatsuFee: "",
            RegTimestamp:"",
        }]
    );

    // useEffectを使ってNakoudoIdが一致するNyusatsuデータを取得する
        useEffect(() => {

            // 次にデータを取得して、メールアドレスに対応するdoc.idを取得する
            //Firebase ver9 compliant (modular)
                const q = query(collection(db, "nyusatsu"), orderBy("RegTimestamp", "desc"));

                const unSub3 = onSnapshot(q, (snapshot) => {

                    setNyusatsudata(
                        snapshot.docs.map((doc) => ({
                            NakoudoId: NakoudoId,
                            GyoshaId: doc.data().GyoshaId,
                            ProjectId: doc.data().ProjectId,
                            CommentToNakoudo:doc.data().CommentToNakoudo,
                            NyusatsuFee: doc.data().NyusatsuFee,
                            RegTimestamp: doc.data().RegTimestamp
                        }))
                    )

                });

            return () => {
                unSub3();
            };
        }, [NakoudoId]);

    console.log("Nyusatsudata>",Nyusatsudata);

    const [Gyoshadata, setGyoshadata] = useState(
        [{
            NameGyosha: "",
            NameGyoshaCompany: "",
            Gyoshashurui:"Baishuu",
        }]

    );
    console.log("Gyoshadata>",Gyoshadata);

    // // useEffectを使ってGyoshaIdからGyoshaNameデータを取得する
    //     useEffect(() => {

    //         // 次にデータを取得して、メールアドレスに対応するdoc.idを取得する
    //         //Firebase ver9 compliant (modular)
    //             const q = query(doc(db, "gyosha",`${Nyusatsudata.GyoshaId}`));
    //             const unSub4 = onSnapshot(q, (snapshot) => {

    //                 setGyoshadata({
    //                     GyoshaId: snapshot.id,
    //                     NameGyosha: snapshot.NameGyosha,
    //                     NameGyoshaCompany: snapshot.NameGyoshaCompany,
    //                     Gyoshashurui: snapshot.Gyoshashurui,
    //                 });

    //             });

    //         return () => {
    //             unSub4();
    //         };
    //     }, [Nyusatsudata]);


    let navigate = useNavigate();

    const onClickCard = (props) =>{
        console.log("クリックしたよ");
        navigate("/NyusatsuShosai")
    };
    

    return (
        <div>
            <Stack spacing={2} sx={{alignItems:"center"}}>

                {/* mapで物件情報の要約情報を登録しよう */}
                
                {Nyusatsudata &&
                    Nyusatsudata.map((item,index) => (

                        <Card variant="outlined" sx={{maxWidth:"375"}} onClick={onClickCard}>
                            <CardActionArea>
                                <CardContent>
                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <div>
                                                
                                        </div>
                                        <div>
                                            <Stack spacing={1}>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="h6" color="text.success">{Gyoshadata.NameGyosha}</Typography>
                                                    <Typography variant="h6" color="text.success">/</Typography>
                                                    <Typography variant="h6" color="text.success">{Gyoshadata.NameGyoshaCompany}</Typography>
                                                </Stack>
                                                <div>
                                                    <Typography variant="h6" color="text.success">{item.CommentToNakoudo}</Typography>
                                                </div>

                                            </Stack>
                                        </div>
                                        <div>
                                            <Stack spacing={1}>
                                                <div>
                                                    <Chip label={`${item.Gyoshashurui}`} />
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


                <Card variant="outlined" sx={{maxWidth:"375"}} onClick={onClickCard}>
                   {cardcontain}
                </Card>
                <Card variant="outlined" sx={{maxWidth:"375"}} onClick={onClickCard}>
                   {cardcontain}
                </Card>
                <Card variant="outlined" sx={{maxWidth:"375"}} onClick={onClickCard}>
                   {cardcontain}
                </Card>
            </Stack>
        </div>
    )
}

export default Nyusatsuchu
