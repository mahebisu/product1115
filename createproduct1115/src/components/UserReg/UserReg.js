import React,{useState,useEffect} from 'react'

import { Button, Container, Stack,Card,CardContent,CardMedia,Typography,TextField } from '@mui/material'
import ResponsiveAppBar from '../Appbar/ResponsiveAppBar'
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
    import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
    import { db} from "../../firebase";
    



const UserReg = () => {

    const [IsLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useStateでfirebaseから読み込む、dataをデフォルトで定義  
        const [data, setData] = useState(
            [{
                EmailNakoudo: "",
                PassNakoudo: "",
                NameNakoudo: "",
                AddressNakoudo: "",
                PhoneNakoudo: "",
                NakoudoBirthYear: "",
                NakoudoBirthMonth: "",
                NakoudoBirthDay: ""
            }]
        );

    // useEffectでquery,collectionからデータを読み込む
        useEffect(() => {
            // query=コレクション（firebaseの箱のこと）の指定をする
            const q = query(collection(db,"user"));

            const unsub = onSnapshot(q, (querySnapshot) => {

                setData(
                    querySnapshot.docs.map((doc) => (
                        {
                            EmailNakoudo: doc.data().EmailNakoudo,
                            PassNakoudo: doc.data().PassNakoudo,
                            NameNakoudo: doc.data().NameNakoudo,
                            AddressNakoudo: doc.data().AddressNakoudo,
                            PhoneNakoudo: doc.data().PhoneNakoudo,
                            NakoudoBirthYear: doc.data().NakoudoBirthYear,
                            NakoudoBirthMonth: doc.data().NakoudoBirthMonth,
                            NakoudoBirthDay: doc.data().NakoudoBirthDay
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
        // バリデーションチェックOK！なときに行う処理を追加
            console.log("isDirty>",isDirty);
            console.log("isValid>",isValid);
            console.log(submitCount);
            console.log("メールとパスは>",email,password);

    };

    // formで入力した値をgetValuesで取得する
        const getValuetachi = getValues();

    // errorsを表示させる
        console.log("errors>",errors);


    return (
        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBar />

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container maxWidth="md" sx={{ pt: 5 }}>
                    
                    <Stack spacing={5}>

                        <Typography variant="h4" color="text.success"
                            sx={{textAlign:"center"}}
                        >
                            新規ユーザー登録
                        </Typography>

                        <TextField
                            label="自分のメールアドレス"
                            type="email"
                            {...register("EmailNakoudo", {
                            required: true,
                            minLength: 5,
                            message: "メールアドレス（@を入れて5字以上）を入力してください"
                            })}
                            error={"EmailNakoudo" in errors}

                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <TextField
                            label='パスワードを設定(6文字以上)'
                            type="password"
                            {...register("PassNakoudo", {
                                required: true,
                                minLength: 6,
                                message: "希望の紹介料（円）を入力してください"
                            })}
                            error={"EmailNakoudo" in errors}

                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <hr/>

                        <Button
                            color="success"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{margintop:500}}

                            onClick={
                                IsLogin
                                  ? async () => {
                                      try {
                                        //Firebase ver9 compliant (modular)
                                        await signInWithEmailAndPassword(auth, email, password);
                                        navigate("/NyusatsuIchiran");
                                      } catch (error) {
                                        alert(error.message);
                                      }
                                    }
                                  : async () => {
                                      try {
                                        //Firebase ver9 compliant (modular)
                                        await createUserWithEmailAndPassword(auth, email, password);
                                        navigate("/UserReg2");
                                      } catch (error) {
                                        alert(error.message);
                                      }
                                    }
                              }
                      
                        >
                            新規ユーザー登録

                        </Button>

                    </Stack>

                </Container>

            </form>

            <section style={{
                display: 'flex',
                justifyContent: 'space-between,center',
                width: '95%',
                margin: 'auto'
            }}>
                {/* dataをmapで表示 */}
                {data.map((item,index) => (
                    // 多要素は１つのdiv等で囲う
                    <div key={index}>
                        <div>{index}</div>
                        <div>{item.EmailNakoudo}</div>
                        <div>{item.PassNakoudo}</div>
                        <div>{item.NameNakoudo}</div>
                        <div>{item.AddressNakoudo}</div>
                        <div>{item.PhoneNakoudo}</div>
                        <div>{item.NakoudoBirthYear}</div>
                        <div>{item.NakoudoBirthMonth}</div>
                        <div>{item.NakoudoBirthDay}</div>
                    </div>
                ))}
            </section>


        </div>

    )
}

export default UserReg
