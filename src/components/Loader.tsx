import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default Loader;