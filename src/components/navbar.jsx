import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { themeContext } from "../../providers/ThemeProvider";

const Navbar = () => {
    const ctx = useContext(themeContext);
    const { showOtherPageLinks } = ctx;

    //Animation Variables
    const parentVarExit = {
        init: {
            opacity: 0.8
        }, 
        finale: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.1,
            }
        }
    }

    const swipeExit = {
        init: {
            opacity: 0,
            x: "50%"
        }, 
        finale: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 200
            }
        },
        exit: {
            opacity: 0,
            x: "50%",
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 200
            }
        }
    }

    const parentVarTrans = {
        clad: {
            rotate: showOtherPageLinks? 225 : 0,
            y: showOtherPageLinks? 3 : 0,
            transition: {
                when: showOtherPageLinks ? "afterChildren" : "beforeChildren",
                staggerChildren: showOtherPageLinks ? 0.2 : 0.1,
                duration: showOtherPageLinks ? 0.3 : 0.18
            }
        } 
    }

    const childRotate = {
        clad: {
            width: showOtherPageLinks ? "85%" : "70%",
            height: showOtherPageLinks ? "3px" : "1px",
            y: showOtherPageLinks ? -4.5 : 0,
            rotate: showOtherPageLinks ? 90 : 0,
            transition: {
                ease: showOtherPageLinks ? "easeIn" : "easeOut",
                duration: showOtherPageLinks ? 0.2 : 0.1
            }
        }
    }

    const childTranslate = {
        clad: {
            y: showOtherPageLinks ? 6.1 : 0,
            height: showOtherPageLinks ? "4px" : "1px",
            width: showOtherPageLinks ? "85%" : "100%",
            transition: {
                ease: showOtherPageLinks ? "easeIn" : "easeOut",
                duration: 0.1
            }
        }
    }

    const logoParent = {
        init: {
            y: "70%",
            opacity: 0,
        },
        finale: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeIn",
                when: "beforeChildren",
                staggerChildren: 0.39
            }
        }
    }

    const logoQ = {
        init: {
            y: "-70%",
            opacity: 0
        },
        finale: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    }

    const logoV = {
        init: {
            y: "80%",
            opacity: 0
        },
        finale: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    }

    const LogoI = {
        init: {
            opacity: 0,
            x: -7,
        },
        finale: {
            opacity: 1,
            x: -2,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            }
        }
    }

    return (
        <nav className="theNavbar">
            <div className="leftNav" style={{overflowY: "hidden"}}>
                <motion.div initial="init" animate="finale" variants={logoParent} className="logoAbsMain">
                    <Link className="theLogo" href={"/"} style={{overflow: "hidden"}}>
                        <motion.div variants={logoQ} className="Q">Quad</motion.div> <motion.div variants={logoV} className="V">Verse</motion.div> <motion.i variants={LogoI} className="icofont-readernaut"></motion.i>
                    </Link>
                </motion.div>
            </div>
            <div className="rightNav">
                <Link href={"/search"} className="searchLinkNav" style={{overflowY: "hidden"}}>
                    <motion.p initial="init" animate="finale" variants={logoV}>Search</motion.p>
                    <motion.div layoutId="pointer" className="marker"></motion.div>
                </Link>
                <div className="hamburgerCntn">
                    <motion.div variants={parentVarTrans} animate="clad" className="hamburger">
                        <motion.span variants={childTranslate}></motion.span>
                        <motion.span variants={childRotate}></motion.span>
                    </motion.div>
                    <AnimatePresence>
                        {showOtherPageLinks && (
                            <motion.div variants={parentVarExit} initial="init" animate="finale" exit="exit" className="mainPageLinks">
                                <motion.div variants={swipeExit} className='linkHeader solarsystem'><Link href={"/Solarsystem"}>Solar System</Link></motion.div>
                                <motion.div variants={swipeExit} className='linkHeader planets'><Link href={"/Planets"}>Planets</Link></motion.div>
                                <motion.div variants={swipeExit} className='linkHeader dwarfplanets'><Link href={"/Dwarfplanets"}>Dwarf Planets</Link></motion.div>
                                <motion.div variants={swipeExit} className='linkHeader moons'><Link href={"/Moons"}>Moons</Link></motion.div>
                                <motion.div variants={swipeExit} className='linkHeader asteroids'><Link href={"/Asteroids-comets-meteors"}>Asteroids, Comets and Meteors</Link></motion.div>
                                <motion.div variants={swipeExit} className='linkHeader spacemissions'><Link href={"/Space_missions"}>Space Missions</Link></motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.div layoutId="pointer" className="marker"></motion.div>
                </div>
            </div> 
        </nav>
    )
}

export default Navbar
