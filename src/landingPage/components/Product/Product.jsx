import React from 'react'
import { motion } from "framer-motion";


import './Product.css'
import product1 from '../../assets/product-1.svg'
import product2 from '../../assets/product-2.svg'
import product3 from '../../assets/product-3.svg'



const Product = () => {
  return (
    <div class="page-row animate-fade-in animate-fade-in--visible">
      <div class="page-wrap">
        <section id="how-it-works" class="how-works">
          <div class="how-works__header">
            <h2 class="how-works__title" data-cy="HomePage__title">
              Why learn a language with Innuo?
            </h2>
            <p class="how-works__subtitle"></p>
          </div>
          <article class="how-works__article" data-cy="HomePage__article">
            <div class="how-works__info how-works__info--left">
              <div class="card card-text">
                <div class="card-text__header">SHORT & QUICK LESSONS</div>

                <h3 class="card-text__title">Learning made easy online</h3>

                <p class="card-text__description">
                Fit sign language lessons more easily into your busy schedule and start communicating with the deaf and hard of hearing community and 
                you can learn at your own pace without feeling overwhelmed.
                </p>
              </div>
            </div>

            <motion.div class="how-works__media how-works__media--left" 
            animate={{scale:0.8}} initial={{scale:0}}
            transition={{delay: 1}}>
              <img
                alt="Busuu Japanese exercise correction"
                class="how-works-media"
                src={product1}
              />
            </motion.div>
          </article>
          <article class="how-works__article" data-cy="HomePage__article">
            <div class="how-works__info how-works__info--right">
              <div class="card card-text">
                <div class="card-text__header">GAMIFIED LEARNING</div>

                <h3 class="card-text__title">Learning made enjoyable</h3>

                <p class="card-text__description">
                Our interactive lessons include gamified approach that will keep you motivated and make your learning experience enjoyable. 
                With our interactive approach, you'll be able to learn sign language more quickly and confidently.
                </p>
              </div>
            </div>

            <motion.div class="how-works__media how-works__media--right"
            animate={{scale:0.85}} initial={{scale:0}}
            transition={{delay: 1}}>
              <img
                alt="Busuu Spanish checkpoint assessment"
                class="how-works-media"
                src={product2}
              />
            </motion.div>
          </article>
          <article class="how-works__article mt-6" data-cy="HomePage__article">
            <div class="how-works__info how-works__info--left">
              <div class="card card-text">
                <div class="card-text__header">
                  TRACK YOUR PROGRESS
                </div>

                <h3 class="card-text__title">Learning made competitive</h3>

                <p class="card-text__description">
                Our ranking system is designed to motivate you and help you see how far you've come. 
                It's also a great way to challenge yourself and stay engaged in the learning process so you can feel
                a sense of accomplishment as you climb the ranks.
                </p>
              </div>
            </div>

            <div class="how-works__media how-works__media--left"
            animate={{scale:0.85}} initial={{scale:0}}
            transition={{delay: 1}}>
              <img
                alt="Busuu Spanish video flashcards"
                class="how-works-media"
                src={product3}
              />
            </div>
          </article>
          
        </section>
      </div>
    </div>
  )
}

export default Product