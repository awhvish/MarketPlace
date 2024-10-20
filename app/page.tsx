"use client"
export default function Home() {
  return (
    <div className="">
      Hello world <br></br>
      <button onClick={() => window.location.href = "/auth/login"}>LOGIN</button> <br></br>
      <button onClick={() => window.location.href = "/auth/register"}>REGISTER</button>
    </div>
  );
}
