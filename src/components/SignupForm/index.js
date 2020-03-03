import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputBase from '@material-ui/core/InputBase';
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);
export default function SignupForm(props) {
    // const handleInputChange = (e, type) => {
    //     const { value } = e.currentTarget;
    //     switch (type) {
    //         default:
    //             console.log(value);
    //             return;
    //     }
    // };
    const LabelOBJ = {
        userName: 'Name 英文名子',
        Level: 'Your English level? 自身英文程度',
        LineID: 'LINE ID LINE帳號',
        SkypeID: 'Skype ID Skype 帳號',

        // 'Motivations of joining Lingotogether ? 參加LT的原因 ?',
        // 'Briefly introduce yourself. 簡短自我介紹 ',
    };
    const type = ['userName', 'Level', 'LineID', 'SkypeID'];
    const level = ['Basic 初級', 'Intermediate 中級', 'Advanced 進階', 'Other'];

    const classes = useStyles();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <div className="memberForm">
            {type.map((item, i) => {
                if (i === 1) {
                    return (
                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            key={FormControl + '' + i + 9}
                        >
                            <InputLabel
                                key={FormControl + '' + i + 8}
                                ref={inputLabel}
                                id="demo-simple-select-outlined-label"
                            >
                                {LabelOBJ[item]}
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={props.levelVal}
                                onChange={(e, i) => props.handleOnChange(e, item)}
                                labelWidth={labelWidth}
                                key={FormControl + '' + i + 7}
                            >
                                {level.map((level, i) => {
                                    return (
                                        <MenuItem value={i} key={level + '' + i}>
                                            <em>{level}</em>
                                        </MenuItem>
                                    );
                                })}
                                {/* <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                    );
                } else {
                    return (
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            key={LabelOBJ[item]}
                            id={item}
                            label={LabelOBJ[item]}
                            // defaultValue={iMaterial}
                            onChange={(e, i) => props.handleOnChange(e, item)}
                        />
                    );
                }
            })}
        </div>
    );
}

//  else if (i === 4 || i === 5) {
//     //TextareaAutosize
//     return (
//         <TextField
//             margin="normal"
//             fullWidth
//             key={item}
//             id={item}
//             label={item}
//             // defaultValue={iMaterial}
//             onChange={(e, i) => handleInputChange(e, 'url')}
//         />
//         // <>
//         //     <h3>{item}</h3>
//         //     <input type="textarea" className="textarea" />
//         // </>
//         // <>
//         //     {item}
//         //     <TextareaAutosize
//         //         rowsMax={4}
//         //         aria-label="maximum height"
//         //         placeholder="Maximum 4 rows"
//         //         defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//         //         ut labore et dolore magna aliqua."
//         //     />
//         // </>
//     );
// }
