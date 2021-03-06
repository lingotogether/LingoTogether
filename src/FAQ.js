import React, { Fragment, useEffect, useState } from 'react';
import FAQContent from './components/FAQ/FAQContent'

function FAQ(props) {     
    const [position, setPosition] = useState('static');  
    const [top, setTop] = useState('0px');
    const [margin, setMargin] = useState('0%');
    const [isEnglish, setIsEnglish] = useState(props.location.state !== undefined  && props.location.state.isEnglish);

    const LocationHash = (where, id) => {               
        window.location.hash = where;        
    };    
    
    useEffect(() => {
        //handleRWD()
        window.addEventListener('scroll', handleScroll)
        if (props.location.state !== undefined){
            setIsEnglish(props.location.state.isEnglish);
        }        
    }, [props.location.state])
    const handleScroll = e => {
        // console.log(e.path[1].scrollY, 'clientHeight')
        const scrollY = e.path[1].scrollY
        if (scrollY > 200) {
            setPosition('fixed');
            setTop('110px');
            setMargin('33.3333333333%');
        }
        else{
            setPosition('static');
            setTop('0px');
            setMargin('0%');
        }
    }
    
    const wordingEn = `It depends on the level of difficulty of the selected material.<br/>
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
    const wording = `????????????????????????????????????<br/>
                    <table>
                        <tr>
                            <td></td>
                            <td>??????</td>
                            <td>??????</td>
                            <td>??????</td>
                        </tr>
                        <tr>
                            <td>??????</td>
                            <td>?????????????????????????????????????????????????????????</td>
                            <td>????????????????????????????????????????????????????????????????????????????????????</td>
                            <td>???????????????????????????????????????????????????????????????????????????????????????</td>
                        </tr>
                        <tr>
                            <td>??????</td>
                            <td>??????????????????</td>
                            <td>?????????????????????</td>
                            <td>????????????</td>
                        </tr>
                    </table>`;
    
    return (
        <Fragment>
            <div style={{position: ''}}>
                <section>
                    <div className="top-title"><h2>Frequently Asked Questions</h2></div>
                </section>
                <section>
                    <div className="container" style={{maxWidth: "100%"}}>
                        <div className="row">
                            <div className="col-4" style={{position: position, top: top, margin: "42px 0"}}>
                                <div className="faq-link">
                                    <a href="/FAQ#discussion" onClick={() => LocationHash(1, 'discussion')}>
                                        {
                                            isEnglish
                                            ?
                                            'About the discussion'
                                            :
                                            '???????????????'
                                        }                                        
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#ancher" onClick={() => LocationHash(2, 'ancher')}>
                                        {
                                            isEnglish
                                            ?
                                            'About leading a discussion'
                                            :
                                            '????????????'
                                        }                                        
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#attend" onClick={() => LocationHash(3, 'attend')}>
                                        {
                                            isEnglish
                                            ?
                                            'About participating in a discussion'
                                            :
                                            '????????????'
                                        }                                         
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#rule" onClick={() => LocationHash(3, 'rule')}>
                                        {
                                            isEnglish
                                            ?
                                            'About the rules and regulations'
                                            :
                                            '????????????'
                                        }                                         
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#beads" onClick={() => LocationHash(3, 'beads')}>
                                        {
                                            isEnglish
                                            ?
                                            'About the beads system'
                                            :
                                            '????????????'
                                        }                                          
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#practice" onClick={() => LocationHash(4, 'practice')}>
                                        {   
                                            isEnglish
                                            ?
                                            'About spoken English'
                                            :
                                            '????????????????????????'
                                        }                                     
                                    </a>
                                </div>
                                <div className="faq-link">
                                    <a href="/FAQ#lingo" onClick={() => LocationHash(4, 'lingo')}>
                                        {   
                                            isEnglish
                                            ?
                                            'About Lingotogether '
                                            :
                                            '????????????Lingotogether'
                                        }                                        
                                    </a>
                                </div>
                            </div>
                            <div className="col-6" style={{marginLeft: margin}}>
                                <div id="discussion">
                                    <h3  className="faq-header">
                                        {
                                            isEnglish
                                            ?
                                            "About the discussion"
                                            :
                                            "????????????"
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Will there be a discussion everyday? Why is there no discussion scheduled in the calendar everyday?"
                                            :
                                            "??????????????????????????? ????????????????????????????????????????????????"   
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "As Lingotogether is a self-directed learning/ practice platform, if there is no one to initiate the topic, then there would obviously be no discussion available to join. However, you can always start one!"
                                            :
                                            "???????????????????????????????????????????????????????????? ???????????????????????????????????? ????????????????????????????????????????????? ???"
                                        }
                                    ></FAQContent>                                    
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "What is the difference between ???beginner???, ???intermediate??? and ???advanced??? levels?"
                                            :
                                            "?????????????????????????????????????????????????????????"
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
                                            "Can I join an advanced or intermediate discussion if I am not fluent enough?"
                                            :
                                            "??????????????????????????????????????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Absolutely. You still can join the discussion. The standard of the level is based on the content of the selected material and not your English proficiency."
                                            :
                                            "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                                        } 
                                    ></FAQContent>                                       
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Is the purpose of the discussion solely for practising spoken English?"
                                            :
                                            "???????????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "It not only trains your speaking skills but also polishes your critical thinking skills and how you could contribute your ideas properly."
                                            :
                                            "?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                                        } 
                                    ></FAQContent>    
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Is the discussion only limited to practice speaking? Can I practice other skills as well such as reading and writing?"
                                            :
                                            "?????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Not really. You are welcome to choose any topics that you are interested in."
                                            :
                                            "???????????? ?????? ???????????????????????????????????????????????????????????????????????? ??? ?????????????????????????????????"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "What software do I need?"
                                            :
                                            "????????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Google meet<a href='https://apps.google.com/intl/zh-TW/meet/how-it-works/' target='_blank'>???What is Google Meet????</a>"
                                            :
                                            "Google meet<a href='https://apps.google.com/intl/zh-TW/meet/how-it-works/' target='_blank'>????????????Google Meet???</a>"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "What if I don???t have a Google account?"
                                            :
                                            "?????????Google??????????????????????????????Google Meet???"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "You will need to create one in order to participate in a discussion.<a href='https://support.google.com/accounts/answer/27441?hl=zh-Hant' target='_blank'>??? How to create a Google account???</a>"
                                            :
                                            "???????????????????????????Google??????<a href='https://support.google.com/accounts/answer/27441?hl=zh-Hant' target='_blank'>?????????Google???????????????</a>"
                                        } 
                                    ></FAQContent>   
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "If I already have a Google account, do I still need to register a new one?"
                                            :
                                            "???????????????Google??????????????????????????????????????????Google????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Nope. You can use the original one to join a discussion."
                                            :
                                            "???????????? ???????????????Google??????????????? "
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "How long does a discussion last?"
                                            :
                                            "??????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "It depends on the host. Usually, it is less than an hour."
                                            :
                                            "????????????????????? ????????????????????????1?????????"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Do I need to turn my webcam on?"
                                            :
                                            "????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "It???s not necessary but it would be great if you???re willing to."
                                            :
                                            "???????????? ????????????????????????????????????"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "How can I get into the discussion room?"
                                            :
                                            "??????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Just click the Google meet link."
                                            :
                                            "????????????????????????????????????"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "When is the earliest time that I can go into the discussion room?"
                                            :
                                            "????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Three minutes before the discussion."
                                            :
                                            "?????????<span style='color: red;'>?????????3??????</span>???????????????"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Can I go into the room a little bit later ?"
                                            :
                                            "??????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Sure, but no later than 15 minutes after it starts."
                                            :
                                            "??????????????????15????????????????????????"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "The discussion has started but why am I not able to enter the room?"
                                            :
                                            "?????????????????????????????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "You have to click the ???join??? link before you can enter the discussion room."
                                            :
                                            "??????????????????????????????????????? ???join??? ???????????????????????????)"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Why am I not able to click the ???join??? link?"
                                            :
                                            "???????????????????????????join???? "
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "It may be because you do not have enough beads.<a href='mailto:lingotogether.gmail.com' target='_blank'>Please Email us.</a>"
                                            :
                                            "??????????????????????????????????????????<a href='mailto:lingotogether.gmail.com' target='_blank'>???Email???????????????</a>"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Are there any rules?"
                                            :
                                            "???????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Yes. Please read this<a href='/FAQ#rule'>About leading a discussion</a>"
                                            :
                                            "?????? <a href='/FAQ#rule'>??????????????????</a>"
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
                                            '????????????'
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Do I have to be extremely fluent to be a host?"
                                            :
                                            "?????????????????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Not necessary. As long as you can speak a basic level of English, you are eligible to be a host."
                                            :
                                            "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "How long would a discussion be?"
                                            :
                                            "????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "You can tailor the length of your own discussion. The average time would be approximately between 40-60 minutes."
                                            :
                                            "??????????????????????????????????????? ??????40???60?????????"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "What is the most popular time for a discussion?"
                                            :
                                            "?????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Weekdays: After 9 pm. (Taiwan time. GMT+8)<br/>Weekends: Before 10 am, after 8 pm. (Taiwan time. GMT+8)"
                                            :
                                            "???????????????9?????????<br/>????????? ??????10?????? ?????????8??????"
                                        } 
                                    ></FAQContent> 
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "How can I create a voice meeting with Google Meet ?"
                                            :
                                            "????????????Google Meet ????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Please read <a href='https://apps.google.com/intl/zh-TW/meet/how-it-works/' target='_blank'>this</a>"
                                            :
                                            "<a href='https://apps.google.com/intl/zh-TW/meet/how-it-works/' target='_blank'>??????????????????</a>"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Can you show me how to launch a discussion?"
                                            :
                                            "???????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Please read <a href='https://drive.google.com/file/d/109Q1gf6CPHjn3gyXJVa3iB6gI4IKQI9Y/view?usp=sharing' target='_blank'>this</a>"
                                            :
                                            "<a href='https://drive.google.com/file/d/109Q1gf6CPHjn3gyXJVa3iB6gI4IKQI9Y/view?usp=sharing' target='_blank'>??????????????????</a>"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "What can I get if I lead / host a discussion ?"
                                            :
                                            "??????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "improve your organizational skills.<br/>gain further leadership skills.<br/>learn to extract relevant data from a conversation"
                                            :
                                            "?????????????????????????????????????????????????????????????????????????????????"
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
                                            '????????????'
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "What purpose does the attached link serve in every discussion?"
                                            :
                                            "?????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "It serves as a reference provided by the host, which includes information on the topic or other relevant questions."
                                            :
                                            "????????????????????????????????????????????????????????????????????????"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "I know that Practice makes Perfect, however I am at a loss of ideas when it is my turn to speak in the discussion"
                                            :
                                            "?????????????????????????????????????????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "You can take a look at the host???s information and his/her questions to prepare your answers. You???ll probably have something to say by the time it is your turn!"
                                            :
                                            "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "If I am not able to attend the discussion, or have to leave early, what should I do?"
                                            :
                                            "????????????????????????????????????????????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "You can cancel your participation ONE HOUR BEFORE the scheduled start of the discussion. No beads will be deducted in doing so.<br/>If you need to leave early: Just tell the host and leave!"
                                            :
                                            "??????????????????<span style='color: red;'>??????????????????</span>??????????????????????????????????????????<br/>???????????????????????????????????????????????????????????????"
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
                                            '????????????'
                                        }                                        
                                    </h3>
                                    <p className="faq-answer">
                                        &emsp;&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "To ensure the quality and attendance of the discussion sessions, the following rules are designed to ensure compliance."
                                            :
                                            "?????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????"
                                        }
                                        <span style={{color: 'red'}}>{
                                            isEnglish
                                            ?
                                            "Hosting or participating in a discussion will require a deposit of 10 beads."
                                            :
                                            "???????????????????????? ???????????????10??????????????????"
                                        }</span>
                                        {
                                            isEnglish
                                            ?
                                            "If you attend the lesson on time or cancel your booking at least an hour before the scheduled start, the full amount will be refunded to your account."
                                            :
                                            "???????????????????????????????????????????????????????????????????????????????????????"
                                        }
                                         
                                        <br/>
                                        <i class="fas fa-circle fa-xs"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "When you attend on time"
                                            :
                                            "????????????"
                                        }
                                        <br/>
                                        &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "Host : +20 beads"
                                            :
                                            "????????? ??? +20???"
                                        }
                                        &amp; 
                                        {
                                            isEnglish
                                            ?
                                            " full refund of your deposit"
                                            :
                                            "????????????"
                                        }
                                        <br/>
                                        &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "Participants : +10 beads"
                                            :
                                            "????????? ??? +10??? "
                                        }
                                        &amp; 
                                        {
                                            isEnglish
                                            ?
                                            " full refund of your deposit"
                                            :
                                            "????????????"
                                        }
                                        <br/>
                                        <br/>
                                        <i class="fas fa-circle fa-xs"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "No-show (without cancelling 1 hour prior to the discussion)"
                                            :
                                            "????????????????????? "
                                        }
                                        <br/>
                                        &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "Host : -30 beads"
                                            :
                                            "????????? ??? -30???"
                                        }
                                        &amp; 
                                        {
                                            isEnglish
                                            ?
                                            "no refund of your deposit"
                                            :
                                            "???????????????"
                                        }
                                        <br/>
                                        &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                        {
                                            isEnglish
                                            ?
                                            "Participants : -30 beads."
                                            :
                                            "????????? ??? -30???"
                                        }
                                        &amp; 
                                        {
                                            isEnglish
                                            ?
                                            "5 beads from your deposit will be given to the host and the other 5 beads will be forfeited."
                                            :
                                            "??????5?????????????????????5????????????"
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
                                            "????????????"
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Verify your Lingotogether account"
                                            :
                                            "Email????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "When you???re setting up a Lingotogether account, we'll send a verification link to the email address you used to create the account. Once you verify the account, you will receive 10 beads."
                                            :
                                            "????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????????10??????"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "I have already verified my account but I didn???t receive 10 beads."
                                            :
                                            "?????????????????????????????? ??????????????????10?????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Please <span style='color: red;'>sign out</span> of your Lingotogether account and <span style='color: red;'>sign in again</span> so that you will receive 10 beads. If it doesn???t work, <a href='mailto:lingotogether@gmail.com'>email us</a>."
                                            :
                                            "????????????????????? ????????? ????????????????????????10????????? ???????????????????????? ??????<a href='mailto:lingotogether@gmail.com'>Email??????</a>"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "What can I do with the beads that I have accumulated?"
                                            :
                                            "????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "They are used for a points reward system. You will be able to use the beads that you collected on Lingotogether to receive some gifts, such as grammar brochures or a lesson."
                                            :
                                            "???????????????????????????????????????????????????????????????????????????????????? ??????????????????"
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
                                            "????????????????????????"
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "I feel so nervous when speaking English even though I understand what people are saying most of the time."
                                            :
                                            "????????????????????????????????????????????????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "You would be able to overcome your speaking anxiety by regularly practicing on Lingotogether. By doing so, you will learn how to express your thoughts explicitly and to a wider audience.<br/>Lingotogether provides a safe environment for you to practice your target language."
                                            :
                                            "????????????Lingotogether?????????????????????????????????????????????????????????????????????????????????????????????<br/>?????????????????????????????????????????????????????????????????????????????????????????? "
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Why do I need to join Lingotogether if there are countless language exchanges groups online or offline?"
                                            :
                                            "????????????????????????????????????????????? ????????????????????????Lingotogether?????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Lingotogether provides you with a convenient way to practice your spoken English anytime and anywhere. You can feel free to join a discussion without the fear of meeting people face to face.<br/>Lingotogehter provides an environment where you are able to practice how to overcome your speaking nervousness. When you are less nervous, you are able to speak your target language anywhere:)"
                                            :
                                            "Lingotogether????????????????????????????????? ??????????????????????????????????????????????????????????????? Lingotogether????????????????????????????????????????????????????????????????????? ??????????????????????????????"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Am I able to track my learning progress?"
                                            :
                                            "?????????????????????Lingotogether ??????????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "Yes.  You will be able to check your language practice frequency under your profile."
                                            :
                                            "????????????????????????????????????Lingotogether ??????????????????????????????????????????????????????????????????????????????"
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
                                            "????????????Lingotogether"
                                        }                                        
                                    </h3>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Why Lingotogether???"
                                            :
                                            "???????????????Lingotogether???"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "<a href='https://drive.google.com/file/d/1Y4j30Cuxubpp5-FyqecR-bl5JEj69WAl/view' target='_blank'>Please read this story</a>"
                                            :
                                            "<a href='https://drive.google.com/file/d/1Y4j30Cuxubpp5-FyqecR-bl5JEj69WAl/view' target='_blank'>?????????Rhica????????????Lingotogether????????????</a>"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "Do I have to pay for practicing on Lingotogether in the future???"
                                            :
                                            "Lingotogether???????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            "No, you don???t. Why should we need to pay to practice a language?"
                                            :
                                            "???????????????????????????????????????"
                                        } 
                                    ></FAQContent>
                                    <FAQContent 
                                        question = {
                                            isEnglish
                                            ?
                                            "What are the core values of Lingotogether?"
                                            :
                                            "Lingotogether???????????????????????????"
                                        } 
                                        answer = {
                                            isEnglish
                                            ?
                                            `<i class="fas fa-circle fa-xs"></i>&emsp;Providing a safe environment for language learners.<br/>
                                            <i class="fas fa-circle fa-xs"></i>&emsp;Get motivated to practice and learn<br/>
                                            <i class="fas fa-circle fa-xs"></i>&emsp;Lowing the economic threshold for learning a new language.`
                                            :
                                            `<i class="fas fa-circle fa-xs"></i>&emsp;??????????????????????????????????????????<br/>
                                            <i class="fas fa-circle fa-xs"></i>&emsp;??????????????????<br/>
                                            <i class="fas fa-circle fa-xs"></i>&emsp;????????????????????????`
                                        }
                                        useImg = { isEnglish ? 'En' : 'Ch' }
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
