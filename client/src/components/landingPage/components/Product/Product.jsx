import React from "react";
import { motion  } from "framer-motion";

import "./Product.css";
import product1 from "../../assets/product-1.svg";
import product2 from "../../assets/product-2.svg";
import product3 from "../../assets/product-3.svg";

const pic1Animate = {
  onscreen: { x: 0, opacity: 1, scale:0.9},
  offscreen: { opacity: 0, x: -80 },
  transition: { delay: 2, duration: 3, type: "spring", bounce: 0.4 }
};

const pic2Animate = {
  onscreen: { x: 0, opacity: 1},
  offscreen: { opacity: 0, x: 50 },
  transition: { delay: 2, duration: 3, type: "spring", bounce: 0.4 }
};

const pic3Animate = {
  onscreen: { x: 0, opacity: 1},
  offscreen: { opacity: 0, x: -80 },
  transition: { delay: 2, duration: 3, type: "spring", bounce: 0.4 }
};


const Product = () => {
  return (
    <motion.div className="page-row animate-fade-in animate-fade-in--visible">
      <div className="page-wrap">
        <section id="how-it-works" className="how-works">
          <div className="how-works__header">
            <h2 className="how-works__title" data-cy="HomePage__title">
              Why learn a language with Innuo?
            </h2>
            <p className="how-works__subtitle"></p>
          </div>
          <article className="how-works__article" data-cy="HomePage__article">
            <div className="how-works__info how-works__info--left">
              <div className="card card-text">
                <div className="card-text__header">SHORT & QUICK LESSONS</div>

                <h3 className="card-text__title">Learning made easy online</h3>

                <p className="card-text__description">
                  Fit sign language lessons more easily into your busy schedule
                  and start communicating with the deaf and hard of hearing
                  community.
                </p>
              </div>
            </div>

            <motion.div
              className="how-works__media how-works__media--left"
              initial={"offscreen"}
              whileInView={"onscreen"}
              transition={{ staggerChildren: 0.5 }}
              viewport={{ once: false, amount: 0.6 }}
            >
              <motion.img
                alt="Busuu Japanese exercise correction"
                className="how-works-media"
                src={product1}
                variants={pic1Animate}
              />
            </motion.div>
          </article>
          <article className="how-works__article pb-10" data-cy="HomePage__article">
            <div className="how-works__info how-works__info--right">
              <div className="card card-text">
                <div className="card-text__header">GAMIFIED LEARNING</div>

                <h3 className="card-text__title">Learning made enjoyable</h3>

                <p className="card-text__description">
                  Our interactive lessons include gamified approach that will
                  keep you motivated and make your learning experience
                  enjoyable.
                </p>
              </div>
            </div>

            <motion.div
              className="how-works__media how-works__media--right"
              initial={"offscreen"}
              whileInView={"onscreen"}
              transition={{ staggerChildren: 0.5 }}
              viewport={{ once: false, amount: 0.6 }}
            >
              <motion.img
                alt="Busuu Spanish checkpoint assessment"
                className="how-works-media"
                src={product2}
                variants={pic2Animate}
              />
            </motion.div>
          </article>
          <article className="how-works__article mt-6" data-cy="HomePage__article">
            <div className="how-works__info how-works__info--left">
              <div className="card card-text">
                <div className="card-text__header">TRACK YOUR PROGRESS</div>

                <h3 className="card-text__title">Learning made competitive</h3>

                <p className="card-text__description">
                  Our ranking system is designed to motivate you and help you
                  see how far you've come. It's also a great way to challenge
                  yourself!
                </p>
              </div>
            </div>

            <motion.div
              className="how-works__media how-works__media--left"
              initial={"offscreen"}
              whileInView={"onscreen"}
              transition={{ staggerChildren: 0.5 }}
              viewport={{ once: false, amount: 0.6 }}
            >
              <motion.img
                alt="Busuu Spanish video flashcards"
                className="how-works-media"
                src={product3}
                variants={pic3Animate}
              />
            </motion.div>
          </article>
        </section>
      </div>
    </motion.div>
  );
};

export default Product;
