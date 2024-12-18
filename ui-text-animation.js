import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from '../helpers/split-text'

gsap.registerPlugin(ScrollTrigger);

const textAnimationWrappers = document.querySelectorAll('[ui-text-animation="wrapper"]')

function getRandomSymbol() {
    const symbols = "@#$%&*?";
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

textAnimationWrappers.forEach(taw => {
    const textAnimations = taw.querySelectorAll('[ui-text-animation="text"]')

    textAnimations.forEach(ta => {
        let splittedText = new SplitText(ta)
        let delay = parseInt(ta.getAttribute('ui-text-animation-delay')) || 0

        const trigger = new ScrollTrigger({
            trigger: taw,
            start: 'top 1px',
            end: 'top bottom'
        })

        splittedText.chars.forEach((c, i) => {
            let originalLetter = c.innerText;

            c.innerText = getRandomSymbol();
            c.style.transition = '.3s'
            c.style.opacity = 1

            const timeline = gsap.timeline({
                scrollTrigger: trigger,
            })

            timeline.set(c, {
                opacity: 0,
                textShadow: '0px 0px 30px rgba(255,255,255,.5)'
            })

            timeline.to(c, {
                opacity: 1,
                duration: 0.5,
                delay: delay + (i + 1) / (.75 * splittedText.chars.length),
                onUpdate: () => {
                    c.innerText = getRandomSymbol();
                    c.style.opacity = Math.random() * 1
                },
            })

            timeline.to(c, {
                innerText: originalLetter,
                duration: 0.75,
                onStart: () => {
                    c.innerText = originalLetter;
                    c.style.opacity = 1
                },
            })
        })
    })
})