import { Button, Container, Stack,Card,CardContent,CardMedia,Typography,TextField } from '@mui/material'
import React,{useState} from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// 写真をインポート

const UserReg = () => {

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
        console.log("isDirty>",isDirty);
        console.log("isValid>",isValid);
        console.log(submitCount);

        // getValuesの値がエラーなく入れられているかのチェック、inValid?

        
        // getValuesの値をそれぞれfirebaseに送る工程



        // 次のページに遷移する



    };


    // formで入力した値をgetValuesで取得する
        const getValuetachi = getValues();
        console.log(getValuetachi);

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
                        />


                        <TextField
                            label="パスワードを設定(6文字以上)"
                            type="password"
                            {...register("PassNakoudo", {
                                required: true,
                                minLength: 6,
                                message: "希望の紹介料（円）を入力してください"
                            })}
                            error={"EmailNakoudo" in errors}
                        />

                        <hr/>

                        <Button
                            onClick={onSubmit}
                            color="success"
                            variant="contained"
                            size="large"
                            type="submit"
                            fullWidth
                            style={{margintop:500}}
                        >
                            <Link to="/UserReg2"
                                style={{textDecoration:"none",
                                color:"#e9fef7",
                                fontSize:"2vw"
                            }}>
                                ユーザー登録
                            </Link>

                        </Button>

                    </Stack>
                    

                </Container>

            </form>

            <footer>
                <div  sx={{margin:"1000 auto 1000"
                        }}>
                    footer
                </div>
            </footer>

        </div>

    )
}

export default UserReg
