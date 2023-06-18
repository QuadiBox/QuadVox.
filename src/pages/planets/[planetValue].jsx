import { linksData } from '../../utilities/PathlinkData';
import { useState, useEffect, useContext } from 'react';
import { themeContext } from '../../../providers/ThemeProvider';
import { handleToggles } from '../../utilities/Randomizer';
import TransitionPage from '../../components/transitionPage'; 
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../../components/navbar';
import Sect1 from '../../components/solarSystem/Sect1';
import Footer from '../../components/footer';
import MainSect from '../../components/solarSystem/MainSect';
import Link from 'next/link';
import Planets_Sect from '../../components/solarSystem/Planets_Sect';
import ScrollButton from '../../components/ScrollButton';



const PlanetValue = ({ data, param }) => {
    const [showExit, setShowExit] = useState(false);
    const router = useRouter();
    const ctx = useContext(themeContext);
    const { setShowOtherPageLinks } = ctx;
    const [ navOption, setNavOptions ] = useState("overview");
    const [ inview, setInview ] = useState(true);


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



    const planetsListData = {
        title: "Planets",
        the_data: [
            {
               id: "planet01",
               color: "#6f6f6f",
               name: "Mercury",
               note: "Mercury, the smallest planet in our solar system and closest to the Sun,  is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.",
               image_src: "/mercury_poster.jpg",
               link: "/planets/mercury",
               icon: param === "mercury" ? "icofont-readernaut": null
            },
            {
                id: "planet02",
               color: "#b68e2a",
               name: "Venus",
               note: "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
               image_src: "/venus_poster_A.jpg",
               link: "/planets/venus",
               icon: param === "venus" ? "icofont-readernaut": null
            },
            {
                id: "planet03",
               color: "#83ee18",
               name: "Earth",
               note: "Earth, our home planet, is the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
               image_src: "/earth_poster_A.jpg",
               link: "/planets/earth",
               icon: param === "earth" ? "icofont-readernaut": null
            },
            {
                id: "planet04",
               color: "#e75603",
               name: "Mars",
               note: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was billions of years ago wetter and warmer, with a thicker atmosphere.",
               image_src: "/mars_poster_A.jpg",
               link: "/planets/mars",
               icon: param === "mars" ? "icofont-readernaut": null
            },
            {
                id: "planet05",
               color: "#fdc67e",
               name: "Jupiter",
               note: "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries old storm bigger than Earth.",
               image_src: "/jupiter_poster_A.jpg",
               link: "/planets/jupiter",
               icon: param === "jupiter" ? "icofont-readernaut": null
            },
            {
                id: "planet06",
               color: "#b68e2a",
               name: "Saturn",
               note: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
               image_src: "/saturn_poster_A.jpg",
               link: "/planets/saturn",
               icon: param === "saturn" ? "icofont-readernaut": null
            },
            {
                id: "planet07",
               color: "#44a6fc",
               name: "Uranus",
               note: "Uranus, seventh planet from the Sun, rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
               image_src: "/uranus_poster_A.jpg",
               link: "/planets/uranus",
               icon: param === "uranus" ? "icofont-readernaut": null
            },
            {
                id: "planet08",
               color: "#0061b6",
               name: "Neptune",
               note: "Neptune, the eighth and most distant major planet orbiting our Sun, is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations.",
               image_src: "/neptune_poster_A.jpg",
               link: "/planets/neptune",
               icon: param === "neptune" ? "icofont-readernaut": null
            },
        ]
    }

    return (
        <div className='solarsystemHomePage' onClick={(e) => {handleToggles( e, setShowOtherPageLinks)}}>
            <Navbar/>
            <Sect1 data={data} setInview={setInview}/>

            <div className="navigationSelect">
                <div className="navOptionsCntn">
                    {
                        data.overview && (
                            <p
                                onClick={() => {setNavOptions("overview")}}
                                className={navOption === "overview" ? 'activeNavOption' : ""}
                            >
                                Overview
                                {
                                    navOption === "overview" && (
                                        <motion.span layoutId="pointer" className="navMarker"></motion.span>
                                    ) 
                                }
                            </p>

                        )
                    }
                    {
                        data.inDepth && (
                            <p 
                                onClick={() => {setNavOptions("indepth")}}
                                className={navOption === "indepth" ? 'activeNavOption' : ""}
                            >
                                In Depth
                                {
                                    navOption === "indepth" && (
                                        <motion.span layoutId="pointer" className="navMarker"></motion.span>
                                    ) 
                                }
                            </p>

                        )
                    }
                    {
                        data.summary && (
                            <p 
                                onClick={() => {setNavOptions("summary")}}
                                className={navOption === "summary" ? 'activeNavOption' : ""}
                            >
                                Summary
                                {
                                    navOption === "summary" && (
                                        <motion.span layoutId="pointer" className="navMarker"></motion.span>
                                    ) 
                                }
                            </p>

                        )
                    }
                </div>
            </div>
            <MainSect data={data} navOption={navOption} factor={12}/>
            <Planets_Sect planetsListData={planetsListData}/>

            <div className="nextPrevSect">
                {
                    data?.prev && (
                        <Link href={data?.prev.value} className="nextPrev navPrev">
                            <p>Prev</p>
                            <h3>{data?.prev.key}</h3>
                        </Link>
                    )
                }
                {
                    data?.next && (
                        <Link href={data?.next.value} className="nextPrev navNext">
                            <p>Next</p>
                            <h3>{data?.next.key}</h3>
                        </Link>
                    )
                }
            </div>

            <Footer bg={"transparent"}/>
            <AnimatePresence mode='wait'>
                {
                    navOption === "indepth" && !inview && (
                        <ScrollButton/>   
                    )
                }
            </AnimatePresence>


            <TransitionPage animateState={"initial"}/>
            <AnimatePresence mode='wait'>
                {!showExit && (
                     <TransitionPage animateState={"exit"}/>
                )}
            </AnimatePresence>

        
        </div>
    )
}

export default PlanetValue

export async function getServerSideProps (context) {
    const { params } = context;
    const { planetValue } = params;

    const linksDat = linksData;
  
    return {
        props: {
            data: linksDat.planets[planetValue], 
            param: planetValue,
        }
    }
}
