import { QuizAnswerRes, QuizQuestionRes } from '@/types/responses';
import { cn } from '@/lib/utils/tw';

type Props = {
  question: QuizQuestionRes;
  result?: QuizAnswerRes;
  index: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export default function QuestionItem({
  question,
  result,
  index,
  value,
  onChange,
  disabled,
}: Props) {
  if (!question) return null;

  const handleClick = (option: string) => {
    if (disabled) return;
    onChange?.(option);
  };

  const isCorrect = result && result.correct;
  const isWrong = result && !result.correct;

  return (
    <div className="mt-2">
      <h2 className="font-bold opacity-50">Question #{index + 1}</h2>
      <h3 className="font-bold text-lg">{question.content}</h3>
      <div className="mt-4 grid gap-2">
        {Object.entries(question.options).map(([key, content]) => (
          <div key={key} className="flex justify-start">
            <button
              className={cn(
                `flex items-center justify-start gap-4 border rounded p-2 cursor-pointer min-w-[400px]`,
                `${value === key ? 'bg-sky-300' : ''}`,
                `${value === key && isWrong ? 'ring ring-red-600' : ''}`,
                `${value === key && isCorrect ? 'ring ring-green-600' : ''}`,
                `${!disabled ? 'hover:bg-gray-200' : ''}`,
              )}
              onClick={() => handleClick(key)}
              type="button"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full border">
                {key.toUpperCase()}
              </span>
              <span className="flex-1 text-left">{content}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
