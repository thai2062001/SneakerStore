import React from "react";

const ProgressSteps = ({ currentPage }) => {
  const steps = ["Details", "Address", "Payment"];
  const currentIndex = steps.indexOf(currentPage);

  // Nếu currentPage không tồn tại trong mảng steps, currentIndex sẽ là -1
  // Đảm bảo currentIndex không vượt quá bước hiện tại
  const validIndex = currentIndex !== -1 ? currentIndex : 0;
  const stepWidth = `${((validIndex + 1) / steps.length) * 100}%`;

  return (
    <div>
      <h2 className="sr-only">Steps</h2>

      <div className="overflow-hidden rounded-full bg-gray-200">
        <div className={`h-2 w-${stepWidth} rounded-full bg-blue-500`}></div>
      </div>

      <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex items-center justify-${
              index <= validIndex ? "start" : "end"
            } text-blue-600 sm:gap-1.5`}
          >
            <span className="hidden sm:inline">{step}</span>

            {index === 0 && (
              <svg
                className="size-6 sm:size-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            )}

            {index === 1 && (
              <svg
                className="size-6 sm:size-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}

            {index === 2 && (
              <svg
                className="size-6 sm:size-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressSteps;
