function JoinScreen({lesson_name, start}) {
  return (
    <div className="join-screen">
      <h2>Join Quiz</h2>
      <p>{lesson_name}</p>
      <button className="quiz_start_btn" onClick={start}>Start</button>
    </div>
  );
}

export default JoinScreen;
