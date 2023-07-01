import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import LottiePlayer from "react-lottie-player";
import NotFound from "../NotFound/NotFound";
import mailVerified from "../../assets/mailVerified.svg";
import loadingAnimation from "../../assets/loadingAnimation.json";
import newRequest from "../../../../utils/newRequest";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const [loading, setLoading] = useState(true);
  let sth = 0;

  useEffect(() => {
    const verifyEmailUrl = async () => {
      if (validUrl !== true && sth===0) {
        try {
          sth=1;
          // const url = `http://localhost:7000/api/auth/verify/${param.id}/${param.unique}`;
          const res = await newRequest.get(
            `auth/verify/${param.id}/${param.unique}`
          );
          if (res.status < 400) {
            setValidUrl(true);
            setLoading(false);
          } else {
            setValidUrl(false);
            setLoading(true);
          }
        } catch (error) {
          setLoading(false);
          setValidUrl(false);
          console.log(error);
        }
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {loading ? (
        <LottiePlayer
          loop={true}
          animationData={loadingAnimation}
          className={`w-1/2 m-auto`}
          play
        />
      ) : validUrl ? (
        <div className="w-3/4 text-center mx-auto">
          <div className="m-auto p-2 text-center">
            <img src={mailVerified} className="w-1/2 p-4 mx-auto" />
            <h1 className="text-4xl font-bold">{"Email verified!"}</h1>
            <h3 className="text-lg pt-2">
              {
                "Thank you, your email has been verified. Your account is now active. Click on the button below to proceed to your account!"
              }
            </h3>
          </div>
          <Link to="/login" className="w-full mx-auto text-center">
            <button className={"signin_btn"}>Login</button>
          </Link>
        </div>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default EmailVerify;
