import { useState, useRef } from 'react';

/* 
state is re rendered to reflect changes in the UI and should not be used
for behind the scenes UI changes

useRef is used to read values from the state and expose browser API events 
*/

export default function Players() {
  // refs are not used to read and manipulate the DOM data
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  // ref elements always return a current object
  // the ref attribute is supported directly out of the box for all JSX elements
  const handleClick = () => {
    // reading a value and not changing the DOM
    setEnteredPlayerName(playerName.current.value);

    // this would be declarative code and not letting react do its thing
    playerName.current.value = '';
  };
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
