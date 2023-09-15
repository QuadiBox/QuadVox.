import { useEffect, useRef, useState, useContext } from "react";
import { themeContext } from "../../../providers/ThemeProvider";
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../navbar";
import Link from "next/link";
import Sect2 from "./Sect2";
import Sect3 from "./Sect3";
import Sect4 from "./Sect4";
import Sect5 from "./Sect5";
import Footer from "../footer";
import TransitionPage from "../transitionPage";
import { useRouter } from 'next/router';
import { handleToggles } from "../../utilities/Randomizer";


const defaultApod = {
    title: "Pillars of Creation",
    date: "Inifity",
    copyright: "None",
    explanation: "If you see this image, that means there's an issue with the NASA APOD API. Kindly visit later to view the Astronomy picture of today. This image is the elephant trunks of interstellar gas and dust in the Eagle Nebula, in the Serpens constellation, some 6,500-7,000 light-years (2,000-2,100 pc; 61-66 Em) from Earth. Photograph taken by Hubble's Telescope on April 1, 1995.",
    hdurl: "/pillarsofcreation.png",
    media_type: "image"
}


const HomePage = ({ apod }) => {
    const [showExit, setShowExit] = useState(false);
    const ctx = useContext(themeContext);
    const { setShowOtherPageLinks } = ctx;
    const router = useRouter();

    useEffect(() => {
        const handleBeforeRouteChange = (url) => {
          // Do something before the route changes
          setShowExit(true);
        };
    
        // Subscribe to the router's "beforeHistoryChange" event
        router.events.on('beforeHistoryChange', handleBeforeRouteChange);
    
        // Unsubscribe from the event when the component is unmounted
        return () => {
          router.events.off('beforeHistoryChange', handleBeforeRouteChange);
        };
    }, [router.events]);

    const backShift = useRef(null);

    const handleBackgroundShift = (e) => {
        const x = e.clientX / window.innerWidth * 100;
        const y = e.clientY / window.innerHeight * 100;
    
        let transX = (x / 10).toFixed(3);
        let transY = (y/ 10).toFixed(3);
    
        const keyframes = {
          backgroundPosition: `-${transX}% -${transY}%`
        }
    
        backShift.current.animate(keyframes, {
          duration: 480,
          fill: "forwards"
        });
    }

    const shareContent = {
        title: 'Check out this amazing astronomy picture!',
        text: 'Astronomy Picture of the Day',
        url: 'https://quadverse.vercel.app',
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator
            .share(shareContent)
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Share error:', error));
        } else {
            console.log('Web Share API not supported on this browser');
        }
    };


    //Animation Variables
    const parentVar = {
        init: {
            opacity: 1,
        },
        finale: {
            opacity: 0.99,
            transition: {
                staggerChildren: 0.3,
            }
        }
    }

    const slideUp = {
        init: {
            y: "100%",
            opactity: 0,
        }, 
        finale: {
            y: 0,
            opactity: 1,
            transition: {
                ease: "easeIn",
                duration: 0.4
            }
        }
    }

    const scaleUp = {
        init: {
            scaleY: 0.01,
            opacity: 0.5
        },
        finale: {
            scaleY: 1,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200,
                when: "beforeChildren"
            }
        }
    }

    const swipe = {
        init: {
            x: "30%",
            opacity: 0,
        },
        finale: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 200
            }
        }
    }

    const fadeIn = {
        init: {
            opacity: 0
        }, 
        finale: {
            opacity: 1,
            transition: {
                ease: "easeOut",
                duration: 0.4
            }
        }
    }

    return (
        <div ref={backShift} className="theHomePage" onClick={(e) => {handleToggles( e, setShowOtherPageLinks)}} onMouseMove={handleBackgroundShift}>
            <Navbar/>

            <section  className="sect1-home">
                <motion.div variants={parentVar} initial="init" animate="finale" className="apod">
                    <div className="banner"></div>
                    
                    <div style={{overflow: "hidden"}}><motion.h1 variants={slideUp}>Astronomy Picture of the Day</motion.h1></div>
                    
                    {apod?.title !== undefined ? (
                        <motion.div variants={scaleUp} tabIndex="1" className="apodDisplayer">
                            <div className="borderLineApod"></div>
                            <div className="panOverlay"></div>
                            <div className="dragger"></div>
                            <div className="dragger2"></div>
                            {
                                apod?.media_type === "video" ? (
                                    <motion.iframe variants={fadeIn} className="apodVid" src={apod?.url}></motion.iframe>
                                ) : (
                                    <motion.div variants={fadeIn} className="apodImg" style={{backgroundImage: `url(${apod?.hdurl ? apod?.hdurl : apod?.url})`}}></motion.div>
                                )
                            }
                            {
                                apod?.media_type === "image" && (
                                    <div className="apodDetails">
                                        <div className="leftDetails">
                                            <h2>{apod?.title}</h2>
                                            <p className="detaildataOverflow">Details: <span>{apod?.explanation}</span></p>
                                            <p>Date: <span>{apod?.date}</span></p>
                                            <p>Copyright: <span>{apod?.copyright}</span></p>
                                        </div>
                                        <div className="rightDetails" style={{backgroundImage: `url(${apod?.hdurl})`}}></div>
                                        <div className="download_share">
                                            <button type="button" onClick={handleShare}><i className="icofont-share"></i> Share</button>
                                        </div>
                                    </div>
                                )
                            }
                        </motion.div>
                    ) : (
                        <motion.div variants={scaleUp} tabIndex="1" className="apodDisplayer">
                            <div className="borderLineApod"></div>
                            <div className="panOverlay"></div>
                            <div className="dragger"></div>
                            <div className="dragger2"></div>
                            <motion.div variants={fadeIn} className="apodImg" style={{backgroundImage: `url(${defaultApod?.hdurl})`}}></motion.div>
                            <div className="apodDetails">
                                <div className="leftDetails">
                                    <h2>{defaultApod?.title}</h2>
                                    <p>Details: <span>{defaultApod?.explanation}</span></p>
                                    <p>Date: <span>{defaultApod?.date}</span></p>
                                    <p>Copyright: <span>{defaultApod?.copyright}</span></p>
                                </div>
                                <div className="rightDetails" style={{backgroundImage: `url(${defaultApod?.hdurl})`}}></div>
                            </div>
                        </motion.div>
                    )}

                    <div className="apodFooter">
                        <motion.h3 variants={swipe}>
                            You also have the luxury of browsing through all past APODs, just input a date and you get to view the astrology picture of that day.
                        </motion.h3>
                        <motion.div variants={swipe}>
                            <Link href={"/search/apod"} className="exploreApod afterHover">Explore</Link>
                        </motion.div>
                    </div>

                </motion.div>
            </section>
            <Sect2/>
            <Sect3/>
            <Sect4/>
            <Sect5/>
            <Footer bg={"#090208"}/>
            
            <TransitionPage animateState={"initial"}/>
            <AnimatePresence mode="wait">
                {!showExit && (
                    <TransitionPage animateState={"exit"}/>
                )}
            </AnimatePresence>
        </div>
    )
}

export default HomePage
