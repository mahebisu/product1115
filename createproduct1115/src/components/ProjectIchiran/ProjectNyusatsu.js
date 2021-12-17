import React,{useState,useEffect} from 'react'
import { Button, Container, Stack, TextField,Box,ToggleButton,ToggleButtonGroup,Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ResponsiveAppBarGyosha from '../Appbar/ResponsiveAppBarGyosha'
import { Link,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';

// ログイン機能（講義からコピペ）
    import { auth } from "../../firebase";
    import {
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
    } from "firebase/auth";

// firebaseのデータベース関連
    import { collection, query, onSnapshot, addDoc, setDoc, serverTimestamp,orderBy,doc } from "firebase/firestore";
    import { db } from "../../firebase";



const ProjectNyusatsu = () => {

    // ProjectBaikyakuから?id=のprojectidをゲット
    const urlidquery = new URLSearchParams(useLocation().search);
    const ProjectId = urlidquery.get("ProjectId");
    console.log("ProjectId>",ProjectId);
    const NakoudoId = urlidquery.get("NakoudoId");
    console.log("NakoudoId>",NakoudoId);

    // useStateでfirebaseから読み込む、bukkendataをデフォルトで定義  
        const [Nyusatsu, setNyusatsu] = useState(
            [{
                NakoudoId: NakoudoId,
                GyoshaId: "",
                ProjectId: ProjectId,
                CommentToNakoudo:"",
                NyusatsuFee: "",
                RegTimestamp:"",
            }]
        );
        console.log("Nyusatsu.NakoudoId>",Nyusatsu[0].NakoudoId);
    
    // 物件データ内に、登録した仲人のIDを登録したいから
        const [EmailGyosha, setEmailGyosha] = useState("");
        const [GyoshaId, setGyoshaId] = useState("");
        console.log("EmailGyosha>",EmailGyosha);
        console.log("GyoshaId>",GyoshaId);

    // useEffectを使ってuser.emailデータを取得する
        useEffect(() => {

            // まずログインしているuserのメールアドレスを取得する
            //Firebase ver9 compliant (modular)
                const unSub1 = onAuthStateChanged(auth, (user) => {

                    console.log("user情報>",user.email);
                    // authにuser情報があれば、IsLoginをtrue
                    user.email && setEmailGyosha(user.email);

                });

            return () => {
                unSub1();
            };
        }, []);

    // useEffectを使ってuser.emailからuser.idデータを取得する
        useEffect(() => {

            // 次にデータを取得して、メールアドレスに対応するdoc.idを取得する
            //Firebase ver9 compliant (modular)
                const q = query(collection(db, "gyosha"), orderBy("RegTimestamp", "desc"));
                const unSub2 = onSnapshot(q, (snapshot) => {

                    snapshot.docs.map((doc,index) => {

                        if(doc.data().EmailGyosha == EmailGyosha){
                            setGyoshaId(doc.id);
                            console.log("ログイン中のidをGyoshaIdにsetした",doc.id);
                        };

                        console.log(index,doc.data().EmailGyosha,EmailGyosha);

                    })

                });

            return () => {
                unSub2();
            };
        }, [EmailGyosha]);


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
            async function CreateNyusatsuFunction() {
                try {

                    //Firebase ver9 compliant
                    // firebaseのログイン中のuserデータにデータ追加する
                        addDoc(collection(db, "nyusatsu"),{
                            NakoudoId: NakoudoId,
                            GyoshaId: GyoshaId,
                            ProjectId: ProjectId,
                            CommentToNakoudo: getValuetachi.CommentToNakoudo,
                            NyusatsuFee: getValuetachi.NyusatsuFee,
                            RegTimestamp: serverTimestamp(),
                        });

                    navigate("/NyusatsuIchiran");

                } catch (error) {
                    alert(error.message);
                }
            }

            CreateNyusatsuFunction();

        };


    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarGyosha />

            <h1 style={{textAlign:"center"}}>紹介料を入札しよう</h1>

            {/* エラーチェックの表示 */}
            {/* {errors && <div>{errors}</div>} */}

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container maxWidth="sm" sx={{ pt: 5 }}>
                    
                    <Stack spacing={3}>


                        <TextField
                            label="紹介者へのメッセージ"
                            type="text"
                            helperText="今回の紹介料の根拠や、今後のスケジュールや段取りについて伝えたいメッセージをご記入ください"
                            multiline
                            rows={6}
                            {...register("CommentToNakoudo", {
                                message: "今回の紹介料の根拠や、今後のスケジュールや段取りについて伝えたいメッセージをご記入ください"
                            })}
                        />

                        <TextField
                            label="御社が紹介者に支払う紹介料"
                            type="number"
                            helperText="支払う紹介料を入力してください。※別途プラットフォーム利用料として紹介料の35%支払う必要有"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">万円</InputAdornment>,
                                }}
                            {...register("NyusatsuFee", {
                                required: true,
                                minLength: 1,
                                message: "支払う紹介料を入力してください"
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
                            入札
                        </Button>

                </Container>
            </form>

        </div>
    )
}

export default ProjectNyusatsu
