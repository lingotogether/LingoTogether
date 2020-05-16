import React, { useRef, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const SignupForm = ({ handleOnChange, levelVal }) => {
    const labelObj = {
        userName: 'Name 英文名子',
        level: 'Your English level? 自身英文程度',
        skypeID: 'Skype ID Skype 帳號',
    }
    const type = [
        'userName', 
        'level', 
        'skypeID'
    ]
    const LEVEL = ['Basic 初級', 'Intermediate 中級', 'Advanced 進階', 'Other']

    const classes = useStyles()

    const inputLabel = useRef(null)
    const [ labelWidth, setLabelWidth ] = useState(0)

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth)
    }, [])

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
                                {labelObj[item]}
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={levelVal}
                                onChange={e => handleOnChange(e, item)}
                                labelWidth={labelWidth}
                                key={FormControl + '' + i + 7}
                            >
                                {LEVEL.map((level, i) => {
                                    return (
                                        <MenuItem value={i} key={level + '' + i}>
                                            <em>{level}</em>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    )
                } else {
                    return (
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            key={labelObj[item]}
                            id={item}
                            label={labelObj[item]}
                            onChange={e => handleOnChange(e, item)}
                        />
                    )
                }
            })}
        </div>
    )
}

export default SignupForm
