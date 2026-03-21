const steps = [
  { number: 1, label: "Informations du client" },
  { number: 2, label: "Sélection des produits" },
  { number: 3, label: "Prévisualisation" },
];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div>
      {/* Progress bar */}
      <div className="w-full h-[3px] bg-gray-100 rounded-full mb-4">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{
            width:
              currentStep === 1 ? "33%" :
              currentStep === 2 ? "66%" : "100%",
          }}
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between">
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isDone = step.number < currentStep;
          return (
            <div key={step.number} className="flex items-center gap-2">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center
                  ${isActive || isDone ? "bg-primary-500" : "bg-black-100"}`}
              >
                <span className="text-[10px] text-white font-bold">
                  {step.number}
                </span>
              </div>
              <span className={`text-xs
                ${isActive ? "font-semibold text-black-500" : ""}
                ${isDone ? "text-black-500" : ""}
                ${!isActive && !isDone ? "text-black-200" : ""}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}