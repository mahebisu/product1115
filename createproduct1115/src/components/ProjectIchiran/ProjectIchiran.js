import React from 'react'
import { Button, Container, Stack, TextField,Typography } from "@mui/material";
import ResponsiveAppBarGyosha from '../Appbar/ResponsiveAppBarGyosha'
import { Link } from "react-router-dom";

// タブを作成するためにimportする
    import PropTypes from 'prop-types';
    import Tabs from '@mui/material/Tabs';
    import Tab from '@mui/material/Tab';
    import Box from '@mui/material/Box';
import ProjectBaikyaku from './ProjectBaikyaku';

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
            <ResponsiveAppBarGyosha />

            {/* タブ部分 */}
                <Box sx={{ width: '100%' }}>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                            <Tab label="売却" {...a11yProps(0)} />
                            <Tab label="建替え・リフォーム" {...a11yProps(1)} />
                            <Tab label="賃貸" {...a11yProps(2)} />
                            <Tab label="その他有効活用" {...a11yProps(3)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        売却
                        {/* 入札中画面のコンポーネントを挿入 */}
                        <ProjectBaikyaku />
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        建替え・リフォーム
                        {/* とりあえず入札中画面のコンポーネントを挿入 */}
                        <ProjectBaikyaku />
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        賃貸
                    </TabPanel>

                    <TabPanel value={value} index={3}>
                        その他有効活用
                    </TabPanel>

                </Box>
            {/* タブ部分以上 */}

        </div>
    )
}

export default BukkenTouroku
