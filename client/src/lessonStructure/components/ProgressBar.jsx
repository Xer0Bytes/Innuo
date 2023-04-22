import { RxCross1 } from "react-icons/rx";
import {Link} from 'react-router-dom'

function ProgressBar({ width }) {
  return (
    <>
      <span className="p-2 pt-4 flex m-auto">
        <Link to="/userDashboard">
          <RxCross1 className="w-[1.8em] ml-4" />
        </Link>

        <span className="w-[92%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 m-auto">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${width}%` }}
          ></div>
        </span>
      </span>
    </>
  );
}

export default ProgressBar;
