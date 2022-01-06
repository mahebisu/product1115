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



const UserReg = () => {

    const [IsLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    useEffect(() => {

      //Firebase ver9 compliant (modular)
      const unSub = onAuthStateChanged(auth, (user) => {
        console.log("user情報>",user);
        user && navigate("/ProjectIchiran");
      });

      return () => unSub();

    }, []);
  

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

        // getValuesの値がエラーなく入れられているかのチェック、inValid?
            console.log("getvalue",getValuetachi);

        // createUserWithEmailAndPasswordでuseStateのemail、password値をそれぞれfirebaseに送る工程
            // if (IsLogin) { 
            //     async () => {
            //         try {
            //         //Firebase ver9 compliant (modular)
            //         await signInWithEmailAndPassword(auth, email, password);
            //         navigate("/NyusatsuIchiran");
            //         } catch (error) {
            //         alert(error.message);
            //         }
            //     }
            // }else {
            //      async () => {
            //         try {
            //         //Firebase ver9 compliant (modular)
            //         await createUserWithEmailAndPassword(auth, email, password);
            //         navigate("/UserReg2");
            //         } catch (error) {
            //         alert(error.message);
            //         }
            //     }
            // }

    };

    // formで入力した値をgetValuesで取得する
        const getValuetachi = getValues();

    // errorsを表示させる
        console.log("errors>",errors);


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
                            ログイン
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
                            label='パスワードを入力(6文字以上)'
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
                            // onClick={onSubmit}
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
                                        navigate("/ProjectIchiran");
                                      } catch (error) {
                                        alert(error.message);
                                      }
                                    }
                                  : async () => {
                                      try {
                                        //Firebase ver9 compliant (modular)
                                        await createUserWithEmailAndPassword(auth, email, password);
                                        navigate("/ProjectIchiran");
                                      } catch (error) {
                                        alert(error.message);
                                      }
                                    }
                              }
                      
                        >
                            ログイン

                        </Button>

                    </Stack>
                    

                </Container>

            </form>

        </div>

    )
}

export default UserReg
