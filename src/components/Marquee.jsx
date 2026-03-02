import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Marquee = () => {
    const tickerRef = useRef(null);

    useEffect(() => {
        // Ignore animation for now if needed
        const ticker = tickerRef.current;

        if (!ticker) return;

        const inner = ticker.querySelector(".ticker-wrap");
        const content = inner.querySelector(".ticker-text");

        inner.append(content.cloneNode(true));

        inner.querySelectorAll(".ticker-text").forEach((el) => {
            gsap.to(el, {
                x: "-100%",
                repeat: -1,
                duration: 15,
                ease: "linear",
            });
        });
    }, []);

    return (
        // Section wrapper (controls alignment in page flow)
        <section className="w-full">

            {/* Banner */}
            <div
                ref={tickerRef}
                className="
        ticker
        w-full
        bg-fuchsia-600
        border-b-4
        border-white
        overflow-hidden
      "
            >
                <div className="ticker-wrap flex whitespace-nowrap">
                    <div className="ticker-text flex items-center justify-center w-full">
                        <h1
                            className="
              text-white
              font-bold
              text-center

              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-3xl
              xl:text-4xl
              2xl:text-5xl

              py-4
              px-4
              w-full
            "
                        >
                            Here's what customers have to say about us
                        </h1>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Marquee;