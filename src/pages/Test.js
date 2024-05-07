import { useEffect } from 'react';
import { gsap } from 'gsap';
import "../styles/test.css"

export default function Home() {

 
  

    

  useEffect(() => {
    let sections = document.querySelectorAll('.section'),
      images = document.querySelectorAll('.background'),
      headings = document.querySelectorAll('.section-title'),
      outerWrappers = document.querySelectorAll('.wrapper-outer'),
      innerWrappers = document.querySelectorAll('.wrapper-inner'),
      currentIndex = -1,
      wrap = (index, max) => (index + max) % max,
      animating;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });






    
    function gotoSection(index, direction) {
      index = wrap(index, sections.length);
      animating = true;

      let fromTop = direction === -1;
      let dFactor = fromTop ? -1 : 1;
      let tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
        onComplete: () => {
          animating = false;
        },
      });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
          sections[currentIndex],
          { autoAlpha: 0 }
        );
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(
          images[index],
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0
        )
        .fromTo(
          headings[index],
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: 'power2',
            stagger: { each: 0.02, from: 'random' },
          },
          0.2
        );

      currentIndex = index;
    }

    function navigateSectionById(id) {
      let index = Array.from(sections).findIndex(
        (section) => section.id === id
      );

      if (index !== -1 && index !== currentIndex) {
        gotoSection(index, index > currentIndex ? 1 : -1);
      }
    }

    let lastTap = 0;
    document.addEventListener('touchend', function (event) {
      let currentTime = new Date().getTime();
      let tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        gotoSection(currentIndex + 1, 1);
        event.preventDefault();
      }
      lastTap = currentTime;
    });

    window.addEventListener('wheel', (event) => {
      if (event.deltaY < 0 && !animating) {
        gotoSection(currentIndex - 1, -1);
      } else if (event.deltaY > 0 && !animating) {
        gotoSection(currentIndex + 1, 1);
      }
    });

    gotoSection(0, 1);
  }, []);
  

  return (
    <div className="app-container">
     <section className="S1">
      <Section
        id="first"
        title="Learning"
        className="first"
        bgUrl="https://r4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-01b69d213afe95f35634472bcdf74a70.jpg"
        
      />
      <Section
        id="second"
        title="Challenge"
        className="second"
        bgUrl="https://r4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-d8b62d28c0f06c48d03c114ec8f2b4aa.jpg"
      />
      <Section
        id="third"
        title="Game"
        className="third"
        bgUrl="https://r4.wallpaperflare.com/wallpaper/526/482/570/digital-digital-art-artwork-illustration-environment-hd-wallpaper-e9ea17c37c37d5558d5c60bbed0bc434.jpg"
      />
      <Section
        id="fourth"
        title="T"
        className="fourth"
        bgUrl="https://r4.wallpaperflare.com/wallpaper/850/28/9/anime-anime-girls-digital-digital-art-artwork-hd-wallpaper-da2b197a0bb7c496eac50381ab5980a6.jpg"
      />
      <Section
        id="fifth"
        title="?"
        className="fifth"
        bgUrl="https://r4.wallpaperflare.com/wallpaper/266/749/195/digital-digital-art-artwork-illustration-drawing-hd-wallpaper-a8c69dc850107c58a0dc21ae2822044a.jpg"
      />
      </section>
      
    </div>
  );
}


function Section ({ id, title, className, bgUrl })  {
    return (
      <section id={id} className={`section ${className}`}>
        <div className="wrapper-outer">
          <div className="wrapper-inner">
            <div
              className="background"
              style={{ backgroundImage: `url(${bgUrl})` }}
            >
              <h2 className="section-title">{title}</h2>
            </div>
          </div>
        </div>
      </section>
    );
  };