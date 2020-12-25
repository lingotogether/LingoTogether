import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Home from './components/Home';
import { Wordings } from './wording';

const { aboutUs1, aboutUs2, aboutUs3, rulesIntroE, rulesIntroC, rulesE, rulesC, rulesF } = Wordings;

function TopHome(props) {

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

    return (
        <Fragment>
            <div className="container">
                <div id="top-slide">
                    <div className="row reverse">
                        <div className="col-6">
                            <div className="nameBanner">
                                <img
                                    src={require('./img/lingo.png')}
                                    alt="LingoTogether"
                                    style={{ width: '100%' }}
                                />
                                <p className="labortatory">
                                    Practice your target language online for free.  

                                    
                                  
                                </p>

                                <p className="labortatory">
                                     免費在線上練習你的目標語言。
                                    <span style={{ color: 'rgb(29, 158, 130)' }}>
                            
                                    </span>
                                    
                                    <span style={{ color: 'rgb(29, 158, 130)' }}> </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="next">
                                <div className="materials">
                                    <iframe
                                        title="uniq"
                                        width="100%"
                                        height="315"
                                        src="https://www.youtube.com/embed/0_sQS_w3S24"
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
                        <h2> 平台介紹與特色</h2>
                        <h2> About Lingotogether </h2>
                        <hr />

                        <p>　
                            “Practice”is the most efficient way for language learning; 
                        </p>
                         <p>
                            whereas “immersion”is the most direct way for language acquisition.
                         </p>
                         <p>
                             Lingotogether combines “practice” and “immersion” and creates a unique environment for language practice.
                         </p>

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

                    <div className="row">
                        <div className="col-4">
                            <div className="thumbnail">
                                <a href="#Calendar" onClick={() => LocationHash('#Calendar')}>
                                    <div className="cover"></div>
                                </a>
                                <img src={require('./img/self-learning.jpg')} alt="self-learning" />
                                <h3 className="title">Self-regulated Learning</h3>
                                <h4 className="title"> 自主學習</h4>
                                <p dangerouslySetInnerHTML={{ __html: aboutUs1 }}></p>
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
                                <h3 className="title">Knowledge Production Output</h3>
                                <h4 className="title">語言知識輸出管道</h4>
                                <p dangerouslySetInnerHTML={{ __html: aboutUs2 }}></p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="thumbnail">
                                <a href="#Calendar" onClick={() => LocationHash('#Calendar')}>
                                    <div className="cover"></div>
                                </a>
                                <img src={require('./img/motivation.jpg')} alt="motivation" />
                                <h3 className="title">Convenience</h3>
                                <h4 className="title">任何地點</h4>
                                <p dangerouslySetInnerHTML={{ __html: aboutUs3 }}></p>
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
                                    <h3 className="title">Counting beads</h3>
                                    <h3 className="title">基本點數計算方式</h3>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Grid item xs={12}>
                                <p>
                                    <b>Time: Schedule your own time(based on your time zone)</b>
                                </p>
                                <p>Host：20 beads / Participant：10 beads</p>
                                <Grid container spacing={3}>
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
                                </Grid>
                            </Grid>
                        </div>
                        <div className="col-6">
                            <Grid item xs={12}>
                                <p>
                                    <b>時間： 自由選擇時間(根據你的時區)</b>
                                </p>
                                <p>主持人：20 beads / 參加者：10 beads</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <h2 className="title">擔任主持人</h2>
                                        <hr />
                                        <p dangerouslySetInnerHTML={{ __html: rulesC }}></p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h2 className="title">參加討論者</h2>
                                        <hr />
                                        <p>- 點擊日曆旁圖示進入聊天室</p>
                                        <p>- 準時出現在聊天室</p>
                                        <p>- 想要取消當次討論，再點擊一次“join”</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div id="Calendar">
                    <div id="intro">
                        <h2>正在進行...</h2>
                        <hr />
                        <p>Monthly Schedule</p>
                    </div>
                    <Home {...props} />
                </div>
                <div id="Steps">
                    <div id="intro">
                        <h1>Ready to get started?</h1>
                        <h2>準備好了嗎？</h2>
                        <hr />
                        <p>Follow two steps and join us</p>
                        <p>2步驟，立刻加入我們</p>
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
                            <p>
                                <b>Sign up for a free account </b>{' '}
                            </p>
                            <p>
                                <b> 註冊免費帳號</b>{' '}
                            </p>
                            <hr />
                            <p>
                                • <a href="./signup">Sign up</a> for a free account and log in
                            </p>
                            <p>• 註冊成為聆果會員</p>
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
                            <p>
                                <b>Congratulations, you are in ! </b>{' '}
                            </p>
                            <p>
                                <b>恭喜您，成為會員</b>{' '}
                            </p>
                            <hr />
                            <div>
                                <p>Go to calendar. </p>
                                <p>Choose the time you are available </p>
                                <p>Start your language practices journey. </p>
                                <p>可由會員專區進入日曆，</p>
                                <p>新增討論或加入已開設之討論 </p>
                                <p>開啟您的語言練習之旅。</p>
                            </div>
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
                            <h3>Questions？Get extra help !</h3>
                            <b>有問題？ 獲得額外協助 </b>
                            <hr />
                            <div>
                                <p> Contact us on:聯絡我們吧: </p>
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
