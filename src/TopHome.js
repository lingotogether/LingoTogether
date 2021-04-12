import React, { Fragment, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Home from './components/Home';
import { Wordings } from './wording';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {hendleDBactions} from './actions/handleDB';

const { aboutUs1, aboutUs2, aboutUs3, aboutUs1_EN, aboutUs2_EN, aboutUs3_EN } = Wordings;

function TopHome(props) {     
    const [annoucement, setAnnoucement] = useState();       

    const LocationHash = where => {
        window.location.hash = where;
    };

    const MediaLink = {
        line: 'https://lin.ee/ClD1qEz',
        fb: 'https://www.facebook.com/Lingotogether-106438844258407/?modal=admin_todo_tour',
        ig: 'https://www.instagram.com/lingotogether',
        email: 'mailto:hr@lingotogether.com',
        yt: 'https://www.youtube.com/channel/UC8UEVOyQJdTYhpiTyvIR8cw',
        podcast: 'https://medium.com/@lingotogether'
    };

    const handleAnnoucementData = () => {
        hendleDBactions('annoucement', '', '', '',
        (data) => { setAnnoucement(data.find(d=>d.DataID === 'annoucementID').Annoucement); }
        );
    }

    useEffect(() => {
        handleAnnoucementData();
    })
    

    return (
        <Fragment>
            <div className="container">
                <div id="marqueeArea" 
                    style={{
                        width: '100%',
                        height: '50px',                        
                        marginTop: '15px',                        
                        lineHeight: '50px',
                        paddingLeft: '60px',
                        position: 'relative',
                        fontWeight: '600'
                        }}>
                    <div>
                        <img alt='notice' src={require('./img/notice_icon.png')}
                            style={{
                                'margin-top': '10px',
                                position: 'absolute',
                                top: '0',
                                left: '0',                                
                                width: '50px',
                            }}
                        />
                    </div>                    
                    <marquee direction="left" align="midden" height="40" behavior="scroll">{annoucement}</marquee>                                       
                </div>
                <div id="top-slide">
                    <div className="row reverse">
                        <div className="col-6">
                            <div className="nameBanner">
                                <img
                                    src={require('./img/lingo.png')}
                                    alt="LingoTogether"
                                    style={{ width: '100%' }}
                                />
                                {
                                    props.location.state !== undefined  && props.location.state.isEnglish
                                    ? 
                                    <p className="labortatory">
                                        Practice your target language online for free.                                                                              
                                    </p>
                                    :
                                    <p className="labortatory">
                                         免費在線上練習你的目標語言。
                                        <span style={{ color: 'rgb(29, 158, 130)' }}>
                                
                                        </span>
                                        
                                        <span style={{ color: 'rgb(29, 158, 130)' }}> </span>
                                    </p>
                                }                                                                
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="next">
                                <div className="materials">
                                    <iframe
                                        title="uniq"
                                        width="100%"
                                        height="315"
                                        src="https://www.youtube.com/embed/3iiHV2c2Ubs"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <h3>How we work</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Outlets">
                    <div id="intro" className="wow fadeIn">
                        {
                            props.location.state !== undefined  && props.location.state.isEnglish
                            ?
                            <h2> About Lingotogether </h2>
                            :                            
                            <h2> 平台介紹與特色</h2>
                        }                                                
                        <hr />
                        {
                            props.location.state !== undefined  && props.location.state.isEnglish
                            ?
                            <div>
                                <p>　
                                    “Practice”is the most efficient way for language learning; 
                                </p>
                                <p>
                                    whereas “immersion”is the most direct way for language acquisition.
                                </p>
                                <p>
                                    Lingotogether combines “practice” and “immersion” and creates a unique environment for language practice.
                                </p>
                            </div>
                            :
                            <div>
                                <p> 
                                    【練習】是語言學習最有效的方法；
                                </p>
                                <p>
                                    【沈浸】是語言習得最直接的做法。
                                </p>
                                <p>
                                    Lingotogether結合【練習】與【沈浸】打造出獨特的外語練習環境。
                                </p>
                            </div>
                        }                                                
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <div className="thumbnail">
                                <a href="#Calendar" onClick={() => LocationHash('#Calendar')}>
                                    <div className="cover"></div>
                                </a>
                                <img src={require('./img/self-learning.jpg')} alt="self-learning" />
                                {
                                    props.location.state !== undefined  && props.location.state.isEnglish
                                    ?
                                    <h3 className="title">Self-regulated Learning</h3>
                                    :
                                    <h4 className="title"> 自主學習</h4>
                                }                                                                
                                <p dangerouslySetInnerHTML={{ __html: props.location.state !== undefined  && props.location.state.isEnglish ? aboutUs1_EN : aboutUs1 }}></p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="thumbnail">
                                <a href="#Rules" onClick={() => LocationHash('#Rules')}>
                                    <div className="cover"></div>
                                </a>
                                <img
                                    src={require('./img/well organized.jpg')}
                                    alt="well organized"
                                />
                                {
                                    props.location.state !== undefined  && props.location.state.isEnglish
                                    ?
                                    <h3 className="title">Knowledge Production Output</h3>
                                    :
                                    <h4 className="title">語言知識輸出管道</h4>
                                }                                                                
                                <p dangerouslySetInnerHTML={{ __html: props.location.state !== undefined  && props.location.state.isEnglish ? aboutUs2_EN : aboutUs2 }}></p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="thumbnail">
                                <a href="#Calendar" onClick={() => LocationHash('#Calendar')}>
                                    <div className="cover"></div>
                                </a>
                                <img src={require('./img/motivation.jpg')} alt="motivation" />
                                {
                                    props.location.state !== undefined  && props.location.state.isEnglish
                                    ?
                                    <h3 className="title">Convenience</h3>
                                    :
                                    <h4 className="title">任何地點</h4>
                                }                                                                
                                <p dangerouslySetInnerHTML={{ __html: props.location.state !== undefined  && props.location.state.isEnglish ? aboutUs3_EN : aboutUs3 }}></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Rules">
                {
                    /*
                    <div>
                        <div id="intro">
                            <h2>運作規則</h2>
                            <h2>Rules</h2>
                            <hr />
                            <p dangerouslySetInnerHTML={{ __html: rulesIntroE }}></p>

                            <p dangerouslySetInnerHTML={{ __html: rulesIntroC }}></p>
                        </div>
                    </div>
                    */
                }
                    <div className="row">
                        <div className="col-6">
                            <img
                                src={require('./img/counting.jpg')}
                                alt="First slide"
                                style={{ width: '100%', marginTop: '20px' }}
                            />
                        </div>
                        <div className="col-6">
                            <div className="countingTitle">
                                <div className="countingDiv">
                                    {
                                        props.location.state !== undefined  && props.location.state.isEnglish
                                        ?
                                        <h3 className="title">Counting beads</h3>
                                        :
                                        <h3 className="title">基本點數計算方式</h3>
                                    }                                                                        
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {
                            props.location.state !== undefined  && props.location.state.isEnglish
                            ?
                            <div className="">
                                <Grid item xs={12}>
                                    <p style={{textAlign: "center"}}>
                                        <b>Time: Schedule your own time(based on your time zone)</b>
                                    </p>
                                    <p style={{textAlign: "center"}}>Host：20 beads / Participant：10 beads</p>
                                    {/* <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <h2 className="title">Being a Host</h2>
                                            <hr />
                                            <p dangerouslySetInnerHTML={{ __html: rulesE }}></p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h2 className="title">Being a participant</h2>
                                            <hr />
                                            <p dangerouslySetInnerHTML={{ __html: rulesF }}></p>
                                        </Grid>
                                    </Grid> */}
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <i class="fas fa-circle fa-xs"></i>&emsp;
                                            When you attend on time
                                            <br/>
                                            &emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                            Host : +20 beads
                                            &amp;
                                            full refund of your deposit
                                            <br/>
                                            &emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                            Participants : +10 beads
                                            &amp; 
                                            full refund of your deposit
                                        </Grid>
                                        <Grid item xs={6}>
                                            <i class="fas fa-circle fa-xs"></i>&emsp;
                                            No-show (without cancelling 1 hour prior to the discussion)
                                            <br/>
                                            &emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                            Host : -30 beads
                                            &amp;
                                            no refund of your deposit
                                            <br/>
                                            &emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                            Participants : -30 beads.
                                            &amp; 
                                            5 beads from your deposit will be given to the host and the other 5 beads will be forfeited.
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                            :
                            <div className="col-12">
                                <Grid item xs={12}>
                                    <p style={{textAlign: "center"}}>
                                        <b>時間： 自由選擇時間(根據你的時區)</b>
                                    </p>
                                    <p style={{textAlign: "center"}}>主持人：20 beads / 參加者：10 beads</p>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <i class="fas fa-circle fa-xs"></i>&emsp;
                                            準時出席
                                            <br/>
                                            &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                            主持人 ： +20點
                                            &amp;
                                            訂金退回
                                            <br/>
                                            &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                            參與者 ： +10點 
                                            &amp;
                                            訂金退回                                                                                        
                                        </Grid>
                                        <Grid item xs={6}>
                                            <i class="fas fa-circle fa-xs"></i>&emsp;
                                            未出席、未取消 
                                            <br/>
                                            &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                            主持人 ： -30點
                                            &amp;
                                            訂金不退回
                                            <br/>
                                            &emsp;&emsp;&emsp;&emsp;<i class="fas fa-arrow-right"></i>&emsp;
                                            參與者 ： -30點
                                            &amp;
                                            訂金5給該場主持人、5給系統。
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        }                                                   
                    </div>
                </div>
                <div id="Calendar">
                    <div id="intro">
                        {
                            props.location.state !== undefined  && props.location.state.isEnglish
                            ?
                            <h2>Monthly Schedule</h2>
                            :                            
                            <h2>正在進行...</h2>
                        }                        
                        <hr />
                        {
                            props.location.state !== undefined  && props.location.state.isEnglish
                            ?
                            <h4>(Based on your time zone)</h4>
                            :                            
                            <h4>(根據你的時區)</h4>
                        }  
                    </div>
                    
                    <Home {...props} isOffset={false} />
                </div>
                <div id="Steps">
                    <div id="intro">
                        {
                            props.location.state !== undefined  && props.location.state.isEnglish
                            ?
                            <h1>Ready to get started?</h1>
                            :
                            <h2>準備好了嗎？</h2>
                        }                                                
                        <hr />
                        {
                            props.location.state !== undefined  && props.location.state.isEnglish
                            ?
                            <p>Follow two steps and join us</p>
                            :
                            <p>2步驟，立刻加入我們</p>
                        }                                                
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <img
                                src={require('./img/form.jpg')}
                                alt="form"
                                style={{ width: '70%', marginTop: '20px' }}
                            />
                        </div>
                        <div className="col-6">
                            <h3>Step 1</h3>
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <p>
                                    <b>Sign up for a free account </b>{' '}
                                </p>
                                :
                                <p>
                                    <b> 註冊免費帳號</b>{' '}
                                </p>
                            }                                                         
                            <hr />
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <p>
                                    • <a href="./signup">Sign up</a> for a free account and log in
                                </p>
                                :
                                <p>• 註冊成為聆果會員</p>
                            }                                                        
                        </div>
                    </div>
                    <div className="row reverse">
                        <div className="col-6">
                            <img
                                src={require('./img/join.jpg')}
                                alt="talk"
                                style={{ width: '70%', marginTop: '20px' }}
                            />
                        </div>
                        <div className="col-6">
                            <h3>Step 2</h3>
                            <b></b>
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <p>
                                    <b>Congratulations, you are in ! </b>{' '}
                                </p>
                                :
                                <p>
                                    <b>恭喜您，成為會員</b>{' '}
                                </p>
                            }                                                         
                            <hr />
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <div>
                                    <p>Go to calendar. </p>
                                    <p>Choose the time you are available </p>
                                    <p>Start your language practices journey. </p>
                                </div>
                                :
                                <div>
                                    <p>可由會員專區進入日曆，</p>
                                    <p>新增討論或加入已開設之討論 </p>
                                    <p>開啟您的語言練習之旅。</p>
                                </div>
                            }                                                             
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <img
                                src={require('./img/talk.jpg')}
                                alt="join"
                                style={{ width: '70%', marginTop: '20px' }}
                            />
                        </div>
                        <div className="col-6">
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <h3>Questions？Get extra help !</h3>
                                :
                                <b>有問題？ 獲得額外協助 </b>
                            }                                                        
                            <hr />
                            <div>
                                {
                                    props.location.state !== undefined  && props.location.state.isEnglish
                                    ?
                                    <p> Contact us on:</p>
                                    :
                                    <p>聯絡我們吧: </p>
                                }                                 
                                <ul className="contactUs">
                                    <li>
                                        <a href={MediaLink.line}>
                                            <i className="fab fa-line"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={MediaLink.email}>
                                            <i className="fas fa-envelope"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={MediaLink.ig}>
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={MediaLink.fb}>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="FAQ">
                    {
                        props.location.state !== undefined  && props.location.state.isEnglish
                        ?
                        <h1>Frequently asked questions</h1>
                        :
                        <h1>常見問題</h1>
                    }
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <Typography variant="h6">Will there be a discussion everyday? Why is there no discussion scheduled in the calendar everyday?</Typography>                                
                                :
                                <Typography variant="h6">每天都有討論會嗎？ 可是我看日曆上沒有每一天都有耶？</Typography>
                            }
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <Typography variant="body1">
                                As Lingotogether is a self-directed learning/ practice platform, if there is no one to initiate the topic, then there would obviously be no discussion available to join. However, you can always start one!
                                </Typography>
                                :                                
                                <Typography variant="body1">
                                因為這是「自主練習」的環境，沒有人開場， 當然就不會有練習的機會。 你也可以考慮自己主持一場來練習 。
                                </Typography>
                            }
                            
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <Typography variant="h6">Can I join an advanced or intermediate discussion if I am not fluent enough?</Typography>
                                :
                                <Typography variant="h6">我英文口說不太流利，是不是不能參加中階、進階討論會？</Typography>
                            }
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                props.location.state !== undefined  && props.location.state.isEnglish
                                ?
                                <Typography variant="body1">
                                Absolutely. You still can join the discussion. The standard of the level is
                                based on the content of the selected material and not your English proficiency.
                                </Typography>
                                :
                                <Typography variant="body1">
                                英文口說不太流利當然還是可以參加啊！因為場次會分等級只是給你一個參考當次討論內容、題目的難易度而已。
                                </Typography>
                            }                            
                        </AccordionDetails>
                    </Accordion>   
                    <div id="go-faq"> 
                        <a  href="/FAQ">
                            Read All FAQ
                        </a>  
                    </div>              
                </div>
                <a id="go-top" href="#header" onClick={() => LocationHash('#header')}>
                    Top
                </a>
            </div>
            <div id="footer" style={{ backgroundColor: ' #20B2AA' }}>
                <div className="logo">
                    <img src={require('./img/lingo-2-removebg.png')} alt="logo" />
                </div>
                <div className="row reverse">
                    <div className="col-6">
                        <div className="footer-icons col-md-6 col-sm-12">
                            <div className="social-media">
                                <ul className="clearfix">
                                    <li>
                                        <a href={MediaLink.podcast}>
                                            <i className="fas fa-podcast"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={MediaLink.line}>
                                            <i className="fab fa-line"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={MediaLink.ig}>
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={MediaLink.fb}>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={MediaLink.yt}>
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </li>

                                      

                                    <li>
                                        <a href={MediaLink.email}>
                                            <i className="fas fa-envelope"></i>
                                        </a>

                                    </li>
                                  
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="footer-words col-md-6 col-sm-12">
                            <div className="copyright">
                                <div className="title">&copy; Lingotogether2020.</div>
                                <div className="subtitle">practice languages together</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TopHome;
