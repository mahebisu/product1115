import React,{useState,useEffect} from 'react'
import { Button, Container, Stack, TextField,Box,ToggleButton,ToggleButtonGroup,Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ResponsiveAppBar from '../Appbar/ResponsiveAppBar'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import pic1 from "./Mappic.png"
import InputAdornment from '@mui/material/InputAdornment';

// radioボタンをつくるために導入
    import Radio from '@mui/material/Radio';
    import RadioGroup from '@mui/material/RadioGroup';
    import FormControlLabel from '@mui/material/FormControlLabel';
    import FormControl from '@mui/material/FormControl';
    import FormLabel from '@mui/material/FormLabel';
// switchをつくるために導入    
    import Switch from '@mui/material/Switch';
    import FormGroup from '@mui/material/FormGroup';

// ログイン機能（講義からコピペ）
    import { auth } from "../../firebase";
    import {
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
    } from "firebase/auth";

// firebaseのデータベース関連
    import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp,orderBy,doc,where } from "firebase/firestore";
    import { db} from "../../firebase";
import GmapTouroku from '../Gmap/GmapTouroku';



const BukkenTouroku = () => {

    // Bukkenshuruiを保持しよう
        const [BukkenShurui, setBukkenShurui] = useState("Tochi");
    // ToggleButtonGroupを動かすためにコピペ 
        const [alignment, setAlignment] = React.useState('Tochi');
    // radioボタンの値を取得する関数の定義
            const toggleChange = (event,newAlignment) => {
                
                // ボタンを選択したら動かす
                setAlignment(newAlignment);

                setBukkenShurui(event.target.value);
                console.log(event.target.value)
            };
        console.log("BukkenShurui>",BukkenShurui);

    
    // switchからBukkenShuruiを保持する
        const [BukkenTeian, setBukkenTeian] = React.useState({
            Baikyaku: true,
            Reform: true,
            Rent: true,
            Sonota: true
            });
        
        const switchChange = (event) => {
            setBukkenTeian({
                ...BukkenTeian,
                [event.target.name]: event.target.checked,
            });
        };

        console.log("BukkenTeian>",BukkenTeian);
    
    // useStateでfirebaseから読み込む、bukkendataをデフォルトで定義  
        const [Bukkendata, setBukkendata] = useState(
            [{
                id:"",
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
                const q = query(collection(db, "user"),where("EmailNakoudo", "==", EmailNakoudo ));
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


    // useformはreact-hook-formのコンポーネント、分割代入してる
        const {
            register,
            handleSubmit,
            formState: { errors, isValid, isDirty, isSubmitting, touchedFields, submitCount },
            getValues,
            watch,
            reset
        } = useForm();

    // navigateを宣言
        let navigate = useNavigate();

    // フォーム送信時の処理
        const onSubmit = (data) => {
            // バリデーションチェックOK！なときに行う処理を追加
                console.log("isDirty>",isDirty);
                console.log("isValid>",isValid);
                console.log(submitCount);

            // errorsを表示させる
                console.log("errors>",errors);

            // formで入力した値をgetValuesで取得する
                const getValuetachi = getValues();
                console.log(getValuetachi);

            // User登録のfunctionを定義
            async function CreateProjectFunction() {
                try {

                    //Firebase ver9 compliant
                    // firebaseのログイン中のuserデータにデータ追加する
                        addDoc(collection(db, "project"),{
                            NakoudoId: NakoudoId,
                            BukkenAddress: getValuetachi.BukkenAddress,
                            BukkenShurui: BukkenShurui,
                            BukkenTeian: {
                                    Baikyaku: BukkenTeian.Baikyaku,
                                    Reform: BukkenTeian.Reform,
                                    Rent: BukkenTeian.Rent,
                                    Sonota: BukkenTeian.Sonota
                                },
                            NameJinushi: getValuetachi.NameJinushi,
                            EmailJinushi: getValuetachi.EmailJinushi,
                            CommentTo: getValuetachi.CommentTo,
                            KibouFee: getValuetachi.KibouFee,
                            RegTimestamp: serverTimestamp(),
                        });

                    navigate("/NyusatsuIchiran");

                } catch (error) {
                    alert(error.message);
                }
            }

            CreateProjectFunction();

        };

    const [GmapAddress, setGmapAddress] = useState("");


    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBar />

            <h1 style={{textAlign:"center"}}>紹介物件の登録をしよう</h1>

            {/* エラーチェックの表示 */}
            {/* {errors && <div>{errors}</div>} */}

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container maxWidth="lg" sx={{ pt: 5 }}>
                    
                    <Stack spacing={3}>

                        <TextField
                            label="STEP1 物件の住所はどこですか"
                            type="text"
                            helperText="物件の住所を入力してください"
                            {...register("BukkenAddress", {
                            required: true,
                            message: "物件の住所を入力してください"
                            })}
                            error={"BukkenAddress" in errors}
                            onChange={(e) => {
                                setGmapAddress(e.target.value)
                            }}
                        />

                        {/* googlemapを表示させる */}
                        <GmapTouroku GmapAddress={GmapAddress} />

                        <Stack>
                            <Typography variant="h7" color="text.secondary">
                                STEP2 物件の種類
                            </Typography>

                            {/* 物件の種類を選択するボタングループ */}
                            <ToggleButtonGroup
                                color="success"
                                value={alignment}
                                exclusive
                                onChange={toggleChange}
                                sx={{alignItems:"center"}}
                            >
                                <ToggleButton value="Tochi">土地だけ</ToggleButton>
                                <ToggleButton value="Kodate">建物＋土地</ToggleButton>
                                <ToggleButton value="Apartment">分譲マンション</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>

                        {/* 提案する有効活用の内容 */}
                        <Stack>
                            <Typography variant="h7" color="text.secondary">
                                STEP3 今回の有効活用希望（複数選択可）
                            </Typography>

                            {/* switchのコピペ */}
                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked onChange={switchChange} color="success" name="Baikyaku"/>} label="売却希望" />
                                <FormControlLabel control={<Switch defaultChecked onChange={switchChange} color="success" name="Reform"/>} label="建替え・リフォーム"  />
                                <FormControlLabel control={<Switch defaultChecked onChange={switchChange} color="success" name="Rent"/>} label="貸出し"  />
                                <FormControlLabel control={<Switch defaultChecked onChange={switchChange} color="success" name="Sonota"/>} label="その他有効活用"  />
                            </FormGroup>
                        </Stack>


                        <TextField
                            label="STEP4 紹介する方の氏名"
                            type="text"
                            helperText="今回ご紹介いただく方の氏名を入力してください(※入札終了後開示されます)"
                            {...register("NameJinushi", {
                            required: true,
                            message: "今回ご紹介いただく方の氏名を入力してください"
                            })}
                            error={"NameJinushi" in errors}
                        />

                        <TextField
                            label="STEP5 紹介者のメールアドレス"
                            type="email"
                            helperText="今回ご紹介いただく方のメールアドレスを入力してください(※入札終了後開示されます)"
                            {...register("EmailJinushi", {
                            required: true,
                            minLength: 5,
                            message: "メールアドレス（@を入れて5字以上）を入力してください"
                            })}
                            error={"EmailJinushi" in errors}
                        />

                        <TextField
                            label="STEP6 今回の紹介者の有効活用の動機や状況他、伝えたいこと"
                            type="text"
                            helperText="物件の大きさ/古さ/検討動機など、情報が詳しいほど検討する会社の数が増え、紹介料も高くなります"
                            multiline
                            rows={6}
                            {...register("CommentTo", {
                                message: "今回の紹介者の有効活用の動機や状況他、伝えたいことを入力してください"
                            })}
                        />

                        <TextField
                            label="STEP7 希望の紹介料"
                            type="number"
                            helperText="希望する紹介料を入力してください。実際の入札金額とは異なる場合があります"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">万円</InputAdornment>,
                              }}
                            {...register("KibouFee", {
                                required: true,
                                minLength: 1,
                                message: "希望の紹介料を入力してください"
                            })}
                        />

                    </Stack>
                    
                    <hr/>

                        <Button
                            onClick={onSubmit}
                            color="success"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{margintop:500,
                                fontSize:"1vw"}}
                        >
                            紹介料の入札開始
                        </Button>

                </Container>
            </form>

        </div>
    )
}

export default BukkenTouroku
