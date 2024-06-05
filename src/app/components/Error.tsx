import * as React from "react";

export function Error() {
  return (
    <>
      <div className="flex flex-col pb-[140px] pt-[80px] text-center">
        <div className="mb-[80px]">
          <h1 className="text-[#000000] text-[110px] font-medium">
            404 Not Found
          </h1>
          <p className="text-[#000000] text-[16px] font-light">
            Your visited page not found. You may go home page.
          </p>
        </div>
        <div>
          <a href="">
            <input
              type="text"
              value="Back to home page"
              className="btn w-[254px] h-[56px] mb-2 bg-[#DB4444] border-none rounded-[4px] text-[#FAFAFA] text-[16px]"
            />
          </a>
        </div>
      </div>
    </>
  );
}
