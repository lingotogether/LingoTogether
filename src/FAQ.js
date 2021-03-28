import React, { Fragment, useEffect, useState } from 'react';
import FAQContent from './components/FAQ/FAQContent'

function FAQ(props) {     
    const [position, setPosition] = useState('static');  
    const [top, setTop] = useState('0px');
    const [margin, setMargin] = useState('0%');

    const LocationHash = where => {
        isEnglish = props.location.state !== undefined  && props.location.state.isEnglish;
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
    let isEnglish = props.location.state !== undefined  && props.location.state.isEnglish;
    const wordingEn = `a. It depends on the level of difficulty of the selected material.<br/>
                    <table>
                        <tr>
                            <td></td>
                            <td>Basic</td>
                            <td>Intermediate</td>
                            <td>Advanced</td>
                        </tr>
                        <tr>
                            <td>Definition</td>
                            <td>Based on your general knowledge</td>
                            <td>A dose of background knowledge is a plus.
                                You can also answer questions based on your general knowledge.
                            </td>
                            <td>A wide variety of background knowledge is necessary. 
                                It would be great if you are familiar with or knowledgeable about the selected contents. 
                            </td>
                        </tr>
                        <tr>
                            <td>Example</td>
                            <td>Your favorite foods</td>
                            <td>Your take on the fashion world</td>
                            <td>International issues and current affairs</td>
                        </tr>
                    </table>`;
    const wording = `a. 當次討論會內容的難易度。<br/>
                    <table>
                        <tr>
                            <td></td>
                            <td>初級</td>
                            <td>中級</td>
                            <td>進階</td>
                        </tr>
                        <tr>
                            <td>定義</td>
                            <td>用一般的常識以及生活的檢視即可一起討論</td>
                            <td>主題內容需有一點背景知識，但也可以根據一般常識來討論回答</td>
                            <td>討論主題內容較深、需要相當的背景知識、以及對議題的深入剖析</td>
                        </tr>
                        <tr>
                            <td>例如</td>
                            <td>你喜歡的食物</td>
                            <td>對快時尚的看法</td>
                            <td>國際時事</td>
                        </tr>
                    </table>`;
    
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
                                    <a href="/FAQ#discussion" onClick={() => LocationHash(1, '#discussion')}>
                                        {
                                            isEnglish
                                            ?
                                            'About the discussion'
                                            :
                                            '關於討論會'
                                        }                                        
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#ancher" onClick={() => LocationHash(2, '#ancher')}>
                                        {
                                            isEnglish
                                            ?
                                            'About leading a discussion'
                                            :
                                            '關於主持'
                                        }                                        
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#attend" onClick={() => LocationHash(3, '#attend')}>
                                        {
                                            isEnglish
                                            ?
                                            'About participating in a discussion'
                                            :
                                            '關於參與'
                                        }                                         
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#rule" onClick={() => LocationHash(3, '#rule')}>
                                        {
                                            isEnglish
                                            ?
                                            'About the rules and regulations'
                                            :
                                            '關於規則'
                                        }                                         
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#beads" onClick={() => LocationHash(3, '#beads')}>
                                        {
                                            isEnglish
                                            ?
                                            'About the beads system'
                                            :
                                            '關於點數'
                                        }                                          
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#practice" onClick={() => LocationHash(4, '#practice')}>
                                        {   
                                            isEnglish
                                            ?
                                            'About spoken English'
                                            :
                                            '關於英文口說練習'
                                        }                                     
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#lingo" onClick={() => LocationHash(4, '#lingo')}>
                                        {   
                                            isEnglish
                                            ?
                                            'About Lingotogether '
                                            :
                                            '關於聆果Lingotogether'
                                        }                                        
                                    </a>
                                </div>
                            </div>
                            <div className="col-8" style={{marginLeft: margin}}>
                                <div id="discussion">
                                    <h3  className="faq-header">
                                        {
                                            isEnglish
                                            ?
                                            "About the discussion"
                                            :
                                            "關於討論"
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "1. Will there be a discussion everyday? Why is there no discussion scheduled in the calendar everyday?"
                                            :
                                            "1. 每天都有討論會嗎？ 可是我看日曆上沒有每一天都有耶？"   
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. As Lingotogether is a self-directed learning/ practice platform, if there is no one to initiate the topic, then there would obviously be no discussion available to join. However, you can always start one!"
                                            :
                                            "a. 因為這是「自主練習」的環境，沒有人開場， 當然就不會有練習的機會。 你也可以考慮自己主持一場來練習 。"
                                        }
                                    ></FAQContent>                                    
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "2. What is the difference between “beginner”, “intermediate” and “advanced” levels?"
                                            :
                                            "2. 網站上有初級、中級、進階的標準是什麼？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            wordingEn
                                            :
                                            wording
                                        }
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "3. Can I join an advanced or intermediate discussion if I am not fluent enough?"
                                            :
                                            "3. 我英文口說不太流利，是不是不能參加中階、進階討論會？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Absolutely. You still can join the discussion. The standard of the level is based on the content of the selected material and not your English proficiency."
                                            :
                                            "a. 英文口說不太流利當然還是可以參加啊！因為場次會分等級只是給你一個參考當次討論內容的難易度而已。"
                                        } 
                                    ></FAQContent>                                       
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "4. Is the purpose of the discussion solely for practising spoken English?"
                                            :
                                            "4. 討論會就是單純練習英文口說而已嗎？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. It not only trains your speaking skills but also polishes your critical thinking skills and how you could contribute your ideas properly."
                                            :
                                            "a. 不單純只是練習英文口說，同時練習你如何表達自己對於不同議題會有什麼不同的見解。"
                                        } 
                                    ></FAQContent>    
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "5. Is the discussion only limited to practice speaking? Can I practice other skills as well such as reading and writing?"
                                            :
                                            "5. 只能開「口說相關」的討論會嗎？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Not really. You are welcome to choose any topics that you are interested in."
                                            :
                                            "a. 不是的。 舉凡 工作面試題目、學校面試、文章閱讀、寫作練習、閒聊 等 都可以是討論會的主題。"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "6. What software do I need?"
                                            :
                                            "6. 討論會是使用什麼通訊軟體進行呢？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Google meet<a href='https://apps.google.com/intl/zh-TW/meet/how-it-works/' target='_blank'>（What is Google Meet?）</a>"
                                            :
                                            "a. Google meet<a href='https://apps.google.com/intl/zh-TW/meet/how-it-works/' target='_blank'>（什麼是Google Meet）</a>"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "7. What if I don’t have a Google account?"
                                            :
                                            "7. 我沒有Google帳號是不是就不能登入Google Meet？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. You will need to create one in order to participate in a discussion.<a href='https://support.google.com/accounts/answer/27441?hl=zh-Hant' target='_blank'>（ How to create a Google account）</a>"
                                            :
                                            "a. 是。請麻煩建立一個Google帳號<a href='https://support.google.com/accounts/answer/27441?hl=zh-Hant' target='_blank'>（申請Google帳號教學）</a>"
                                        } 
                                    ></FAQContent>   
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "8. If I already have a Google account, do I still need to register a new one?"
                                            :
                                            "8. 我本來就有Google帳號了，我還需要重新建立一個Google帳號嗎？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Nope. You can use the original one to join a discussion."
                                            :
                                            "a. 不需要。 用你現有的Google帳號即可。 "
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "9. How long does a discussion last?"
                                            :
                                            "9. 討論會通常都多久啊？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. It depends on the host. Usually, it is less than an hour."
                                            :
                                            "a. 由主持人決定。 但通常都不會超過1小時。"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "10. Do I need to turn my webcam on?"
                                            :
                                            "10. 討論會期間需要開鏡頭嗎？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. It’s not necessary but it would be great if you’re willing to."
                                            :
                                            "a. 不需要。 如果你希望開鏡頭也歡迎。"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "11. How can I get into the discussion room?"
                                            :
                                            "11. 要怎麼進入當次討論會聊天室？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Just click the Google meet link."
                                            :
                                            "a. 點當次聊天室的連結即可。"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "12. When is the earliest time that I can go into the discussion room?"
                                            :
                                            "12. 多久以前可以登入聊天室？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Three minutes before the discussion."
                                            :
                                            "a. 討論會<span style='color: red;'>開始前3分鐘</span>即可登入。"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "13. Can I go into the room a little bit later ?"
                                            :
                                            "13. 討論會開始多久就無法進入了？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Sure, but no later than 15 minutes after it starts."
                                            :
                                            "a. 討論會開始後15分鐘即無法進入。"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "14. The discussion has started but why am I not able to enter the room?"
                                            :
                                            "14. 討論會時間到了，不知道為什麼我無法進入聊天室？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. You have to click the ‘join’ link before you can enter the discussion room."
                                            :
                                            "a. 因為你要有參加（也就是按下 “join” 連結才會帶你進入。)"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "15. Why am I not able to click the ‘join’ link?"
                                            :
                                            "15. 為什麼我不能按下”join”? "
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. It may be because you do not have enough beads.<a href='mailto:lingotogether.gmail.com' target='_blank'>Please Email us.</a>"
                                            :
                                            "a. 有可能你的點數不足或是負的。<a href='mailto:lingotogether.gmail.com' target='_blank'>請Email與我們聯絡</a>"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "16. Are there any rules?"
                                            :
                                            "16. 有規則嗎？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Yes. Please read this<a href='/FAQ#rule'>About leading a discussion</a>"
                                            :
                                            "a. 有。 <a href='/FAQ#rule'>請看關於規則</a>"
                                        } 
                                    ></FAQContent>                                                                                                 
                                </div>                                
                                <div id="ancher">
                                    <h3 className="faq-header">
                                        {
                                            isEnglish
                                            ?
                                            'About leading a discussion '
                                            :
                                            '關於主持'
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "1. Do I have to be extremely fluent to be a host?"
                                            :
                                            "1. 我是不是要有很流利的口語才能當主持人？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Not necessary. As long as you can speak a basic level of English, you are eligible to be a host."
                                            :
                                            "a. 不需要，只要你有尚可流利度以及能夠簡單了解他人的回答、適時做應答，就可以擔任主持人。"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "2. How long would a discussion be?"
                                            :
                                            "2. 一場討論會時間大概多久？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. You can tailor the length of your own discussion. The average time would be approximately between 40-60 minutes."
                                            :
                                            "a. 你可自行決定討論會的長度。 建議40～60分鐘。"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "3. What is the most popular time for a discussion?"
                                            :
                                            "3. 比較多人參與的時間是什麼時候？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Weekdays: After 9 pm. (Taiwan time. GMT+8)<br/>b. Weekends: Before 10 am, after 8 pm. (Taiwan time. GMT+8)"
                                            :
                                            "a. 週間：晚上9點後。<br/>b. 週末： 早上10點前 、晚上8點後"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "4. How can I create a voice meeting with Google Meet ?"
                                            :
                                            "4. 如何建立Google meet 聊天室？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Please read <a href='https://apps.google.com/intl/zh-TW/meet/how-it-works/' target='_blank'>this</a>"
                                            :
                                            "a. <a href='https://apps.google.com/intl/zh-TW/meet/how-it-works/' target='_blank'>請看此教學文</a>"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "5. Can you show me how to launch a discussion?"
                                            :
                                            "5. 可以手把手教我如何開場嗎？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Definitely. We have a tutorial recording clip “How we work” on the website. You can watch it as much as you want."
                                            :
                                            "a. 可啊。 網站上有“How we work”的教學影片。有螢幕錄音教學。 可以重複看到飽。"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "6. What can I get if I lead / host a discussion ?"
                                            :
                                            "6. 擔任主持人可以獲得什麼好處？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. improve your organizational skills.<br/>b. gain further leadership skills.<br/>c. learn to extract relevant data from a conversation"
                                            :
                                            "a. 練習你的組織能力、領導小會議的領導力、和抓重點的能力。"
                                        } 
                                    ></FAQContent>                                    
                                </div>
                                <div id="attend">
                                    <h3 className="faq-header">
                                        {
                                            isEnglish
                                            ?
                                            'About participating in a discussion'
                                            :
                                            '關於參與'
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "1. What purpose does the attached link serve in every discussion?"
                                            :
                                            "1. 每場討論會附上的連結是什麼呀？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. It serves as a reference provided by the host, which includes information on the topic or other relevant questions."
                                            :
                                            "a. 主持人針對某個資料、發想出幾個問題供參與者討論。"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "2. I know that Practice makes Perfect, however I am at a loss of ideas when it is my turn to speak in the discussion"
                                            :
                                            "2. 我知道練習口說才會進步，可是我不知道在討論會要說什麼？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. You can take a look at the host’s information and his/her questions to prepare your answers. You’ll probably have something to say by the time it is your turn!"
                                            :
                                            "a. 你可以先看主持人提供的資料、問題，來準備你的答案。心中有答案就不會不知道要說什麼。"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "3. If I am not able to attend the discussion, or have to leave early, what should I do?"
                                            :
                                            "3. 我如果有事情沒辦法準時參加或是有事情需要提早離開怎麼辦？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. You can cancel your participation ONE HOUR BEFORE the scheduled start of the discussion. No beads will be deducted in doing so.<br/>b. If you need to leave early: Just tell the host and leave!"
                                            :
                                            "a. 可以在討論會<span style='color: red;'>開始前一小時</span>取消，訂金點數也不會被沒收。<br/>b. 需要提早離開：直接告知主持人要先離場即可。"
                                        } 
                                    ></FAQContent>
                                </div>
                                <div id="rule">
                                    <h3 className="faq-header">
                                        {
                                            isEnglish
                                            ?
                                            "About the rules and regulations"
                                            :
                                            '關於規則'
                                        }                                        
                                    </h3>
                                    <p style={{fontFamily: 'TimesNew Roman',
                                        fontSize: '12px',
                                        color: '#5c5655'}}>
                                        &emsp;&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "To ensure the quality and attendance of the discussion sessions, the following rules are designed to ensure compliance."
                                            :
                                            "為了確保每場討論會的品質以及出席率， 以下的規則是對自己負責任以及主持人的尊重；"
                                        }
                                        <span style={{color: 'red'}}>{
                                            isEnglish
                                            ?
                                            "Hosting or participating in a discussion will require a deposit of 10 beads."
                                            :
                                            "每一次主持、參與 都需要預付10點訂金點數。"
                                        }</span>
                                        {
                                            isEnglish
                                            ?
                                            "If you attend the lesson on time or cancel your booking at least an hour before the scheduled start, the full amount will be refunded to your account."
                                            :
                                            "如準時出席、提前一小時取消，訂金點數都會退回你的點數錢包。"
                                        }
                                         
                                        <br/>
                                        <i class="fas fa-circle fa-xs"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "When you attend on time"
                                            :
                                            "準時出席"
                                        }
                                        <br/>
                                        &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "Host : +20 beads"
                                            :
                                            "主持人 ： +20點"
                                        }
                                        &amp; 
                                        {
                                            isEnglish
                                            ?
                                            " full refund of your deposit"
                                            :
                                            "訂金退回"
                                        }
                                        <br/>
                                        &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "Participants : +10 beads"
                                            :
                                            "參與者 ： +10點 "
                                        }
                                        &amp; 
                                        {
                                            isEnglish
                                            ?
                                            " full refund of your deposit"
                                            :
                                            "訂金退回"
                                        }
                                        <br/>
                                        <br/>
                                        <i class="fas fa-circle fa-xs"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "No-show (without cancelling 1 hour prior to the discussion)"
                                            :
                                            "未出席、未取消 "
                                        }
                                        <br/>
                                        &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "Host : -30 beads"
                                            :
                                            "主持人 ： -30點"
                                        }
                                        &amp; 
                                        {
                                            isEnglish
                                            ?
                                            "no refund of your deposit"
                                            :
                                            "訂金不退回"
                                        }
                                        <br/>
                                        &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "Participants : -30 beads."
                                            :
                                            "參與者 ： -30點"
                                        }
                                        &amp; 
                                        {
                                            isEnglish
                                            ?
                                            "5 beads from your deposit will be given to the host and the other 5 beads will be forfeited."
                                            :
                                            "訂金5給該場主持人、5給系統。"
                                        }
                                        <br/>
                                    </p>                                                                       
                                </div>
                                <div id="beads">
                                    <h3 className="faq-header">
                                        {
                                            isEnglish
                                            ?
                                            "About the beads system"
                                            :
                                            "關於點數"
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "1. What can I do with the beads that I have accumulated?"
                                            :
                                            "1. 點數可以做什麼？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. They are used for a points reward system. You will be able to use the beads that you collected on Lingotogether to receive some gifts, such as grammar brochures or a lesson."
                                            :
                                            "a. 集點換東西呀。如同超商集點換東西的概念。可以是精編講義、 課程或更多。"
                                        } 
                                    ></FAQContent>
                                </div>
                                <div id="practice">
                                    <h3 className="faq-header">
                                        {
                                            isEnglish
                                            ?
                                            "About spoken English"
                                            :
                                            "關於英文口說練習"
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "1. I feel so nervous when speaking English even though I understand what people are saying most of the time."
                                            :
                                            "1. 我都聽的懂、可是我開口就是會緊張，所以講不出來。"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. You would be able to overcome your speaking anxiety by regularly practicing on Lingotogether. By doing so, you will learn how to express your thoughts explicitly and to a wider audience.<br/>b. Lingotogether provides a safe environment for you to practice your target language."
                                            :
                                            "a. 所以你來Lingotogether就是練習如果在說話時不緊張、怎麼把在你心裡想法清楚的表達出來。<br/>b. 如果你已經克服了你心中的緊張，在哪裡開口說英文會是問題嗎：） "
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "2. Why do I need to join Lingotogether if there are countless language exchanges groups online or offline?"
                                            :
                                            "2. 現在有許多的實體語言交換社團， 我為什麼要需要在Lingotogether練習？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Lingotogether provides you with a convenient way to practice your spoken English anytime and anywhere. You can feel free to join a discussion without the fear of meeting people face to face.<br/>b. Lingotogehter provides an environment where you are able to practice how to overcome your speaking nervousness. When you are less nervous, you are able to speak your target language anywhere:)"
                                            :
                                            "a. Lingotogether是透過「聲音」來練習， 因為不用看到人的臉部表情，就不會那麼緊張。 Lingotogether就是讓你練習如何不緊張。當你不緊張了，跟誰對話 就不是那麼重要了吧。"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "3. Am I able to track my learning progress?"
                                            :
                                            "3. 我能夠怎麼樣在Lingotogether 上看到我自己的進步？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Yes.  You will be able to check your language practice frequency under your profile."
                                            :
                                            "a. 可以到會員資料那裡查看，Lingotogether 都有幫你記錄你的學習頻率，可以看到自己的練習記錄噢！"
                                        } 
                                    ></FAQContent>
                                </div>                                  
                                <div id="lingo">
                                    <h3 className="faq-header">
                                        {
                                            isEnglish
                                            ?
                                            "About Lingotogether"
                                            :
                                            "關於聆果Lingotogether"
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "1. Why Lingotogether？"
                                            :
                                            "1. 為什麼會有Lingotogether？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. <a href='https://drive.google.com/file/d/1Y4j30Cuxubpp5-FyqecR-bl5JEj69WAl/view' target='_blank'>Please read this story</a>"
                                            :
                                            "a. <a href='https://drive.google.com/file/d/1Y4j30Cuxubpp5-FyqecR-bl5JEj69WAl/view' target='_blank'>這裡看Rhica老師創立Lingotogether的故事。</a>"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "2. Do I have to pay for practicing on Lingotogether in the future？"
                                            :
                                            "2. Lingotogether之後練習會收費嗎？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. No, you don’t. Why should we need to pay to practice a language?"
                                            :
                                            "a. 不用。練習為什麼要收費呢。"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "3. What are the core values of Lingotogether?"
                                            :
                                            "3. Lingotogether的核心概念是什麼？"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "a. Providing a safe environment for language learners.<br/>b. Get motivated to practice and learn<br/>c. Lowing the economic threshold for learning a new language."
                                            :
                                            "a. 提供外語學習者安全的練習環境<br/>b. 凝聚學習動力<br/>c. 降低學習經濟門檻"
                                        } 
                                    ></FAQContent>
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
