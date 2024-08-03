import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState(null);

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    str += charAllowed ? "_." : "";
    str += numberAllowed ? "0123456789" : "";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(passwordGenerator, [
    length,
    charAllowed,
    numberAllowed,
    passwordGenerator,
  ]);

  return (
    <>
      <div className="w-screen h-screen bg-black grid place-items-center">
        <div className="w-[50%] h-auto px-4 py-6 bg-gray-700 flex flex-col items-center gap-6">
          <h1 className="text-center text-white text-xl">Password Generator</h1>

          <div className="w-[80%] h-auto flex px-4 justify-center">
            <input
              className="rounded-tl-3xl rounded-bl-3xl w-[60%] h-lg p-2"
              placeholder="password"
              value={password}
              type="text"
              ref={passRef}
              readOnly
            />
            <button
              className="bg-blue-700 w-[20%] h-lg text-center p-2 rounded-tr-3xl rounded-br-3xl"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>

          <div className="dependencies w-[80%] h-auto flex px-4 justify-center items-center gap-3">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-red-700">length: {length}</label>

            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="text-red-700">Character</label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-red-700">Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
