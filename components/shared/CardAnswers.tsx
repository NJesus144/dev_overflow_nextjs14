import React from "react";
import RenderTag from "./RenderTag";

const CardAnswers = () => {
  return (
    <div className="flex flex-col">
      <h1 className="h3-bold">
        Best practices for data fetching in a Next.js application with
        Server-Side Rendering (SSR)?
      </h1>
      <div>
        <RenderTag _id={1} name="React" />
      </div>
    </div>
  );
};

export default CardAnswers;
