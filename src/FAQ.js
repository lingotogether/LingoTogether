import React, { Fragment, useEffect, useState } from 'react';
import FAQContent from './components/FAQ/FAQContent'

function FAQ(props) {     
    const [position, setPosition] = useState('static');  
    const [top, setTop] = useState('0px');
    const [margin, setMargin] = useState('0%');

    const LocationHash = where => {
        window.location.hash = where;
    };

    useEffect(() => {
        //handleRWD()
        window.addEventListener('scroll', handleScroll)
        
        
    }, [])
    const handleScroll = e => {
        // console.log(e.path[1].scrollY, 'clientHeight')
        const scrollY = e.path[1].scrollY
        if (scrollY > 150) {
            setPosition('fixed');
            setTop('110px');
            setMargin('29%');
        }
        else{
            setPosition('static');
            setTop('0px');
            setMargin('0%');
        }
    }
    
    return (
        <Fragment>
            <div style={{position: 'relative'}}>
                <section>
                    <div className="top-title"><h2>Frequently Asked Questions</h2></div>
                </section>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-4" style={{position: position, top: top}}>
                                <div className="faq-link">
                                    <a href="/FAQ#lin" onClick={() => LocationHash(1, '#lin')}>
                                        關於聆果
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#anch" onClick={() => LocationHash(2, '#anch')}>
                                        關於主持
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#attend" onClick={() => LocationHash(3, '#attend')}>
                                        關於參與
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#practice" onClick={() => LocationHash(4, '#practice')}>
                                        關於英文口說練習
                                    </a>
                                </div>
                            </div>
                            <div className="col-8" style={{marginLeft: margin}}>
                                <div id="lin">
                                    <h3  className="faq-header">
                                        關於聆果
                                    </h3>
                                    <FAQContent 
                                        question = "每天都有討論會嗎？ 可是我看日曆上沒有每一天都有耶？"
                                        answer = "因為這是「自主練習」的環境，沒有人開場， 當然就不會有練習的機會。 你也可以考慮自己主持一場來練習 。"
                                    ></FAQContent>                                    
                                    <FAQContent 
                                        question = "網站上有初級、中級、進階的標準是什麼？"
                                        answer = "當次討論會內容的難易度。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "我英文口說不太流利，是不是不能參加中階、進階討論會？"
                                        answer = "英文口說不太流利當然還是可以參加啊！因為場次會分等級只是給你一個參考當次討論內容的難易度而已。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "是不是一定要有skype帳號才可以參加討論會？"
                                        answer = "不一定。 你也可以選擇不辦帳號，時間到點日曆旁邊聊天室登入口即可。就可以匿名參加討論會。"
                                    ></FAQContent>    
                                    <FAQContent 
                                        question = "討論會就是單純練習英文口說而已嗎？"
                                        answer = "不單純只是練習英文口說，同時練習你如何表達自己對於不同議題會有什麼不同的見解。"
                                    ></FAQContent>    
                                    <FAQContent 
                                        question = "多久以前可以登入聊天室？"
                                        answer = "討論會開始前15分鐘即可登入。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "討論會開始多久就無法進入了"
                                        answer = "討論會開始後20分鐘即無法進入。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "討論會時間到了，不知道為什麼我無法進入聊天室？"
                                        answer = "直接Email、IG私訊、或傳Line給我們，馬上帶你進去。"
                                    ></FAQContent>                                                                                                    
                                </div>
                                
                                <div id="anch">
                                    <h3 className="faq-header">
                                        關於主持
                                    </h3>
                                    <FAQContent 
                                        question = "一場討論會時間大概多久？"
                                        answer = "你可自行決定討論會的長度。 建議40～60分鐘。"
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = "比較多人參與的時間是什麼時候？"
                                        answer = "a. 週間：晚上9點後。<br/>b. 週末： 早上10點前 、晚上8點後"
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = "你可以手把手教我如何開場嗎？"
                                        answer = "可啊。 網站上有Rhica錄的影片（大約1分30秒）。有螢幕錄音教學。 可以重複看到飽。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "我是不是要有很流利的口語才能當主持人？"
                                        answer = "不需要，只要你有尚可流利度以及能夠簡單了解他人的回答、適時做應答，就可以擔任主持人。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "擔任主持人可以獲得什麼好處？"
                                        answer = "練習你的組織能力、領導小會議的領導力、和抓重點的能力。"
                                    ></FAQContent>                                    
                                </div>
                                <div id="attend">
                                    <h3 className="faq-header">
                                        關於參與
                                    </h3>
                                    <FAQContent 
                                        question = "每場討論會附上的連結是什麼呀？"
                                        answer = "主持人針對某個資料、發想出幾個問題供參與者討論。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "我知道練習口說才會進步，可是我不知道在討論會要說什麼？"
                                        answer = "你可以先看主持人提供的資料、問題，來準備你的答案。心中有答案就不會不知道要說什麼。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "我如果有事情沒辦法準時參加或是有事情需要提早離開怎麼辦？"
                                        answer = "a. 有事情沒辦法準時：可以先進入聊天室，告知主持人會晚多久進場。<br/>b. 需要提早離開：直接告知主持人要先離場即可。"
                                    ></FAQContent>
                                </div>
                                <div id="practice">
                                    <h3 className="faq-header">
                                        關於英文口說練習
                                    </h3>
                                    <FAQContent 
                                        question = "我都聽的懂、可是我開口就是會緊張，所以講不出來。"
                                        answer = "所以你來Lingotogether就是練習如果在說話時不緊張、怎麼把在你心裡想法清楚的表達出來。 如果你已經克服了你心中的緊張，在哪裡開口說英文會是問題嗎：） "
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "現在有許多的實體語言交換社團， 我為什麼要需要在Lingotogether練習？"
                                        answer = "Lingotogether是透過「聲音」來練習， 因為不用看到人的臉部表情，就不會那麼緊張。 Lingotogether就是讓你練習如何不緊張。當你不緊張了，跟誰對話 就不是那麼重要了吧。"
                                    ></FAQContent>
                                    <FAQContent 
                                        question = "我能夠怎麼樣在Lingotogether 上看到我自己的進步？"
                                        answer = "可以到會員資料那裡查看，Lingotogether 都有幫你記錄你的學習頻率，可以看到自己的練習記錄噢！"
                                    ></FAQContent>
                                </div>
                                <div id="learn">

                                </div>                                
                            </div>                    
                        </div>
                    </div>
                </section>
            </div>
        </Fragment>
    );
}

export default FAQ;
