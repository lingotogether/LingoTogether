import React from 'react'

const FAQContent = ({ question, answer, useImg }) => {    
    return (
        <div>
            <div className="faq-question">
                {question}
            </div>
            <div className="faq-answer">
                {
                    useImg !== undefined
                    ?
                    useImg == 'Ch'
                    ?
                    <div>
                        <p>串聯知識輸入、輸出平台</p><br />
                        <img src={require('../../img/FAQImgCh.png')}
                            style={{                            
                                width: '650px',
                                right: 0
                            }}
                        />
                    </div>                    
                    :
                    <div>
                        <p> It is a platform that connects your knowledge input and output.</p><br />
                        <img src={require('../../img/FAQImgEn.png')}
                            style={{                            
                                width: '650px',
                                right: 0
                            }}
                        />
                    </div>
                    
                    :
                    null
                }                
                <p dangerouslySetInnerHTML={{__html: answer}}></p>
            </div>
            <br />
            <hr />
        </div>
    )
}

export default FAQContent
