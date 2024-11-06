import { getAgeReference } from "@/lib/equations";
import { dict } from "./BMIApp";

function RefrencesComponent({
  age,
  gender,
}: {
  age: number;
  gender: "male" | "female" | null;
}) {
  return (
    <section className="w-full mx-auto flex flex-col gap-2">
      <h2>الحدود المرجعية</h2>
      <div>
        {getAgeReference(Number(age), gender) && Object.entries(getAgeReference(Number(age), gender)!).map(
          ([category, data]) => {
            const row = Object.entries(data).map(([sign, value], index) => {
              const compare = sign === "more_than" ? "اكثر" : "اقل";
              return Object.entries(value as Record<string, number>).map(
                ([key, value2], index) => {
                  return (
                    <p
                    key={index}
                    className="flex justify-between w-full text-xs mb-0 border-b border-gray-200 pb-1"
                  >
                    <span className="text-gray-500">
                      {dict[key as keyof typeof dict]}
                    </span>
                    {value2 !== 0 && (
                      <span>
                        {compare} من {value2.toFixed(1)}
                      </span>
                    )}
                  </p>
                );
              });
            });
            return (
              <div key={category} className="flex flex-col gap-1 mb-4">
                <h3 className="text-sm">{dict[category as keyof typeof dict]}</h3>
                {row}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

export default RefrencesComponent;
