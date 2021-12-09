import { Button, Container, Stack,Card,CardContent,CardMedia,Typography,TextField } from '@mui/material'
import React,{useState} from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


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


    // navigateを宣言
    let navigate = useNavigate();

    // フォーム送信時の処理
    const onSubmit = (data) => {
        // バリデーションチェックOK！なときに行う処理を追加
        console.log("isDirty>",isDirty);
        console.log("isValid>",isValid);
        console.log(submitCount);

        // getValuesの値がエラーなく入れられているかのチェック、inValid?

        
        // getValuesの値をそれぞれfirebaseに送る工程



        // 次のページに遷移する
        navigate("/GyoshaReg2");
        



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
                            新規業者登録
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
                        />


                        <TextField
                            label="パスワードを設定(6文字以上)"
                            type="password"
                            {...register("PassGyosha", {
                                required: true,
                                minLength: 6,
                                message: "設定するパスワードを6文字以上で入力してください"
                            })}
                            error={"PassGyosha" in errors}
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
                                業者登録
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
