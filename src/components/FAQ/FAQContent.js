import React from 'react'

const FAQContent = ({ question, answer }) => {    
    return (
        <div>
            <div className="faq-question">
                {question}
            </div>
            <div className="faq-answer">
                <p dangerouslySetInnerHTML={{__html: answer}}></p>
            </div>
            <br />
            <hr />
        </div>
    )
}

export default FAQContent
