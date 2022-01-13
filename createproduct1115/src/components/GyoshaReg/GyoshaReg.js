import React,{useState,useEffect} from 'react'

import { Button, Container, Stack,Card,CardContent,CardMedia,Typography,TextField } from '@mui/material'
import ResponsiveAppBarGyoshaLanding from '../Appbar/ResponsiveAppBarGyoshaLanding'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// ログイン機能（講義からコピペ）
    import { auth } from "../../firebase";
    import {
        onAuthStateChanged,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
    } from "firebase/auth";

// firebaseのデータベース関連
    import { collection, query, onSnapshot, addDoc,serverTimestamp } from "firebase/firestore";
    import { db} from "../../firebase";


const GyoshaReg = () => {

    const [IsLogin, setIsLogin] = useState(false);
    const [EmailGyosha, setEmailGyosha] = useState("");
    const [PassGyosha, setPassGyosha] = useState("");

    // useStateでfirebaseから読み込む、dataをデフォルトで定義  
        const [data, setData] = useState(
            [{
                EmailGyosha: "",
                PassGyosha: "",
            }]
        );

    // useEffectでquery,collectionからデータを読み込む
        useEffect(() => {
            // query=コレクション（firebaseの箱のこと）の指定をする
            const q = query(collection(db,"gyosha"));

            const unsub = onSnapshot(q, (querySnapshot) => {

                setData(
                    querySnapshot.docs.map((doc) => (
                        {
                            EmailGyosha: doc.data().EmailGyosha,
                            PassGyosha: doc.data().PassGyosha,
                        }
                    ))
                );

            });
            
            return () => unsub();

        }, [])


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
    const onSubmit = () => {
        // バリデーションチェックで行う処理⇒今後対応
            console.log("isDirty>",isDirty);
            console.log("isValid>",isValid);
            console.log(submitCount);
            console.log("メールとパスは>",EmailGyosha,PassGyosha);
        // errorsを表示させる
            console.log("errors>",errors);

        // formで入力した値をgetValuesで取得する
            let getValuetachi = getValues();
            // console.log("getValuetachi>",getValuetachi);

        // ログインのfunctionを定義
            async function SigninFunction() {
                try {
                    //Firebase ver9 compliant (modular)
                    // authにemailとpassを確認
                    await signInWithEmailAndPassword(auth, EmailGyosha, PassGyosha);

                    navigate("/NyusatsuIchiran");
                } catch (error) {
                    alert(error.message);
                }
            };

        // User登録のfunctionを定義
            async function CreateUserFunction() {
                try {
                    //Firebase ver9 compliant (modular)
                    // authにemailとpassを登録
                        await createUserWithEmailAndPassword(auth, EmailGyosha, PassGyosha);
                    
                    //Firebase ver9 compliant
                    // firebaseに新規でデータ追加する
                        addDoc(collection(db, "gyosha"), {
                            EmailGyosha: getValuetachi.EmailGyosha,
                            PassGyosha: getValuetachi.PassGyosha,
                            RegTimestamp: serverTimestamp(),
                        });

                    navigate("/GyoshaReg2");
                } catch (error) {
                    alert(error.message);
                }
            }


        
        // authでcreateUserWithEmailAndPasswordをする
        // 同時にdbにuser情報を登録する
            if(IsLogin){
                SigninFunction();
            }else{
                CreateUserFunction();
            };

    };



    return (
        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarGyoshaLanding />

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container maxWidth="md" sx={{ pt: 5 }}>
                    
                    <Stack spacing={5}>

                        <Typography variant="h4" color="text.success"
                            sx={{textAlign:"center"}}
                        >
                            新規業者エージェント登録
                        </Typography>

                        <TextField
                            label="自分のメールアドレス"
                            type="email"
                            {...register("EmailGyosha", {
                            required: true,
                            minLength: 5,
                            message: "メールアドレス（@を入れて5字以上）を入力してください"
                            })}
                            error={"EmailGyosha" in errors}

                            onChange={(e) => setEmailGyosha(e.target.value)}
                        />


                        <TextField
                            label='パスワードを設定(6文字以上)'
                            type="password"
                            {...register("PassGyosha", {
                                required: true,
                                minLength: 6,
                                message: "希望の紹介料（円）を入力してください"
                            })}
                            error={"PassGyosha" in errors}

                            onChange={(e) => setPassGyosha(e.target.value)}
                        />

                        <hr/>

                        <Button
                            color="success"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{margintop:500}}
                        >
                            新規ユーザー登録

                        </Button>

                    </Stack>

                </Container>

            </form>

        </div>

    )
}

export default GyoshaReg
