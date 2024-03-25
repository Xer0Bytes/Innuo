
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Xer0Bytes/Innuo">
    <img src="client/src/assets/favicon.ico" alt="Logo" width="40" height="70">
  </a>

  <h3 align="center">Innuo</h3>

  <p align="center">
    A platform for learning about sign language and contributing to the community.
    <br>
    <a href="https://innuo.netlify.app/">Innuo Website</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary><h3>Table of Contents<h3></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

(This project was created for the academic course SWE4404 - Software Project Lab II).

![image](https://github.com/Xer0Bytes/Innuo/assets/95132675/0dc4247f-0347-4f72-8c05-79d241e4cb0d)

Innuo, a user-friendly website, aims to revolutionize sign language learning. Its name, derived from Latin, means "to sign." Built on the robust MERN stack (MongoDB, Express.js, React, and Node.js), Innuo ensures efficient web development, simplifying the recruitment of experienced developers due to React and Node.js's popularity.

The platform prioritizes user-friendly experiences and security, implementing checks during sign-up, sign-in, and password reset processes. Each user enjoys a personalized profile to enhance their learning journey.

Innuo adopts a gamified approach to learning, with users progressing through lessons and earning achievements. Animated GIFs aid comprehension, making sign language learning engaging and accessible. Assessment is facilitated through user-friendly multiple-choice questions suitable for diverse age groups.

The platform fosters motivation and competition with a ranking system, allowing users to track their progress and compete with others. Additionally, users can contribute their knowledge to create a diverse learning environment.

Originally focused on sign language, Innuo boasts a flexible design adaptable to specific educational institutions and a wide array of subjects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* ![React](https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB)
* ![Express.js](https://img.shields.io/badge/Express.js-122658?style=for-the-badge&logo=express&logoColor=white)
* ![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
* ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
* ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Please follow the steps below to run the project locally:

### Prerequisites

You will require a .env file before you can start running the project.
* Create a file named `.env` in the `server/` folder.
* Populate the file with the following environment variables according to your environment:
  ```sh
  MONGO =
  JWT_KEY =
  REACT_APP_CLOUD_NAME =

  HOST =
  EMAIL_PORT =
  SERVICE =
  SECURE =
  USER =
  PASS =
  TOKEN =
  SALT =
  ```
* The `HOST, EMAIL_PORT, SERVICE, SECURE, USER, PASS` variables are created using Google API for SMTP email verification.
* The `MONGO` variable is the mongoDB link to the database used to store all the website information.
* `SALT` can be set according to user preferance.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Xer0Bytes/Innuo.git
   ```
3. Install NPM packages for server
   ```bash
   cd server
   yarn install
   ```
4. Start the server
   ```bash
   yarn dev
   ```
5. Install NPM packages for client
   ```bash
   cd client
   yarn install
   ```
6. Start the client
   ```bash
   yarn dev
   ```
7. Go to the following link to use the website locally:
   ```yaml
   http://localhost:5173/
   ```

You can also use the deployed website [here](https://innuo.netlify.app/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Innuo has the following functionalities:

**1. Users can create accounts**
   - There are three types of accounts (learner, contributor and admin)
   - Admin accounts are strictly specified in the database (You can not create one!)

**2. Users can participate in MCQ styled evaluation for learning**
   - Different sign languages around the world can be learnt if the lessons are added.
   - Users learn using GIFs rather than illustrations or images since SL contains gestures.
   - The quizzes are timed to induce a sense of competitiveness.
   - Users can earn XP points based on their performance.
   - Instant feedback is given to the user upon answering.
   - Once a user completes a quiz/module, they can not earn more XP points for that module however they can still replay the quiz.
 
**3. Users can unlock achievements**
   - Achievements are unlocked by receiving XP points.
   - More XP points = New Achievements!
   - Beware! It is different for different difficulty levels (set in the profile section).

**4. Users can contribute to the platform as a Contributor**
   - Add new topics, modules or questions to existing modules as a Contributor.
   - Admins will sieve through the contributions and add the appropriate ones.

**5. Admins can edit, reject or accept incoming contributions**
   - They have the power to govern the content of the website!

**6. Users also have the basic account setting such as**
   - Delete account
   - Reset password
   - Edit profile
   

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

This project is licensed under the [MIT License](LICENSE).

<!-- CONTACTS -->
## Contact:

- **Shanta Maria**
  - *GitHub:* [NafisaMaliyat-iut](https://github.com/NafisaMaliyat-iut)

- **Nafisa Maliyat**
  - *GitHub:* [maria-iut1234](https://github.com/maria-iut1234)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Img Shields](https://shields.io)
* [GitHub ReadMe Template](https://github.com/othneildrew/Best-README-Template/tree/master)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
