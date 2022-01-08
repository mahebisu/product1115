import React from 'react'
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import ResponsiveAppBarGyosha from '../Appbar/ResponsiveAppBarGyosha'
import { Link } from "react-router-dom";

// タブを作成するためにimportする
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import NyusatsuchuGyosha from './NyusatsuchuGyosha';

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

const NyusatsuIchinranGyosha = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>

            {/* ResponsiveAppBarを挿入 */}
            <ResponsiveAppBarGyosha />

            {/* タブ部分 */}
            <Box sx={{ width: '100%' }}>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="入札中" {...a11yProps(0)} />
                        <Tab label="Q&A" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    {/* 入札中画面のコンポーネントを挿入 */}
                    <NyusatsuchuGyosha />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <p style={{textAlign:"center"}}>Q&A⇒今後実装予定</p>
                    {/* とりあえず入札中画面のコンポーネントを挿入 */}
                </TabPanel>

            </Box>
            {/* タブ部分以上 */}


        </div>
    )
}

export default NyusatsuIchinranGyosha
