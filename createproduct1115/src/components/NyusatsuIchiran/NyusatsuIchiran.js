import React from 'react'
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import ResponsiveAppBar from '../Appbar/ResponsiveAppBar'
import { Link } from "react-router-dom";

// タブを作成するためにimportする
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Nyusatsuchu from './Nyusatsuchu';
import BukkenIchiran from './BukkenIchiran';

// タブを動かすためにファンクションを定義、コピペ
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const BukkenTouroku = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBar />

            {/* タブ部分 */}
            <Box sx={{ width: '100%' }}>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="入札中" {...a11yProps(0)} />
                        <Tab label="Q&A" {...a11yProps(1)} />
                        <Tab label="登録物件一覧" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    {/* 入札中画面のコンポーネントを挿入 */}
                    <Nyusatsuchu />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <p style={{textAlign:"center"}}>Q&A⇒今後実装予定</p>
                    {/* とりあえず入札中画面のコンポーネントを挿入 */}
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <BukkenIchiran />
                </TabPanel>

            </Box>
            {/* タブ部分以上 */}


        </div>
    )
}

export default BukkenTouroku
