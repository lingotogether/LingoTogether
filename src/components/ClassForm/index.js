import React, { Fragment } from 'react'
import CardWithContent from './smallPart/CardWithContent'
import CardNoContent from './smallPart/CardNoContent'
import CloseIcon from '@material-ui/icons/Close'
import { cBoxController } from '../../actions'

const ClassForm = (props) => {
    return (
        <Fragment>
            <div className="Card">
                <div className="closeBtn">
                    <CloseIcon onClick={() => props.dispatch(cBoxController(false))}></CloseIcon>
                </div>
                {props.CreateUserID ? <CardWithContent {...props} /> : <CardNoContent {...props} />}
            </div>
        </Fragment>
    )
}

export default ClassForm
