import React from "react";

export const ButtonActions = ({ isNext, onAction }) => {
  const onSave = () =>
    onAction({
      type: "SAVE",
    });
  const onNext = () =>
    onAction({
      type: "NEXT",
    });
  const onClose = () =>
    onAction({
      type: "CLOSE",
    });

  return (
    <div className="flex">
      <button className="btn-primary-blue mr-2 flex-1" onClick={onClose}>
        close
      </button>
      <button
        className="btn-primary-blue flex-1"
        onClick={isNext ? onSave : onNext}
      >
        {isNext ? "save" : "next"}
      </button>
    </div>
  );
};
