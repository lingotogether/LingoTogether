import React, { Fragment } from 'react'

import CardWithContent from './smallPart/CardWithContent'
import CardNoContent from './smallPart/CardNoContent'
import CloseIcon from '@material-ui/icons/Close'
import { cBoxController } from '../../actions'

export default function ClassForm(props) {
    const handleClos = () => {
        const { dispatch } = props

        dispatch(cBoxController(false))
    }

    return (
        <Fragment>
            <div className="Card">
                <div className="closeBtn">
                    <CloseIcon onClick={() => handleClos()}></CloseIcon>
                </div>
                {props.CreateUserID ? <CardWithContent {...props} /> : <CardNoContent {...props} />}
            </div>
        </Fragment>
    )
}
