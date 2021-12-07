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
                            ユーザープロフィール登録
                        </Typography>

                        <TextField
                            label="あなたの氏名"
                            type="text"
                            {...register("NameNakoudo", {
                            required: true,
                            message: "氏名を入力してください"
                            })}
                            error={"NameNakoudo" in errors}
                        />

                        <TextField
                            label="あなたの住所"
                            type="text"
                            {...register("AddressNakoudo", {
                            required: true,
                            message: "あなたの住所を入力してください"
                            })}
                            error={"AddressNakoudo" in errors}
                        />

                        <TextField
                            label="あなたの電話番号"
                            type="number"
                            {...register("PhoneNakoudo", {
                                required: true,
                                maxLength: 11,
                                minLength: 11,
                                message: "電話番号を11桁で入力してください"
                            })}
                            error={"PhoneNakoudo" in errors}
                        />

                        <div>
                            <Typography variant="h7" color="text.success">
                                あなたの生年月日
                            </Typography>

                            <div>
                                <TextField
                                    label="西暦〇年"
                                    type="number"
                                    {...register("NakoudoBirthYear", {
                                        required: true,
                                        maxLength: 4,
                                        minLength: 4,
                                        min: 2021,
                                        message: "あなたの誕生年を西暦で入力してください"
                                })}
                                />

                                <TextField
                                    label="〇月"
                                    type="number"
                                    {...register("NakoudoBirthMonth", {
                                        required: true,
                                        maxLength: 2,
                                        minLength: 1,
                                        min: 1,
                                        max: 12,
                                        message: "あなたの誕生月を数字で入力してください"
                                })}
                                />

                                <TextField
                                    label="〇日"
                                    type="number"
                                    {...register("NakoudoBirthDay", {
                                        required: true,
                                        maxLength: 2,
                                        minLength: 1,
                                        min: 1,
                                        max: 31,
                                        message: "あなたの誕生日を数字で入力してください"
                                })}
                                />

                            </div>
                        </div>

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
                            <Link to="/BukkenTouroku"
                                style={{textDecoration:"none",
                                color:"#e9fef7",
                                fontSize:"2vw"
                            }}>
                                プロフィール登録
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
