import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

// forwardRef lets your component expose a DOM node to parent component with a ref.

// Call forwardRef() to let your component receive a ref and forward it to a child component:

// @params:
// render: The render function for your component. React calls this function with the props and ref that your component received from its parent. The JSX you return will be the output of your component.
const ResultModal = forwardRef(function ResultModal({ targetTime, timeRemaining, onReset }, ref) {
  const dialogModal = useRef();

  const userLost = timeRemaining <= 0;
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
  /****** not used in many cases ******* */

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogModal.current.showModal();
      },
    };
  }); // not used often ******************
  return createPortal(
    <>
      <dialog ref={dialogModal} className="result-modal" onClose={onReset}>
        {userLost && <h2>You Lost. sad face</h2>}
        {!userLost && <h2>Score: {score} </h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with <strong>{formattedRemainingTime}</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>
    </>,
    document.getElementById('modal')
  );
});

export default ResultModal;
