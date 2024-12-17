import React, { useState, useEffect, useRef } from 'react';
import shade from "/assets/shadenew.png";
import '../../style/mouse.css';
const Section0 = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showScroll, setShowScroll] = useState(true);

    const canvasRef = useRef(null);
    const imgRef = useRef(new Image());
    //no of images 
    const frameCount = 100; 
    const images = useRef([]);
    const currentFrame = index => (
        //change 4 to match with image name digits put 5 if the image name is 00005.webp or 3 if it is 012.webp
        `/fcImage/${index.toString().padStart(4, '0')}.webp` 
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        window.addEventListener('resize', handleResize);

        if (!isMobile) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            const html = document.documentElement;
            const preloadImages = () => {
                for (let i = 1; i <= frameCount; i++) {
                    const img = new Image();
                    img.src = currentFrame(i);
                    images.current[i] = img;
                }
            };

            const drawImage = (img) => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0);
            };

            imgRef.current.onload = () => {
                drawImage(imgRef.current);
            };

            window.addEventListener('scroll', () => {
                const scrollTop = html.scrollTop;
                const maxScrollTop = html.scrollHeight - window.innerHeight;
                const scrollFraction = scrollTop / maxScrollTop;
                //speed of frame sequence 
                const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount * 8)); 
                if (scrollTop > 0) setShowScroll(false);
                requestAnimationFrame(() => {
                    if (images.current[frameIndex + 1]) {
                        drawImage(images.current[frameIndex + 1]);
                    }
                });
            });

            preloadImages();

            // Set canvas dimensions
            canvas.width = 2560;
            canvas.height = 1200;

            // Draw the first image
            imgRef.current.src = currentFrame(1);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', () => {});
        };
    }, [isMobile]);

    return (
        <section id="sec-1">
            {isMobile ? (
                <img src={currentFrame(99)} alt="Final Frame" className="final-frame-mobile" />
            ) : (
                <>
                    <div className={`fc-scroll-downs ${!showScroll ? 'hide' : ''}`}>
                        <div className="fc-mousey">
                            <div className="fc-scroller"></div>
                        </div>  
                    </div>
                    <canvas ref={canvasRef} id="img-seq"></canvas>
                    <div id="outer-layer-2">
                        <img src={shade} alt="shade" className="scroll-shade" />
                    </div>
                    <div id="outer-layer">
                        <div id="inner-layer">
                            <div id="buttons">
                                <button>Buy now</button>
                                <button>Watch video</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Section0;


// css style for this component 
// .fc-scroll-downs {

//     margin: auto;
//     width :34px;
//     height: 55px;
//     position: absolute;
//     top: 18%;
//     right: 0%;
//     left: 0%;
//   }
//   .fc-scroll-downs.hide {
//     opacity: 0;
//     transition: opacity 0.1s ease;
//     pointer-events: none;
//   }
//   .fc-mousey {
//     width: 3px;
//     padding: 10px 15px;
//     height: 35px;
//     border: 2px solid #fff;
//     border-radius: 25px;
//     opacity: 0.75;
//     box-sizing: content-box;
//   }
//   .fc-scroller {
//     width: 3px;
//     height: 10px;
//     border-radius: 25%;
//     background-color: #fff;
//     animation-name: scroll;
//     animation-duration: 2.2s;
//     animation-timing-function: cubic-bezier(.15,.41,.69,.94);
//     animation-iteration-count: infinite;
//   }
//   @keyframes scroll {
//     0% { opacity: 0; }
//     10% { transform: translateY(0); opacity: 1; }
//     100% { transform: translateY(15px); opacity: 0;}
//   }
  
//   /* SECTION-1 starts */
//   @media screen and (max-width:768px) {
//       #sec-1{
//           height: auto !important;
//       }
//   }
//   #sec-1 {
//       width: 99vw;
//       height: 450vh;
//       position: relative;
//       top: 1rem;
      
//   }
  
//   canvas {
//       position: sticky;
//       top:3rem;
//       z-index: -1;
//       height: 100vh;
//       width: 99vw;
//       object-fit:cover;
//   }
  
//   #outer-layer {
//          width: 100%;
//          bottom: 0%;
//           position: absolute;
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//       }
      
//       #inner-layer {
//           position: sticky;
//           width: 100%;
//           height: 90%;
//           bottom: 0%;
  
//   }
//   #outer-layer-2 {
//       width: 100%;
//       bottom: 0%;
//       position: absolute;
//       height: 30vh;
      
//    }
//   .scroll-shade {
//       position: absolute;
//       width: 100%;
//       z-index: -1;
//       bottom: 0%; 
//       height: 50%; 
//   }
  
//   #buttons {
//       position: sticky;
//       top: calc(100% - 100px);
//       width: 100%;
//       display: flex;
//       justify-content: space-around;
//       align-items: flex-start;
//   }
  
//   #buttons button {
//       border: 0 solid;
//       z-index: 1;
//       box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
//       outline: 2px solid;
//       outline-color: rgba(255, 255, 255, .5);
//       outline-offset: 0px;
//       text-shadow: none;
//       transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
//       padding: 15px 25px;
//       border-radius: 30px;
//       background: none;
//       color: white;
//       font-size: var(--fs-s);
//       font-weight: 600;
      
//   }
  
//   #buttons button:hover {
//       border: 2px solid;
//       box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
//       outline-color: rgba(255, 255, 255, 0);
//       outline-offset: 15px;
//       text-shadow: 1px 1px 2px #427388;
//   }
  
