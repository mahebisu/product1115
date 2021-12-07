import React,{useState} from 'react'
import { Button, Container, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import ResponsiveAppBar from './ResponsiveAppBar'

// radioボタンをつくるために導入
    import Radio from '@mui/material/Radio';
    import RadioGroup from '@mui/material/RadioGroup';
    import FormControlLabel from '@mui/material/FormControlLabel';
    import FormControl from '@mui/material/FormControl';
    import FormLabel from '@mui/material/FormLabel';

const BukkenTouroku = () => {

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

    const [Bukkenshurui, setBukkenshurui] = useState("Tochi");
    // radioボタンの値を取得する関数の定義
        const radioChange = (event) => {
            setBukkenshurui(event.target.value);
            console.log(event.target.value)
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

            <h1 style={{textAlign:"center"}}>紹介物件情報入力</h1>

            {/* エラーチェックの表示 */}
            {/* {errors && <div>{errors}</div>} */}

            <form onSubmit={handleSubmit(onSubmit)}>

                <Container maxWidth="lg" sx={{ pt: 5 }}>

                    <Stack direction="row" spacing={5}>
                    
                        <Stack spacing={3}>

                            <TextField
                                label="あなたが紹介する人の氏名"
                                type="text"
                                {...register("NameJinushi", {
                                required: true,
                                message: "氏名を入力してください"
                                })}
                                error={"NameJinushi" in errors}
                            />
                
                            <TextField
                                label="あなたと紹介者の関係を簡単に説明してください"
                                type="text"
                                {...register("RelationSetsumei", {
                                required: true,
                                message: "あなたと紹介者の関係を説明してください"
                                })}
                                error={"RelationSetsumei" in errors}
                            />
                            <TextField
                                label="紹介者の電話番号"
                                type="number"
                                {...register("PhoneJinushi", {
                                maxLength: 11,
                                minLength: 11,
                                message: "電話番号を11桁で入力してください"
                                })}
                                error={"PhoneJinushi" in errors}
                            />
                                
                            <TextField
                                label="紹介者のメールアドレス"
                                type="email"
                                {...register("EmailJinushi", {
                                required: true,
                                minLength: 5,
                                message: "メールアドレス（@を入れて5字以上）を入力してください"
                                })}
                                error={"EmailJinushi" in errors}
                            />
                            <section>
                                <TextField
                                    label="西暦〇年"
                                    type="number"
                                    {...register("MokuhyoYear", {
                                    required: true,
                                    maxLength: 4,
                                    minLength: 4,
                                    min: 2021,
                                    message: "契約をしたい年を西暦で入力してください"

                                })}
                                />


                                <TextField
                                    label="〇月までに契約したい"
                                    type="number"
                                    {...register("MokuhyoMonth", {
                                    required: true,
                                    maxLength: 2,
                                    minLength: 1,
                                    min: 1,
                                    max: 12,
                                    message: "契約をしたい月を数字で入力してください"

                                })}
                                />
                            </section>


                            <TextField
                                label="希望の紹介料（円）"
                                type="number"
                                {...register("KibouFee", {
                                    required: true,
                                    minLength: 1,
                                    message: "希望の紹介料（円）を入力してください"
                                })}
                            />

                            <TextField
                                label="今回の紹介者の有効活用の動機や状況他、伝えたいこと"
                                type="text"
                                multiline
                                rows={6}
                                {...register("CommentTo", {
                                    message: "今回の紹介者の有効活用の動機や状況他、伝えたいことを入力してください"
                                })}
                            />

                        </Stack>

                        <Stack spacing={3}>

                            {/* 物件の種類を選択するラジオボタンをつくる */}
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">物件の種類</FormLabel>
                                    <RadioGroup 
                                        row aria-label="bukkenshurui"
                                        name="row-radio-buttons-group"
                                        value={Bukkenshurui}
                                        onChange={radioChange}
                                    >
                                        <FormControlLabel value="Tochi" control={<Radio />} label="土地" />
                                        <FormControlLabel value="Kodate" control={<Radio />} label="土地＋建物" />
                                        <FormControlLabel value="Apartment" control={<Radio />} label="分譲マンション" />
                                    </RadioGroup>
                                </FormControl>

                            <TextField
                                label="物件の住居表示（住所）：都道府県"
                                type="text"
                                {...register("BukkenPrefecture", {
                                required: true,
                                message: "物件の都道府県を入力してください"
                                })}
                                error={"BukkenPrefecture" in errors}
                            />

                            <TextField
                                label="物件の住居表示（住所）：市区町村"
                                type="text"
                                {...register("BukkenShichoson", {
                                required: true,
                                message: "物件の市区町村を入力してください"
                                })}
                                error={"BukkenShichoson" in errors}
                            />

                            <TextField
                                label="物件の住居表示（住所）：大字/町名"
                                type="text"
                                {...register("BukkenChomei", {
                                required: true,
                                message: "物件の大字を入力してください"
                                })}
                                error={"BukkenChomei" in errors}
                            />

                            <TextField
                                label="物件の住居表示（住所）：その他以下"
                                type="text"
                                {...register("BukkenChomei", {
                                required: true,
                                message: "物件の大字を入力してください"
                                })}
                                error={"BukkenChomei" in errors}
                            />

                            <TextField
                                label="物件の住居表示（住所）：建物名"
                                type="text"
                                {...register("BukkenTatemonomei", {
                                message: "物件の建物名を入力してください"
                                })}
                                error={"BukkenTatemonomei" in errors}
                            />

                            <TextField
                                label="（任意）物件の地番を入力してください（例 28-3）"
                                type="text"
                                {...register("Chiban", {
                                message: "物件の地番を入力してください"
                                })}
                                error={"Chiban" in errors}
                            />

                            <TextField
                                label="（任意）物件の家屋番号（建物番号）を入力してください"
                                type="text"
                                {...register("Tatemonobango", {
                                message: "物件の地番を入力してください"
                                })}
                                error={"Tatemonobango" in errors}
                            />

                            <TextField
                                label="土地面積（㎡）"
                                type="number"
                                {...register("TochiMenseki", {
                                message: "土地面積（㎡）を入力してください"
                                })}
                                error={"TochiMenseki" in errors}
                            />

                            <TextField
                                label="建物総床面積（㎡）"
                                type="number"
                                {...register("TatemonoMenseki", {
                                message: "建物総床面積（㎡）を入力してください"
                                })}
                                error={"TatemonoMenseki" in errors}
                            />

                            <TextField
                                label="建物の竣工年（西暦）"
                                type="number"
                                {...register("TatemonoYear", {
                                maxLength: 4,
                                minLength: 4
                                })}
                            />


                        </Stack>

                    </Stack>
                    
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
                            作成
                        </Button>

                </Container>
            </form>

        </div>
    )
}

export default BukkenTouroku
